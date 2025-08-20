"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import Button from "../Buttons/StaticButton";

export default function AddToCartButton({ product }: { product: Product }) {
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    // Resolve image URL (first image)

    // Get current cart from cookies
    const cartCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("cart="));

    let cart = cartCookie
      ? JSON.parse(decodeURIComponent(cartCookie.split("=")[1]))
      : [];

    // Add or update product
    const index = cart.findIndex((item: any) => item._id === product._id);
    if (index !== -1) {
      cart[index].stripeQuantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images ? [product.images[0]] : [],
        stripeQuantity: 1, // could update to add more than one at a time later
        slug: product.slug,
        category: product.category,
        stripePriceId: product.stripePriceId,
      });
    }

    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=31536000`;
    window.dispatchEvent(new Event("cart-updated"));
    setAdding(false);
  };

  return (
    <Button
      onClick={handleAdd}
    >
      Add to Bag
    </Button>
  );
}
