"use client";

import Link from "next/link";
import React from "react";

export default function ShopPolicies() {
  return (
    <main className="min-h-screen flex items-start sm:items-center justify-center px-4 py-6 sm:py-12">
      <div className="max-w-2xl w-full mx-auto p-4 sm:p-6 bg-softWhite/60 text-softBrown font-accent space-y-6 sm:space-y-8 shadow-md rounded-lg">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Shop Policies
        </h1>

        {/* Shipping & Processing */}
        <section className="space-y-2 sm:space-y-3">
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

        {/* Returns & Exchanges */}
        <section className="space-y-2 sm:space-y-3">
          <h2 className="text-lg font-semibold">Returns & Exchanges</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All sales are final — no returns or exchanges.</li>
            <li>
              Custom or personalized pieces are <strong>non-refundable</strong>,
              but we can offer store credit if we make a mistake.
            </li>
          </ul>
        </section>

        {/* Payments */}
        <section className="space-y-2 sm:space-y-3">
          <h2 className="text-lg font-semibold">Payments</h2>
          <p>
            We accept credit/debit cards, Apple Pay, and Stripe. Payment is
            required at checkout.
          </p>
        </section>

        {/* Jewelry Care */}
        <section className="space-y-2 sm:space-y-3">
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

        {/* Customer Support */}
        <section className="space-y-2 sm:space-y-3">
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
