import OverviewProductCard from "@/components/Cards/OverviewProductCard";
import { client } from "@/lib/sanity-client";
import { productsByCategoryQuery } from "@/types/flatten-queries";
import { Product } from "@/types/product-type";

interface Props {
  params: { category: string };
}

export default async function ProductPage({ params }: Props) {
  const products: Product[] = await client.fetch(productsByCategoryQuery, {
    category: params.category.toLowerCase(),
  });

  if (!products?.length) {
    return (
      <div className="p-6 text-xl flex justify-center items-start h-full">
        No Products :(
      </div>
    );
  }

  return (
    <main className="flex justify-center min-h-full px-2 md:px-4 py-4">
      <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl auto-rows-auto">
        {products.map((product) => (
          <li key={product._id} className="w-full">
            <OverviewProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
}
