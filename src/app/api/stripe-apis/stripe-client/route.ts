import { logServerError } from "@/lib/log-server-error";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

interface CheckoutItem {
  name: string;
  stripePriceId: string;
  quantity?: number;
}

export async function POST(req: Request) {
  try {
    const { items }: { items: CheckoutItem[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const line_items = items.map((item) => {
      if (!item.stripePriceId) {
        throw new Error(`Missing price ID for item ${item.name}`);
      }
      return {
        price: item.stripePriceId,
        quantity: item.quantity ?? 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      automatic_tax: { enabled: true },
      success_url: `${process.env.NEXT_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_BASE_URL}/`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 800, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/stripe-client",
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
