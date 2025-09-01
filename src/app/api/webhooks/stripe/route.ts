import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getOrderEmailHtml } from "@/utils/orderEmailTemplate";
import { serverSanityClient } from "@/lib/sanity-client";
import { logServerError } from "@/lib/log-server-error";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const stripeSignature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/webhooks/stripe",
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const response = NextResponse.json({ received: true });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    (async () => {
      try {
        const sessionData = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items.data.price.product", "customer"],
          }
        );

        const lineItems = sessionData.line_items?.data.map((item: any) => {
          const product = item.price.product as Stripe.Product;
          return {
            name: product.name,
            image: product.images?.[0] || null,
            quantity: item.quantity,
            price: (item.price.unit_amount ?? 0) / 100,
          };
        });

        const existingOrders = await serverSanityClient.fetch(
          `*[_type == "order" && orderId == $orderId]{orderId}`,
          { orderId: sessionData.id }
        );

        if (existingOrders.length === 0) {
          await serverSanityClient.create({
            _type: "order",
            orderId: sessionData.id,
            customerName: sessionData.customer_details?.name,
            customerEmail: sessionData.customer_details?.email,
            lineItems,
            total: (sessionData.amount_total ?? 0) / 100,
            shippingCost: (sessionData.shipping_cost?.amount_total ?? 0) / 100,
            status: "placed",
            createdAt: new Date().toISOString(),
          });
        }

        // Send email
        try {
          await resend.emails.send({
            from: `Burbujitas & Bling <${process.env.EMAIL_FROM_ORDERS!}>`,
            to: `delivered@resend.dev`,
            subject: `Your Burbujitas & Bling Order is confirmed!`,
            html: getOrderEmailHtml(sessionData),
          });
        } catch (err: any) {
          await logServerError({
            message: err.message,
            stack: err.stack,
            endpoint: "POST /api/webhooks/stripe (resend email)",
          });
        }
      } catch (err: any) {
        await logServerError({
          message: err.message,
          stack: err.stack,
          endpoint: "POST /api/webhooks/stripe (process session)",
        });
      }
    })();
  }

  return response;
}
