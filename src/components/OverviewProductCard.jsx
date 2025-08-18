"use client";
import React, { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/src/lib/sanity/image";
import Link from "next/link";
// Helper to get and set cart in cookies
const getCart = () => {
    if (typeof window === "undefined")
        return [];
    const cookie = document.cookie.split("; ").find((row) => row.startsWith("cart="));
    if (!cookie)
        return [];
    try {
        return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    }
    catch (_a) {
        return [];
    }
};
const setCart = (cart) => {
    document.cookie = `cart=${encodeURIComponent(JSON.stringify(cart))}; path=/`;
    window.dispatchEvent(new Event("cart-updated"));
};
export default function OverviewProductCard({ product }) {
    const [adding, setAdding] = useState(false);
    // Resolve image URL safely
    const imageUrl = product.image ? urlFor(product.image) : "/placeholder.png";
    const handleAddToCart = () => {
        setAdding(true);
        const cart = getCart();
        const index = cart.findIndex((item) => item._id === product._id);
        if (index !== -1) {
            cart[index].quantity += 1;
        }
        else {
            cart.push(Object.assign(Object.assign({}, product), { quantity: 1, imageUrl }));
        }
        setCart(cart);
        setAdding(false);
    };
    return (<div className="bg-softWhite shadow-md transition-transform duration-300 hover:scale-105 p-2">
      <Link href={`/products/${product.productType}/${product.slug.current}`} className="block mb-2">
        <Image src={imageUrl} alt={product.name} width={300} height={100} className="object-cover w-full h-auto"/>
      </Link>

      <h3 className="font-heading text-softCoral">{product.name}</h3>
      <p className="font-body text-softBrown line-clamp-2">{product.description}</p>
      <p className="font-heading text-softCoral">${product.price.toFixed(2)}</p>

      <button onClick={handleAddToCart} disabled={adding} className="mt-2 px-4 py-2 bg-softCoral text-white rounded hover:bg-softPink transition">
        {adding ? "Adding..." : "Add to Cart"}
      </button>
    </div>);
}
