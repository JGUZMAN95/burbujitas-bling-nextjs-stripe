import Link from "next/link";
import React from "react";

export default function ShopPolicies() {
  return (
    <main className="min-h-full flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-6 bg-softWhite/60 text-softBrown font-accent space-y-8 shadow-md">
        <h1 className="text-3xl font-bold text-center">Shop Policies</h1>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Shipping & Processing</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Orders are usually processed within 2–5 business days.</li>
            <li>
              Standard shipping takes 3–7 business days. Expedited shipping is
              available at checkout.
            </li>
            <li>
              Shipping costs are calculated at checkout. Free shipping on orders
              over $35!
            </li>
            <li>
              Lost or delayed packages are out of our hands, but we’ll help
              track them!
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Returns & Exchanges</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All sales are final — no returns or exchanges</li>
            <li>
              Custom or personalized pieces are <strong>non-refundable</strong>,
              but we can offer store credit if we make a mistake.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Payments</h2>
          <p>
            We accept credit/debit cards, Apple Pay, and Stripe. Payment is
            required at checkout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Jewelry Care</h2>
          <p>
            All jewelry is handmade and delicate – avoid water, chemicals, or
            rough play. Slight variations are normal. Check out our{" "}
            <Link
              href="/care-tips"
              className="text-deepPlum font-semibold underline"
            >
              Care Tips
            </Link>{" "}
            page for more info.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Customer Support</h2>
          <p>
            Questions?{" "}
            <Link
              href="/contact-us"
              className="text-deepPlum font-semibold underline"
            >
              Contact us
            </Link>{" "}
            or DM us on social media. We’ll get back to you within 48 hours.
          </p>
        </section>
      </div>
    </main>
  );
}
