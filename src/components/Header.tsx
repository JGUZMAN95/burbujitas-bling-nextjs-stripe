"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import classNames from "classnames";
import { useCart } from "@/src/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const { cart } = useCart();
  const staticLinks = [
    { name: "Home", path: "/" },

  ];
  const productTypes = ["rings", "bracelets", "anklets", "necklaces", "beauty", "stickers", "handchains"];

  const typeLinks = productTypes.map((type) => ({
  name: type.charAt(0).toUpperCase() + type.slice(1),
  path: `/products/${type}`,
}));

const navLinks = [...staticLinks, ...typeLinks];


  return (
    <header className="sticky bg-softPink font-accent text-softBrown text-md w-screen shadow-md">
      <div className=" font-body text-softBrown text-sm place-items-center shadow-sm p-1">
        <p>Free Shipping on Domestic Orders $30+</p>
      </div>
      {/* Top row for mobile: hamburger, logo, cart */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden">
        {/* Hamburger */}
        <button
          className={classNames(
            "tham tham-e-squeeze tham-w-6",
            { "tham-active": opened }
          )}
          onClick={() => setOpened(!opened)}
        >
          <div className="tham-box">
            <div className="tham-inner bg-green" />
          </div>
        </button>

        {/* Logo */}
        <Link href="/" className="flex justify-center">
          <div className="w-[150px]">
            <Image
              src="/images/logo3.png"
              alt="Burbujitas & Bling"
              width={200}
              height={0}
              className="w-full h-full"
            />
          </div>
        </Link>

        {/* Cart */}
        <Link href="/checkout" className="transition hover:scale-110">
          <Image
            src="/images/shoppingBag.png"
            alt="Cart"
            width={30}
            height={30}
                      />

            {cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-softCoral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    )}
        </Link>
      </div>

      {/* Desktop logo */}
      <div className="hidden md:flex justify-center py-4">
        <div className="w-[300px]">
          <Link href="/" className="flex justify-center">
            <Image
              src="/images/logo3.png"
              alt="Burbujitas & Bling"
              width={300}
              height={0}
              className="w-full h-auto"
            />
          </Link>

        </div>
      </div>

      {/* Navigation */}
      <nav
        className={classNames(
          "transition-all duration-300 -mt-10",
          opened ? "flex flex-col items-center" : "hidden md:flex md:justify-center"
        )}
      >
        <div className="flex md:flex-row flex-col items-center space-y-4 md:space-y-0 md:space-x-5 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative pb-1 transition-all duration-300
              ${pathname === link.path
                  ? "text-green border-b-2 border-green"
                  : "hover:bg-gradient-to-r hover:from-softCoral hover:to-green hover:text-transparent hover:bg-clip-text hover:border-b-2 hover:border-green"
                }`}
              onClick={() => setOpened(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Cart */}
        <Link href="/checkout" 
              className="hidden md:block transition hover:scale-110">
          <Image
            src="/images/shoppingBag.png"
            alt="Cart"
            width={45}
            height={45}
                      />

            {cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-softCoral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    )}
        </Link>
        </div>
      </nav>
    </header>
  );
}
