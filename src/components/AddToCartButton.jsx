// components/AddToCartButton.tsx
"use client";
import { useState } from "react";
export default function AddToCartButton({ product }) {
    const [adding, setAdding] = useState(false);
    const handleAdd = async () => {
        setAdding(true);
        await fetch("/api/add-to-cart", {
            method: "POST",
            body: JSON.stringify(product),
            headers: { "Content-Type": "application/json" },
        });
        setAdding(false);
        // Notify header to refresh cart count
        window.dispatchEvent(new Event("cart-updated"));
    };
    return (<button onClick={handleAdd} disabled={adding} className="absolute bg-softCoral text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">
      {adding ? "Adding..." : "Add to Cart"}
    </button>);
}
