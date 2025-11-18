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

    const synced: { name: string; id: string }[] = [];

    for (const product of products) {
      try {
        // Mark product as pending
        await serverSanityClient
          .patch(product._id)
          .set({ syncStatus: "pending", syncError: "" })
          .commit();

        const imageUrl = product.images?.[0]
          ? urlFor(product.images[0]).url()
          : undefined;

        // Retrieve or create Stripe product
        let stripeProduct = product.stripeProductId
          ? await stripe.products
              .retrieve(product.stripeProductId)
              .catch(() => null)
          : null;

        if (!stripeProduct) {
          stripeProduct = await stripe.products.create({
            name: product.name,
            images: imageUrl ? [imageUrl] : undefined,
            description: product.description || undefined,
            metadata: {
              slug: product.slug || "",
              category: product.category || "",
            },
          });

          console.log("Createing product!!!!!");
        } else {
          console.log("Product Found");
        }

        // Calculate expected amount in cents
        const expectedAmount = Math.round(product.price! * 100);

        // List all prices for this product
        const stripePrices = await stripe.prices.list({
          product: stripeProduct.id,
          limit: 100,
        });

        // Check if an active price already matches Sanity price
        let stripePrice = stripePrices.data.find(
          (p) => p.unit_amount === expectedAmount && p.currency === "usd"
        );

        // If price changed or doesn't exist, create a new Stripe price
        if (!stripePrice) {
          stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: expectedAmount,
            currency: "usd",
          });
        }

        // Update Sanity document
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

        synced.push({ name: product.name, id: product._id });
      } catch (err: any) {
        console.error("Error syncing product:", product.name, err);

        await logServerError({
          message: err.message,
          stack: err.stack,
          endpoint: "POST /api/stripe-apis/sync-products",
        });

        await serverSanityClient
          .patch(product._id)
          .set({
            syncStatus: "failed",
            syncError:
              err.message +
              " " +
              err.stack +
              " " +
              "POST /api/stripe-apis/sync-products -- !!Stripe Sync Failed!!",
            lastSyncedAt: new Date().toISOString(),
          })
          .commit();
      }
    }

    return NextResponse.json({ synced });
  } catch (err: any) {
    console.error("Sync failed:", err);
    await logServerError({
      message: err.message,
      stack: err.stack,
      endpoint:
        "POST /api/stripe-apis/sync-products -- !!Sanity Query Failed!!",
    });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
