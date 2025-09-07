"use client";

import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import CartSummary from "../Cart/CartSummary";
import Image from "next/image";
import { menuNavLinks } from "@/constants/nav-links";
const getCart = () => {
  if (typeof window === "undefined") return [];
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("cart="));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return [];
  }
};

export default function Header() {
  const [isCartOpen, openCart] = useState(false);
  const [isMenuOpen, openMenu] = useState(false);
  const [cartItems, updateCartItems] = useState<
    {
      _id: string;
      quantity: number;
      name?: string;
      image?: string;
      price?: number;
    }[]
  >([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateCart = () => updateCartItems(getCart());
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeHandler = () => openCart(false);
    window.addEventListener("close-cart", closeHandler);
    return () => window.removeEventListener("close-cart", closeHandler);
  }, []);

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="relative font-accent">
      {/* Top bar */}
      <div className="bg-softPink text-center text-sm p-1 font-body text-softBrown">
        Free Shipping on Domestic Orders $35+
      </div>

      {/* Mobile Header */}
      <div className="flex justify-between items-center px-4 md:hidden bg-softPink border-b border-softBrown/20 py-2">
        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          className={classNames("tham tham-e-squeeze tham-w-6", {
            "tham-active": isMenuOpen,
          })}
          onClick={() => openMenu((o) => !o)}
        >
          <div className="tham-box">
            <div className="tham-inner bg-green" />
          </div>
        </button>

        {/* Logo */}
        <Link href="/" className="flex justify-center">
          <Image
            src="/images/logos/logo-pink.png"
            alt="Burbujitas & Bling"
            width={180}
            height={180}
            priority={true}
          />
        </Link>

        {/* Cart Button */}
        <button className="relative" onClick={() => openCart(true)}>
          <Image
            src="/images/icons/shopping-bag.png"
            alt="Cart"
            width={30}
            height={30}
            priority={true}
          />
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center text-md font-bold text-softBrown">
              {cartQuantity}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex flex-col items-center bg-softPink">
        {/* Logo */}
        <Link href="/" className="flex justify-center w-[220px] mb-2">
          <Image
            src="/images/logos/logo-pink.png"
            alt="Burbujitas & Bling"
            width={scrolled ? 176 : 220}
            height={90}
            className="w-full h-auto"
            priority={true}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center space-x-2 mb-2 px-4 w-full max-w-2xl justify-between">
          {menuNavLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="pb-1 transition-all duration-300 hover:bg-gradient-to-r hover:from-softCoral hover:to-green hover:text-transparent hover:bg-clip-text hover:border-b-2 hover:border-green"
            >
              {link.name}
            </Link>
          ))}

          {/* Cart */}
          <button className="relative mb-2" onClick={() => openCart(true)}>
            <Image
              src="/images/icons/shopping-bag.png"
              alt="Cart"
              width={30}
              height={30}
              priority={true}
            />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center text-md font-bold text-softBrown">
                {cartQuantity}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* --- Overlays --- */}
      {(isCartOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => {
            openCart(false);
            openMenu(false);
          }}
        />
      )}

      {/* --- Cart Drawer (Right) --- */}
      <div
        className={classNames(
          "fixed top-0 right-0 h-full w-72 bg-softWhite z-50 transform transition-transform duration-300",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          className="absolute top-4 left-4 text-lg font-bold"
          onClick={() => openCart(false)}
        >
          ×
        </button>
        <div className="overflow-y-auto h-full">
          <CartSummary />
        </div>
      </div>

      {/* --- Mobile Menu Drawer (Left) --- */}
      <div
        className={classNames(
          "fixed top-0 left-0 h-full w-64 bg-softWhite z-50 transform transition-transform duration-300 md:hidden",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          className="absolute top-4 right-4 text-lg font-bold"
          onClick={() => openMenu(false)}
        >
          ×
        </button>
        <nav className="flex flex-col p-6 space-y-4">
          {menuNavLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="font-bold text-softBrown"
              onClick={() => openMenu(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
