import React from "react";
import ImageComponent from "../Body/ImageComponent";
import AddToCartButton from "../Cart/AddToCartButton";
import { Product } from "@/types/product";
import { urlFor } from "@/lib/sanityClient";
import ProductGallery from "./ProductGallery";

interface DynamicProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: DynamicProductCardProps) {
  return (
    <div className="max-w-5xl w-full mx-auto text-softBrown font-accent md:grid md:grid-cols-3 md:gap-2">
      {/* Image Section */}
      <div className="md:col-span-2">
        {/* Mobile Gallery - square swiper */}
        <div className="sm:hidden aspect-square w-full">
          <ProductGallery
            images={product.images}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Gallery */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-2 p-2">
          {product.images.map((image, idx) => (
            <div key={idx} className="aspect-square w-full">
              <img
                src={urlFor(image).width(600).height(600).url()}
                alt={`Product image ${idx + 1}`}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mb-2 p-2 font-body text-softCoral/50 text-md flex flex-col md:gap-10 gap-5">
        <div>
          <h3 className="font-accent text-lg uppercase">{product.name}</h3>
          <p className="md:mb-4">${Number(product.price)}</p>
          {product.color && (
            <div className="mb-4">
              <p>Color:</p>
              <p>{product.color}</p>
            </div>
          )}
        </div>

        <div className="grid gap-2 text-darkBrown text-md text-sm">
          <AddToCartButton product={product} />
          <p className="font-extrabold text-base">
            <span>
              {product.name}{" "}
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1, -1)}
            </span>
            {" Design"}
          </p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
