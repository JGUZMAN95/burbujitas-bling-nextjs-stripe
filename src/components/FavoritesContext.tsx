"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "@/utils/cookies";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from cookie on mount
  useEffect(() => {
    const cookieValue = getCookie("favorites");
    try {
      const parsed = cookieValue ? JSON.parse(cookieValue) : [];
      setFavorites(Array.isArray(parsed) ? parsed : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavs = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      setCookie("favorites", JSON.stringify(newFavs), 30);
      return newFavs;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
