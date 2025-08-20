"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";

// --- Helpers ---
const getCart = (): { _id: string; stripeQuantity: number }[] => {
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
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // --- Cart Sync ---
  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setCartQuantity(cart.reduce((acc, item) => acc + item.stripeQuantity, 0));
    };

    updateCart();
    window.addEventListener("cart-updated", updateCart, { passive: true });
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  // --- Scroll Handling ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (opened) setOpened(false); // auto-close menu on scroll
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [opened]);

  // --- Close Mobile Menu Utility ---
  const closeMobileMenu = useCallback(() => {
    if (opened) setOpened(false);
  }, [opened]);

  // --- Navigation Links ---
  const staticLinks = [{ name: "Home", path: "/" }];
  const types = [
    "rings",
    "bracelets",
    "anklets",
    "necklaces",
    "beauty",
    "stickers",
    "handchains",
  ];
  const navLinks = [
    ...staticLinks,
    ...types.map((category) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      path: `/products/${category}`,
    })),
  ];

  const showBadge = pathname !== "/cart";

  return (
    <header className="bg-softPink shadow-sm z-20 lg:text-md text-sm font-accent text-softBrown">
      {/* Top Shipping Bar */}
      <div className="font-body text-softBrown text-center shadow-sm p-1">
        Free Shipping on Domestic Orders $35+
      </div>

      {/* --- Mobile Header Row --- */}
      <div
        className={classNames(
          "flex items-center justify-between px-4 md:hidden relative",
          scrolled ? "py-1.5" : "py-2.5"
        )}
      >
        {/* Hamburger */}
        <button
          className={classNames("tham tham-e-squeeze tham-w-6", {
            "tham-active": opened,
          })}
          onClick={() => setOpened((o) => !o)}
        >
          <div className="tham-box">
            <div className="tham-inner bg-green" />
          </div>
        </button>

        {/* Mobile Logo */}
        <Link
          href="/"
          className="flex justify-center"
          onClick={closeMobileMenu}
        >
          <img
            src="/images/logos/logo3.png"
            alt="Burbujitas & Bling"
            width={180}
            height={180}
          />
        </Link>

        {/* Cart (Mobile) */}
        <Link href="/checkout" className="relative" onClick={closeMobileMenu}>
          <img
            src="/images/body/shoppingBag.png"
            alt="Cart"
            width={30}
            height={30}
          />
          {cartQuantity > 0 && (
            <span className="absolute -top-3 -right-3 flex items-center justify-center text-md font-bold text-softBrown">
              {cartQuantity}
            </span>
          )}
        </Link>
      </div>

      {/* --- Desktop Header --- */}
      <div className="hidden md:flex flex-col items-center">
        {/* Desktop Logo */}
        <Link href="/" className="flex justify-center w-[220px] mb-2">
          <img
            src="/images/logos/logo3.png"
            alt="Burbujitas & Bling"
            width={scrolled ? 176 : 220} // shrink on scroll
            height={90}
            className="w-full h-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center space-x-6 mb-2">
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

          {/* Cart (Desktop) */}
          {showBadge && (
            <Link href="/checkout" className="relative">
              <img
                src="/images/body/shoppingBag.png"
                alt="Cart"
                width={30}
                height={30}
              />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center text-md font-bold text-softBrown">
                  {cartQuantity}
                </span>
              )}
            </Link>
          )}
        </nav>
      </div>

      {/* --- Mobile Dropdown Nav --- */}
      <div
        className={classNames(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          opened ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        )}
      >
        <nav className="flex flex-col items-center space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="py-2 text-softBrown font-accent hover:text-green transition"
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
