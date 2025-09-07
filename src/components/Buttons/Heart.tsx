"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product-type";
import { getCookie, setCookie } from "@/utils/cookies";

type Props = {
  product: Product;
};

export default function FavoriteHeart({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!product?._id) return;
    const favArray: string[] = JSON.parse(getCookie("favorites") || "[]");
    setIsFavorite(favArray.includes(product._id));
  }, [product._id]);

  const toggleFavorite = () => {
    const favArray: string[] = getCookie("favorites") || [];

    if (isFavorite) {
      setIsFavorite(false);
      setCookie(
        "favorites",
        favArray.filter((id) => id !== product._id),
        30
      );
    } else {
      setIsFavorite(true);
      setCookie("favorites", [...favArray, product._id], 30);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite();
      }}
      className="absolute bottom-2 right-0 w-5 h-5 text-softBrown"
      aria-label="Toggle favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 28"
        className="w-full h-full transition-colors duration-200"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </button>
  );
}
