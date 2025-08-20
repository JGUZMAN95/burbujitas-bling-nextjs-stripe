import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id)
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: [
        "line_items.data.price.product",
      ],
    });

    return NextResponse.json(session);
  } catch (err: any) {
    console.error("Get Session Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
