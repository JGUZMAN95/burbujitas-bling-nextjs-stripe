import { NextRequest, NextResponse } from "next/server";
import { serverSanityClient, urlFor } from "@/lib/sanityClient";
import Stripe from "stripe";
import { allProductsQuery } from "@/types/flatttenQueries";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  try {
    const products = await serverSanityClient.fetch(allProductsQuery);
    const synced: string[] = [];

    for (const product of products) {
      if (product.stripePriceId || !product.price) continue;

      const imageUrls = product.images?.length
        ? [urlFor(product.images[0]).url()]
        : [];

      const stripeProductData: Stripe.ProductCreateParams = {
        name: product.name,
        images: imageUrls,
        metadata: {
          slug: product.slug || "",
          category: product.category || "",
        },
      };

      if (product.description) {
        stripeProductData.description = product.description;
      }

      const stripeProduct = await stripe.products.create(stripeProductData);

      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: Math.round(product.price * 100),
        currency: "usd",
      });

      await serverSanityClient
        .patch(product._id)
        .set({
          stripeProductId: stripeProduct.id,
          stripePriceId: stripePrice.id,
        })
        .commit();

      synced.push(product.name);
    }

    return NextResponse.json({ synced });
  } catch (err: any) {
    console.error("Stripe Sync Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
