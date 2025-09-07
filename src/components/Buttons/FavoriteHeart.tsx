"use client";
import React, { useState, useEffect } from "react";
import { getCookie, setCookie } from "@/utils/cookies";
import { Product } from "@/types/product-type";

type Props = {
  product: Product;
};

export default function FavoriteHeart({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavArray = (): string[] => {
    const cookieValue = getCookie("favorites");
    if (!cookieValue) return [];
    try {
      const parsed = JSON.parse(cookieValue);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    if (!product?._id) return;
    const favArray = getFavArray();
    setIsFavorite(favArray.includes(product._id));
  }, [product._id]);

  const toggleFavorite = () => {
    const favArray = getFavArray();

    if (isFavorite) {
      setIsFavorite(false);
      setCookie(
        "favorites",
        JSON.stringify(favArray.filter((id) => id !== product._id)),
        30
      );
    } else {
      setIsFavorite(true);
      setCookie("favorites", JSON.stringify([...favArray, product._id]), 30);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite();
      }}
      className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center"
      aria-label="Toggle favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 28"
        className={`w-full h-full transition-all text-softBrown duration-300 ease-in-out transform ${
          isFavorite ? "scale-110" : "scale-100"
        }`}
        fill={isFavorite ? "currentColor" : "none"} // ← only filled if favorite
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
       2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
       C13.09 3.81 14.76 3 16.5 3
       19.58 3 22 5.42 22 8.5
       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
}
