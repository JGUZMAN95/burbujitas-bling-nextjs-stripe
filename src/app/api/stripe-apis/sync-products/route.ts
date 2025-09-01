// src/app/api/stripe-apis/sync-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serverSanityClient, urlFor } from "@/lib/sanity-client";
import Stripe from "stripe";
import { Product } from "@/types/product-type";
import { allProductsQuery } from "@/types/flatten-queries";
import { logServerError } from "@/lib/log-server-error";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  try {
    const products: Product[] =
      await serverSanityClient.fetch(allProductsQuery);

    // Filter products that need syncing
    const unsyncedProducts = products.filter(
      (p) => !p.stripePriceId && typeof p.price === "number"
    );

    const synced = await Promise.all(
      unsyncedProducts.map(async (product) => {
        try {
          const imageUrls = product.images?.length
            ? [urlFor(product.images[0]).url()]
            : [];

          // Create product on Stripe
          const stripeProduct = await stripe.products.create({
            name: product.name,
            images: imageUrls,
            description: product.description || undefined,
            metadata: {
              slug: product.slug || "",
              category: product.category || "",
            },
          });

          // Create price on Stripe
          const stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: Math.round(product.price! * 100),
            currency: "usd",
          });

          // Update Sanity document
          await serverSanityClient
            .patch(product._id)
            .set({
              stripeProductId: stripeProduct.id,
              stripePriceId: stripePrice.id,
            })
            .commit();

          return { name: product.name, id: product._id };
        } catch (err: any) {
          await logServerError({
            message: err.message,
            stack: err.stack,
            endpoint: "POST /api/stripe-apis/sync-products",
          });

          return null;
        }
      })
    );

    return NextResponse.json({ synced: synced.filter(Boolean) });
  } catch (err: any) {
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/sync-products",
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
