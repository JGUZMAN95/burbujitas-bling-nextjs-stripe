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

    const lineItems = session.line_items?.data.map((item: any) => {
      const product = item.price.product as Stripe.Product;
      return {
        name: product.name,
        image: product.images?.[0] || null,
        quantity: item.quantity,
        price: (item.price.unit_amount ?? 0) / 100,
      };
    });

    // Importing order info to Sanity.
    const existingOrders = await serverSanityClient.fetch(
      `*[_type == "order" && orderId == $orderId]{orderId}`,
      { orderId: session.id }
    );

    if (existingOrders.length === 0) {
      await serverSanityClient.create({
        _type: "order",
        orderId: session.id,
        customerName: session.customer_details?.name,
        customerEmail: session.customer_details?.email,
        lineItems,
        total: (session.amount_total ?? 0) / 100,
        shippingCost: (session.shipping_cost?.amount_total ?? 0) / 100,
        shippingDetails: {
          address: {
            line1: session.customer_details?.address?.line1,
            line2: session.customer_details?.address?.line2,
            city: session.customer_details?.address?.city,
            state: session.customer_details?.address?.state,
            postalCode: session.customer_details?.address?.postal_code,
            country: session.customer_details?.address?.country,
          },
        },
        status: "placed",
        createdAt: new Date().toISOString(),
      });
    }

    // Sending order confirmation email.
    try {
      await resend.emails.send({
        from: `Burbujitas & Bling <${process.env.EMAIL_FROM_ORDERS!}>`,
        to: session.customer_details?.email!,
        //to: "delivered@resend.dev",
        subject: `Your Burbujitas & Bling Order is confirmed!`,
        html: getOrderEmailHtml(session),
      });

      await resend.emails.send({
        from: `Burbujitas & Bling <${process.env.EMAIL_FROM_ORDERS!}>`,
        to: process.env.EMAIL_TO!,
        //to: "delivered@resend.dev",
        subject: `Your Burbujitas & Bling Order is confirmed!`,
        html: getOrderEmailHtml(session),
      });
    } catch (err: any) {
      await logServerError({
        message: err.message,
        stack: err.stack,
        endpoint: "POST /api/webhooks/stripe (resend email)",
      });
    }
  }
  return response;
}
