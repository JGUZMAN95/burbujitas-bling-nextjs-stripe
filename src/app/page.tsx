import { Product } from "@/types/product-type";
import OverviewProductCard from "@/components/Cards/OverviewProductCard";
import { allProductsQuery } from "../types/flatten-queries";
import { client } from "../lib/sanity-client";

export default async function HomePage() {
  const products: Product[] = await client.fetch(allProductsQuery);

  const ProductGrid = (products: Product[]) => (
    <div className="grid gap-2 mb-2 grid-cols-2 md:grid-cols-4 md:px-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative w-full max-w-md aspect-square"
        >
          {/* Product card */}
          <OverviewProductCard aria-label={product.name} product={product} />
        </div>
      ))}
    </div>
  );

  return (
    <main className="grid font-body text-md text-darkBrown place-items-center">
      {ProductGrid(products)}
      {/*Todo: Add sections for Featured Products and Best Sellers*/}
    </main>
  );
}
