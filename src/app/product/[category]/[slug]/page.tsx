import { Product } from "@/types/product-type";
import DynamicProductCard from "@/components/Cards/DynamicProductCard";
import { productBySlugQuery } from "@/types/flatten-queries";
import { client } from "@/lib/sanity-client";

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const product: Product | null = await client.fetch(productBySlugQuery, {
    slug: params.slug,
  });

  if (!product) return <div>Product not found</div>;

  return (
    <main className="min-h-full flex py-4 px-4">
      <DynamicProductCard product={product} />
    </main>
  );
}
