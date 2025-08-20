import { Product } from "@/types/product";
import OverviewProductCard from "@/components/Cards/OverviewProductCard";
import { allProductsQuery } from "../types/flatttenQueries";
import { client } from "../lib/sanityClient";

export default async function HomePage() {
  const products: Product[] = await client.fetch(allProductsQuery);

  const renderProductGrid = (products: Product[], label: string) => (
    <div className="grid gap-2 mb-2 grid-cols-2 md:grid-cols-4 md:px-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="relative w-full max-w-md aspect-square"
        >

          {/* Product card */}
          <OverviewProductCard product={product} />
        </div>
      ))}
    </div>
  );

  return (
    <main className="grid font-body text-md text-darkBrown place-items-center">
      {/* New Products */}
      {renderProductGrid(products, "New")}

      {/* Favorite Products */}
      {renderProductGrid(products, "Faves")}
    </main>
  );
}
