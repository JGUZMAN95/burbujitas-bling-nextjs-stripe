//TODO: Ensure error handling and user feedback are robust.
//TODO: add loading state.
//TODO: Validate cart items before sending to backend.
//TODO: add toast notifications for better UX.

import { Product } from "@/types/product-type";

// This function initiates the Stripe checkout process.
interface CheckoutOptions {
  cart: Product[];
  onStatus?: (message: string) => void; // optional callback
}

export default async function handleCheckout({
  cart,
  onStatus,
}: CheckoutOptions) {
  if (!cart || cart.length === 0) {
    onStatus?.("Your cart is empty!");
    return;
  }

  // Map cart items to Stripe items
  const items = cart.map((item) => {
    if (!item.stripePriceId) {
      onStatus?.(`${item.name} is not synced to Stripe`);
      throw new Error(`${item.name} not synced to Stripe`);
    }
    return {
      stripePriceId: item.stripePriceId,
      stripeQuantity: item.quantity || 1,
    };
  });

  try {
    const res = await fetch("/api/stripe-apis/stripe-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (data?.url && typeof data.url === "string") {
      window.location.href = data.url;
    } else {
      onStatus?.("Failed to start checkout session");
      console.error("Stripe session URL missing or invalid:", data);
    }
  } catch (err) {
    console.error("Checkout error:", err);
    onStatus?.("Checkout error, see console");
  }
}
