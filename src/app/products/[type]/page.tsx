import { sanityClient } from "@/lib/sanity/client";
import { Product } from "@/src/types/product";
import OverviewProductCard from "../../../components/OverviewProductCard";

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
    <div className="p-6">
        {products.map((product) => (
          <OverviewProductCard key={product._id} product={product} />
        ))}
    </div>
  );
}

// Generate static params for each type
export async function generateStaticParams() {
  const types = ["rings", "bracelets", "anklets", "necklaces", "beauty", "stickers", "handchains"];
  return types.map((type) => ({ type }));
}
