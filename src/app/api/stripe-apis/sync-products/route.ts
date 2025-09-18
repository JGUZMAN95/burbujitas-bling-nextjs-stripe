// src/app/api/stripe-apis/sync-products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { serverSanityClient, urlFor } from "@/lib/sanity-client";
import Stripe from "stripe";
import { Product } from "@/types/product-type";
import { allProductsQuery } from "@/types/flatten-queries";
import { logServerError } from "@/lib/log-server-error";

const stripe = new Stripe(process.env.STRIPE_SECRET_LIVE_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  try {
    const products: Product[] =
      await serverSanityClient.fetch(allProductsQuery);

    const synced = await Promise.all(
      products.map(async (product) => {
        try {
          // Mark as pending before starting
          await serverSanityClient
            .patch(product._id)
            .set({ syncStatus: "pending", syncError: "" })
            .commit();

          const imageUrl = urlFor(product.images[0]).url();

          // Check if product exists on Stripe by name
          const existingStripeProducts = await stripe.products.list({
            limit: 100,
          });
          let stripeProduct = existingStripeProducts.data.find(
            (p) => p.name === product.name
          );

          if (!stripeProduct) {
            // Create Stripe product if missing
            stripeProduct = await stripe.products.create({
              name: product.name,
              images: [imageUrl],
              description: product.description || undefined,
              metadata: {
                slug: product.slug || "",
                category: product.category || "",
              },
            });
          }

          // Check for existing price matching Sanity price
          const expectedAmount = Math.round(product.price! * 100);
          const stripePrices = await stripe.prices.list({
            product: stripeProduct.id,
            limit: 100,
          });
          let stripePrice = stripePrices.data.find(
            (p) => p.unit_amount === expectedAmount && p.currency === "usd"
          );

          if (!stripePrice) {
            // Create new price if it doesn't exist
            stripePrice = await stripe.prices.create({
              product: stripeProduct.id,
              unit_amount: expectedAmount,
              currency: "usd",
            });
          }

          // Update Sanity document on success
          await serverSanityClient
            .patch(product._id)
            .set({
              stripeProductId: stripeProduct.id,
              stripePriceId: stripePrice.id,
              lastSyncedAt: new Date().toISOString(),
              syncStatus: "synced",
              syncError: "",
            })
            .commit();

          return { name: product.name, id: product._id };
        } catch (err: any) {
          console.log("ERROR: ", err);

          // Update Sanity on failure
          await serverSanityClient
            .patch(product._id)
            .set({
              syncStatus: "failed",
              syncError: err.message,
              lastSyncedAt: new Date().toISOString(),
            })
            .commit();

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
    console.log("ERROR: ", err);

    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint: "POST /api/stripe-apis/sync-products",
    });

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
