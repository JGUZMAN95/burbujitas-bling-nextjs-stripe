import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  const { items } = await req.json();

  if (!items || !items.length) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  try {
    const line_items = items.map((item: any) => {
      if (!item.stripePriceId) {
        throw new Error(`Missing price ID for item ${item.name}`);
      }
      return {
        price: item.stripePriceId,
        quantity: item.stripeQuantity || 1,
      };
    });
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
