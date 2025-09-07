// app/components/ImageComponent.tsx
import { urlFor } from "@/lib/sanity-client";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

type ImageComponentProps = {
  image?: SanityImageObject | string; // accept object or string
  alt?: string;
  className?: string;
};

export default function ImageComponent({
  image,
  alt = "Product",
  className = "",
}: ImageComponentProps) {
  const src = (() => {
    if (!image) return "/images/fallbacks/placeholder.png";
    if (typeof image === "string") return image;
    return (
      urlFor(image)?.width(900).height(900).auto("format").fit("max").url() ||
      "/images/fallbacks/der.png"
    );
  })();

  return (
    <Image
      src={src}
      alt={alt}
      width={900}
      height={900}
      priority={true}
      className={`w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110 hover:duration-500 hover:ease-in origin-bottom ${className}`}
    />
  );
}
