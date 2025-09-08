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
  selectedSize?: string;
  selectedColor?: string;
}

export async function POST(req: Request) {
  try {
    const { items }: { items: CheckoutItem[] } = await req.json();

    if (!items?.length) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Build Stripe line_items
    const line_items = items.map(({ stripePriceId, name, quantity }) => {
      if (!stripePriceId) {
        console.log("ERROR: Missing price ID");
        throw new Error(`Missing price ID for item "${name}"`);
      }
      return { price: stripePriceId, quantity: quantity ?? 1 };
    });

    // Product variations metadata
    const metadata = {
      items: JSON.stringify(
        items.map(({ name, selectedSize, selectedColor }) => ({
          name,
          selectedSize: selectedSize ?? "",
          selectedColor: selectedColor ?? "",
        }))
      ),
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      discounts: [
        { promotion_code: "Welcome15" }, // Pre-applied discount (optional)
      ],
      allow_promotion_codes: true, // lets customers enter codes at checkout
      automatic_tax: { enabled: true },
      success_url: `${process.env.NEXT_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_BASE_URL}/`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        { shipping_rate: "shr_1S5uptJEgu7wsuYn9XBfhbyK" },
        { shipping_rate: "shr_1S48JpJEgu7wsuYnhlL9SG66" },
      ],
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.log("ERROR: ", err);
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/stripe-client",
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
