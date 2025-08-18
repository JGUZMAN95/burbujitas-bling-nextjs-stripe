"use client";

import { useState } from "react";
import { Product } from "../types/product";
import { urlFor } from "@/lib/sanity/client";

interface DynamicProductCardProps {
  product: Product;
}

export default function DynamicProductCard({ product }: DynamicProductCardProps) {
  const [adding, setAdding] = useState(false);
  const imageUrl = product.image ? urlFor(product.image).url() : "/placeholder.png";

  const getCart = (): {
    _id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }[] => {
    if (typeof window === "undefined") return [];
    const cookie = document.cookie.split("; ").find((row) => row.startsWith("cart="));
    if (!cookie) return [];
    try {
      return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    } catch {
      return [];
    }
  };

  const setCart = (cart: any[]) => {
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=31536000`;
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleAddToCart = () => {
    setAdding(true);

    // Get current cart
    const cart = getCart();
        const index = cart.findIndex((item) => item._id === product._id);

    if (index !== -1) {
  cart[index].quantity += 1;
} else {
  cart.push({
    _id: product._id,
    name: product.name,
    price: product.price,
    image: imageUrl || "/placeholder.png",
    quantity: 1,
  });
}

    setCart(cart);
    setAdding(false);
  };

  return (
    <div className="transition-transform duration-300 m-4">
      <div className="md:grid md:grid-cols-2 gap-10">
        <img
          src={imageUrl}
          alt={product.name}
          className="object-cover w-full h-auto"
        />

        <div>
          <h3 className="font-heading text-softCoral">{product.name}</h3>
          <p>Color: {product.color}</p>
          <p>${Number(product.price).toFixed(2)}</p>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="mt-2 bg-softCoral text-white px-4 py-2 rounded"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>

          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
