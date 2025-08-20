// app/components/ImageComponent.tsx
import { urlFor } from "@/lib/sanityClient";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

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
  const src =
    typeof image === "string"
      ? image
      : image
        ? urlFor(image).width(900).height(900).auto("format").fit("max").url()
        : "/images/placeholder.png";

  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover rounded transition-transform duration-300 ease-out hover:scale-110 hover:duration-500 hover:ease-in origin-bottom ${className}`}
    />
  );
}
