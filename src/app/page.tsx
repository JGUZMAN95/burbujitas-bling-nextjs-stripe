"use client"

import React, { useState, useEffect } from "react";
import OverviewProductCard from "@/src/components/OverviewProductCard";
import { sanityClient } from "@/lib/sanity/client";
import type { Product } from "@/src/types/product";
import type { CartProduct } from "@/src/types/cart";

export default async function Page() {
  // Fetch products from Sanity
  const products: Product[] = await sanityClient.fetch(`*[_type == "product"]`);

  return <ProductGrid products={products} />;
}

// Separate client-side component to handle cart state
function ProductGrid({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-5">
        {products.map((product) => (
          <OverviewProductCard
            key={product._id}
            product={product}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
}
