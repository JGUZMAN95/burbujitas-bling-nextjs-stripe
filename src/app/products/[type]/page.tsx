import { sanityClient } from "@/src/lib/sanity/client";
import { Product } from "@/src/types/product";
import OverviewProductCard from "@/src/components/OverviewProductCard";

type Props = {
  params: { type: string };
};

export default async function ProductsByTypePage({ params }: Props) {
  const products: Product[] = await sanityClient.fetch(
    `*[_type == "product" && productType == $type]{
      _id,
      name,
      slug,
      description,
      price,
      image,
      color,
      productType,
    }`,
    { type: params.type }
  );

  if (!products || products.length === 0) {
    return <div className="p-6">No products found for "{params.type}"</div>;
  }

  return (
    <div className="break-normal justify-center p-5">
      <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-5">
          {products.map((product) => (
            <OverviewProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

// Generate static params for each type
export async function generateStaticParams() {
  const types = ["rings", "bracelets", "anklets", "necklaces", "beauty", "stickers", "handchains"];
  return types.map((type) => ({ type }));
}
