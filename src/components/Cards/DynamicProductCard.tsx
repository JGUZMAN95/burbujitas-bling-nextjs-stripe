"use client";

import React, { useState } from "react";
import AddToCartButton from "../Cart/AddToCartButton";
import { Product } from "@/types/product-type";
import { urlFor } from "@/lib/sanity-client";
import ProductGallery from "./ProductGallery";
import Image from "next/image";

interface DynamicProductCardProps {
  product: Product;
}

export default function DynamicProductCard({
  product,
}: DynamicProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.color && product.color.length > 0 ? product.color[0] : null
  );

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const categoryLabel = product.category
    ? product.category[0].toUpperCase() + product.category.slice(1)
    : "";

  return (
    <div className="max-w-5xl w-full mx-auto text-softBrown font-accent md:grid md:grid-cols-3 md:gap-4">
      {/* Image Section */}
      <div className="md:col-span-2">
        {/* Mobile Gallery */}
        <div className="sm:hidden aspect-square w-full">
          <ProductGallery
            images={product.images}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Grid Gallery */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-2 p-2">
          {product.images.map((image, idx) => (
            <div key={idx} className="aspect-square w-full">
              <Image
                src={urlFor(image).width(900).height(900).url()}
                alt={`${product.name} - image ${idx + 1}`}
                width={900}
                height={900}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="mb-2 p-2 font-body text-softCoral/50 text-md flex flex-col gap-y-6">
        <div>
          <h3 className="font-accent text-lg">{product.name}</h3>
          <p className="md:mb-4">{formattedPrice}</p>

          {/* Sizes Selection */}
          {product.size && product.size.length > 0 && (
            <div className="mb-4">
              <p>Chain Length:</p>
              <div className="flex gap-2 mt-1">
                {product.size.map((size) => (
                  <label
                    key={size}
                    className={`px-3 py-1 border rounded cursor-pointer transition-colors ${
                      selectedSize === size
                        ? "bg-softCoral text-white border-green/20"
                        : "bg-softWhite/40 border-softYellow/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      className="hidden"
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                    />
                    {size}"
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.color && product.color.length > 0 && (
            <div className="mb-4">
              <p>Color:</p>
              <div className="flex gap-2 mt-1">
                {product.color.map((color) => (
                  <label
                    key={color}
                    className={`px-3 py-1 border rounded cursor-pointer transition-colors ${
                      selectedColor === color
                        ? "bg-softCoral text-white border-green/20"
                        : "bg-softWhite/40 border-softYellow/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      className="hidden"
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add to Cart + Description */}
        <div className="grid gap-2 text-darkBrown text-sm">
          <AddToCartButton
            product={product}
            selectedSize={selectedSize ?? undefined}
            selectedColor={selectedColor ?? undefined}
          />

          <p className="font-extrabold text-base">
            {product.name} {categoryLabel} Design
          </p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
