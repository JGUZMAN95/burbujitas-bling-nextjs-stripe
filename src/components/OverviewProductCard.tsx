"use client";

import React, { useState } from "react";
import type { Product } from "@/src/types/product";
import type { CartProduct } from "@/src/types/cart";
import { urlFor } from "@/lib/sanity/client";

type Props = {
  product: Product;
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
};

export default function OverviewProductCard({ product, cart, setCart }: Props) {
  const addToCart = () => {
    const imageUrl = product.image ? urlFor(product.image).url() : undefined;

    const existing = cart.find((p) => p._id === product._id);

    if (existing) {
      // increment quantity if already in cart
      const updated = cart.map((p) =>
        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    } else {
      // add new CartProduct
      const newItem: CartProduct = {
        ...product,   // spread all product fields
        imageUrl,     // resolved URL
        quantity: 1,  // start at 1
      };
      const updated = [...cart, newItem];
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  return (
    <div className="product-card">
      {product.image && (
        <img src={urlFor(product.image).url()} alt={product.name} width={150} />
      )}
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
