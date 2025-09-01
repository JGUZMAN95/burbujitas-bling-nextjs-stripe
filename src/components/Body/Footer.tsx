"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { footerNavLinks } from "@/constants/nav-links";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full flex flex-col items-center bg-softWhite text-softBlue font-accent sm:text-md text-sm p-4">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/images/logos/logo-blue.png"
          alt="logo"
          width={200}
          height={0}
          style={{ height: "auto" }}
        />
      </Link>

      <div className="flex space-x-6 p-1 pb-3 ">
        <Link href="https://linktr.ee/burbujitasYbling">
          <Image
            src="/images/icons/linktree.svg"
            alt="Linktree"
            width={18}
            height={18}
          />
        </Link>
        <Link href="https://www.tiktok.com/@burbujitasybling">
          <Image
            src="/images/icons/tiktok.svg"
            width={18}
            height={18}
            alt="TikTok"
          />
        </Link>

        <Link href="https://www.instagram.com/burbujitasybling">
          <Image
            src="/images/icons/instagram.svg"
            width={18}
            height={18}
            alt="Instagram"
          />
        </Link>
      </div>

      {/* Navigation links */}
      <div className="md:space-x-8 space-x-4 flex">
        {footerNavLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`relative pb-1 transition-all duration-300
                    ${pathname === link.path ? "text-softBlue font-bold border-b-2 border-softBlue" : ""}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
