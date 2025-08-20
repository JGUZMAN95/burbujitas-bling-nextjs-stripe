import { Product } from "@/types/product";
import DynamicProductCard from "@/components/Cards/DynamicProductCard";
import { productBySlugQuery } from "@/types/flatttenQueries";
import { client } from "@/lib/sanityClient";

interface Props {
  params: { slug: string };
}

export default async function ProductPage({ params }: Props) {
  const product: Product | null = await client.fetch(productBySlugQuery, {
    slug: params.slug,
  });

  if (!product) return <div>Product not found</div>;

  return (
    <main className="min-h-full flex">
      <DynamicProductCard product={product} />
    </main>
  );
}
