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
        console.log("Server Error!!!!: " + item.name);
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
      success_url: `${process.env.NEXT_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_BASE_URL}/`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.log("Server Error!!!!: " + err.message);
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/stripe-client",
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
