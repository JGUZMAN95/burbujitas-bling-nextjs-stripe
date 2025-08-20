import { Product } from "@/types/product";

export default async function handleCheckout(cart: Product[]) {
  if (!cart || cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Map cart items to Stripe items
  const items = cart.map((item) => {
    if (!item.stripePriceId)
      throw new Error(`${item.name} not synced to Stripe`);
    return {
      stripePriceId: item.stripePriceId,
      stripeQuantity: item.stripeQuantity || 1,
    };
  });

  try {
    const res = await fetch("/api/stripeApis/stripeClient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url; // redirect to Stripe Checkout
    } else {
      console.error("Stripe session failed:", data);
      alert("Failed to start checkout session");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Checkout error, see console");
  }
}
