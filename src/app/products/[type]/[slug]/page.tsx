import { sanityClient, urlFor } from "@/lib/sanity/client";
import { Product } from '@/src/types/product';
import DynamicProductCard from "@/src/components/DynamicProductCard"

type Props = {
  params: { slug: string };
};

export default async function ProductPage({ params }: Props) {
  const product: Product = await sanityClient.fetch(
  `*[_type == "product" && productType == $type && slug.current == $slug][0]`,
  { type: params.type, slug: params.slug }  // ✅ pass both params
);

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  const imageUrl = product.image ? urlFor(product.image).url() : "/placeholder.png";

  return (
      <div>
        <DynamicProductCard product={product}/>
      </div>
  );
}

export async function generateStaticParams() {
  const products: Product[] = await sanityClient.fetch(`*[_type == "product"]{ productType, slug }`);
  return products.map((p) => ({
    slug: p.slug.current,
  }));
}