"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import classNames from "classnames";

// Product types
const productTypes = [
  "rings",
  "bracelets",
  "anklets",
  "necklaces",
  "beauty",
  "stickers",
  "handchains",
];

// Get cart from cookies
const getCart = (): { _id: string; quantity: number }[] => {
  if (typeof window === "undefined") return [];
  const cookie = document.cookie.split("; ").find((row) => row.startsWith("cart="));
  if (!cookie) return [];
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return [];
  }
};

export default function Header() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      const total = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartQuantity(total);
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  const staticLinks = [{ name: "Home", path: "/" }];
  const typeLinks = productTypes.map((type) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    path: `/products/${type}`,
  }));
  const navLinks = [...staticLinks, ...typeLinks];

  const showBadge = pathname !== "/cart";

  return (
    <header className="sticky top-0 w-screen bg-softPink shadow-md z-50 font-accent text-softBrown">

      {/* Top shipping bar */}
      <div className="font-body text-softBrown text-sm text-center shadow-sm p-1">
        Free Shipping on Domestic Orders $30+
      </div>

      {/* Mobile row */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden relative">
        {/* Hamburger */}
        <button
          className={classNames("tham tham-e-squeeze tham-w-6", { "tham-active": opened })}
          onClick={() => setOpened(!opened)}
        >
          <div className="tham-box">
            <div className="tham-inner bg-green" />
          </div>
        </button>

        {/* Logo */}
        <Link href="/" className="flex justify-center w-[150px]">
          <Image
            src="/images/logo3.png"
            alt="Burbujitas & Bling"
            width={150}
            height={60}
            className="w-full h-auto"
          />
        </Link>

        {/* Cart */}
        {showBadge && (
          <Link href="/cart" className="relative">
            <Image src="/images/shoppingBag.png" alt="Cart" width={30} height={30} />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-softCoral text-softWhite text-xs flex items-center justify-center h-5 w-5 rounded-full shadow-lg">
                {cartQuantity}
              </span>
            )}
          </Link>
        )}
      </div>

      {/* Desktop logo */}
      <div className="hidden md:flex flex-col items-center py-4">
        <Link href="/" className="flex justify-center w-[300px] mb-2">
          <Image
            src="/images/logo3.png"
            alt="Burbujitas & Bling"
            width={300}
            height={90}
            className="w-full h-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={classNames(
                "pb-1 transition-all duration-300",
                pathname === link.path
                  ? "text-green border-b-2 border-green"
                  : "hover:bg-gradient-to-r hover:from-softCoral hover:to-green hover:text-transparent hover:bg-clip-text hover:border-b-2 hover:border-green"
              )}
            >
              {link.name}
            </Link>
          ))}

          {showBadge && (
            <Link href="/cart" className="relative">
              <Image src="/images/shoppingBag.png" alt="Cart" width={30} height={30} />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-softCoral text-softWhite text-xs flex items-center justify-center h-5 w-5 rounded-full shadow-lg">
                  {cartQuantity}
                </span>
              )}
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile dropdown */}
      {opened && (
        <nav className="flex flex-col items-center md:hidden py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="py-2 text-softBrown font-body hover:text-green transition"
              onClick={() => setOpened(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
