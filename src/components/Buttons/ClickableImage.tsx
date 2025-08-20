// src/components/ClickableImage.tsx
import Link from "next/link";
import React, { ReactNode } from "react";

interface ClickableImageProps {
  productType: string;
  productSlug: string;
  children: ReactNode; // allow passing the image or any JSX
}

export default function ClickableImage({ productType, productSlug, children,}:
     ClickableImageProps) {
        return (
            <Link href={`/products/${productType}/${productSlug}`}>{children}</Link>
        );
}
