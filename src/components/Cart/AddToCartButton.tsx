"use client";

import { Product } from "@/types/product-type";
import { useState } from "react";
import Button from "../Buttons/StaticButton";

export default function AddToCartButton({ product }: { product: Product }) {
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
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
      cart[index].quantity += 1;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images ? [product.images[0]] : [],
        quantity: 1, // could update to add more than one at a time later
        slug: product.slug,
        category: product.category,
        stripePriceId: product.stripePriceId,
      });
    }

    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=31536000`;
    window.dispatchEvent(new Event("cart-updated"));
    setAdding(false);
  };

  return <Button onClick={handleAdd}>Add to Bag</Button>;
}
