import OverviewProductCard from "@/components/Cards/OverviewProductCard";
import { client } from "@/lib/sanityClient";
import { productsByCategoryQuery } from "@/types/flatttenQueries";
import { Product } from "@/types/product";

interface Props {
  params: { category: string };
}

export default async function ProductPage({ params }: Props) {
  const products: Product[] = await client.fetch(productsByCategoryQuery, {
    category: params.category,
  });

  if (!products) return <div className="p-6">Product not found</div>;

  return (
    <main className="flex justify-center md:p-2 min-h-full">
      <div className="md:mb-4 mb-2 grid md:gap-4 gap-2 grid-cols-2 md:grid-cols-4 justify-center">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative w-full max-w-xs mx-auto aspect-square md:p-2"
          >
            {/* Product card */}
            <OverviewProductCard product={product} />
          </div>
        ))}
      </div>
    </main>
  );
}
