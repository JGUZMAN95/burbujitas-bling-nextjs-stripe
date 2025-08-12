"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Bracelets", path: "/braclets" },
    { name: "Necklaces", path: "/necklaces" },
    { name: "Rings", path: "/rings" },
    { name: "Handchains", path: "/handchains" },
    { name: "Anklets", path: "/anklets" },
    { name: "Stickers", path: "/stickers" },
    { name: "Lip Oil", path: "/beauty" },
  ];

  return (
    <header className="bg-softPink font-accent text-softBrown text-md flex flex-col items-center justify-center w-screen px-20">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/logo3.png"
          alt="Burbujitas & Bling"
          width={400}
          height={0}
        />
      </Link>

      {/* Nav */}
      <nav className="w-full flex items-center justify-between -mt-9">

        <div className="flex-1 flex justify-center space-x-5">

            {navLinks.map((link) => (

          <Link
            key={link.path}
            href={link.path}
            className={`relative pb-1 transition-all duration-300
              ${pathname === link.path
                ? "text-green border-b-2 border-green"
                : "hover:bg-gradient-to-r hover:from-softCoral hover:to-green hover:text-transparent hover:bg-clip-text hover:border-b-2 hover:border-green"
              }`}
            >

              {link.name}

            </Link>
        ))}
        </div>

        <div className="items-center transition-transform duration-800 hover:-translate-y-1 hover:scale-100">
          {/* Shopping Bag */}
          <Link
            href="/cart">
              <Image
                src="/images/shoppingBag.png"
                alt="Cart"
                width={30}
                height={30}
              />
          </Link>
    </div>
    </nav>
    </header>
  );
}
