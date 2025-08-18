"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface HeaderClientProps {
  cartCount: number;
  navLinks: { name: string; path: string }[];
}

export default function HeaderClient({ cartCount, navLinks }: HeaderClientProps) {
  const pathname = usePathname();
  const [opened, setOpened] = useState(false);
  const [count, setCount] = useState(cartCount);

  useEffect(() => {
    const handler = () => {
      const cookieCart = document.cookie.split("; ").find(row => row.startsWith("cart="));
      if (cookieCart) {
        try {
          const cart = JSON.parse(decodeURIComponent(cookieCart.split("=")[1]));
          const total = cart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
          setCount(total);
        } catch {
          setCount(0);
        }
      } else {
        setCount(0);
      }
    };

    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  // Hide badge on /cart page
  const showBadge = pathname !== "/cart";

  return (
    <>
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-2 md:hidden">
        <button
          onClick={() => setOpened(!opened)}
          className="tham tham-e-squeeze tham-w-6"
        >
          <div className="tham-box">
            <div className="tham-inner bg-green" />
          </div>
        </button>

        <Link href="/" className="flex justify-center w-[150px]">
          <Image
            src="/images/logo3.png"
            alt="B&B"
            width={150}
            height={60}
            className="w-full h-auto"
          />
        </Link>

        {showBadge && (
          <Link href="/cart" className="relative">
            <Image src="/images/shoppingBag.png" alt="Cart" width={30} height={30} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-green text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex flex-col items-center">
        <Link href="/" className="flex justify-center w-[300px] mb-2">
          <Image
            src="/images/logo3.png"
            alt="B&B"
            width={300}
            height={90}
            className="w-full h-auto"
          />
        </Link>

        <nav className="flex items-center space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className={`pb-1 ${pathname === link.path ? "text-green border-b-2 border-green" : "hover:text-green"}`}
            >
              {link.name}
            </Link>
          ))}

          {showBadge && (
            <Link href="/cart" className="relative">
              <Image src="/images/shoppingBag.png" alt="Cart" width={30} height={30} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-green text-white text-xs flex items-center justify-center h-5 w-5 rounded-full">
                  {count}
                </span>
              )}
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      {opened && (
        <nav className="flex flex-col items-center md:hidden py-4">
          {navLinks.map(link => (
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
    </>
  );
}
