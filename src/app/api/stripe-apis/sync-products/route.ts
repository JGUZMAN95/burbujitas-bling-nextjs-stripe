// src/app/api/stripe-apis/sync-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serverSanityClient, urlFor } from "@/lib/sanity-client";
import Stripe from "stripe";
import { Product } from "@/types/product-type";
import { allProductsQuery } from "@/types/flatten-queries";
import { logServerError } from "@/lib/log-server-error";

// TODO: Add skip if product is unchanged.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  try {
    const products: Product[] =
      await serverSanityClient.fetch(allProductsQuery);

    const results = await Promise.all(
      products.map(async (product) => {
        try {
          const imageUrls = product.images?.length
            ? [urlFor(product.images[0]).url()]
            : [];

          let stripeProductId = product.stripeProductId;
          let stripePriceId = product.stripePriceId;

          // ✅ 1. Create product if missing
          if (!stripeProductId) {
            const stripeProduct = await stripe.products.create({
              name: product.name,
              images: imageUrls,
              description: product.description || undefined,
              metadata: {
                sanityId: product._id,
                slug: product.slug || "",
                category: product.category || "",
              },
            });
            stripeProductId = stripeProduct.id;
          } else {
            // ✅ 2. Update product if exists
            await stripe.products.update(stripeProductId, {
              name: product.name,
              description: product.description || undefined,
              images: imageUrls,
              metadata: {
                sanityId: product._id,
                slug: product.slug || "",
                category: product.category || "",
              },
            });
          }

          // ✅ 3. Handle price (Stripe doesn’t allow updating unit_amount)
          if (!stripePriceId) {
            const stripePrice = await stripe.prices.create({
              product: stripeProductId,
              unit_amount: Math.round(product.price! * 100),
              currency: "usd",
            });
            stripePriceId = stripePrice.id;
          } else {
            // If price in Sanity changed, create new price
            const currentPrice = await stripe.prices.retrieve(stripePriceId);
            if (currentPrice.unit_amount !== Math.round(product.price! * 100)) {
              const newPrice = await stripe.prices.create({
                product: stripeProductId,
                unit_amount: Math.round(product.price! * 100),
                currency: "usd",
              });
              stripePriceId = newPrice.id;
            }
          }

          // ✅ 4. Update Sanity with latest IDs + timestamp
          await serverSanityClient
            .patch(product._id)
            .set({
              stripeProductId,
              stripePriceId,
              lastSyncedAt: new Date().toISOString(),
              syncStatus: "synced",
              syncError: null,
            })
            .commit();

          return { name: product.name, id: product._id, synced: true };
        } catch (err: any) {
          // Log Products that faild syncing.
          await serverSanityClient
            .patch(product._id)
            .set({
              syncStatus: "failed",
              syncError: err.message,
            })
            .commit();

          await logServerError({
            message: err.message,
            stack: err.stack,
            endpoint: "POST /api/stripe-apis/sync-products",
          });
          return { name: product.name, id: product._id, error: err.message };
        }
      })
    );

    return NextResponse.json({ results });
  } catch (err: any) {
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/sync-products",
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
