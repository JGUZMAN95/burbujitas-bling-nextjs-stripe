"use client";

import { Product } from "@/types/product-type";
import { useEffect, useState } from "react";
import Button from "../Buttons/StaticButton";
import { getCookie, setCookie } from "@/utils/cookies";
import { urlFor } from "@/lib/sanity-client";

interface CartItemProps {
  product: Product;
  selectedSize?: number | null;
  selectedColor?: string | null;
}

export default function AddToCartButton({
  product,
  selectedSize,
  selectedColor,
}: CartItemProps) {
  const isSizeRequired = product.size && product.size.length > 0;

  const [isDisabled, setIsDisabled] = useState(isSizeRequired);
  const [buttonText, setButtonText] = useState(
    isSizeRequired ? "Select Size" : "Add to Bag"
  );

  // Enable/disable button depending on selection
  useEffect(() => {
    if (isSizeRequired && !selectedSize) {
      setButtonText("Select Size");
      setIsDisabled(true);
    } else {
      setButtonText("Add to Bag");
      setIsDisabled(false);
    }
  }, [selectedSize, isSizeRequired]);

  const handleAdd = () => {
    if (isDisabled) return;

    let cart: any[] = getCookie("cart") ?? [];
    if (!Array.isArray(cart)) cart = [];
    console.log("Cart before add:", cart);

    // Check if product with same options exists
    const existingItem = cart.find(
      (item) =>
        item.productId === product._id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        _id: crypto.randomUUID(), // unique cart item ID
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        slug: product.slug,
        category: product.category,
        selectedSize,
        selectedColor,
        stripePriceId: product.stripePriceId, // Nedded to connect to stripe successfully.
        stripeProductId: product.stripeProductId, // Nedded to connect to stripe successfully.
      });
      console.log("Added new item: ");
    }

    setCookie("cart", cart, 7); // save for 7 days

    window.dispatchEvent(new Event("cart-updated")); // notify other components about quantity updates.
    setButtonText("Adding...");

    // Reset button after 1.2s
    setTimeout(() => setButtonText("Add to Bag"), 1000);
    console.log("Cart after add:", cart);
  };

  return (
    <Button
      onClick={handleAdd}
      className={`transition-colors duration-200 ${
        !isDisabled
          ? "bg-softYellow md:hover:bg-softCoral/80 text-white"
          : "bg-softYellow/40 text-gray-500 cursor-not-allowed"
      }`}
    >
      {buttonText}
    </Button>
  );
}
