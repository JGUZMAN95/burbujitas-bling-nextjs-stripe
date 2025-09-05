"use client";

import { Product } from "../../types/product-type";
import ClickableImage from "../Buttons/ClickableImage";
import FavoriteHeart from "../Buttons/FavoriteHeart";
import ProductGallery from "./ProductGallery";

interface OverviewProductCardProps {
  product: Product;
}

export default function OverviewProductCard({
  product,
}: OverviewProductCardProps) {
  if (!product) return <div>Product not found</div>;

  return (
    <div className="relative text-softBrown/80 text-sm flex flex-col">
      <ClickableImage productType={product.category} productSlug={product.slug}>
        <div className="w-full">
          <div className="aspect-square w-full">
            <ProductGallery
              images={product.images}
              className="w-full h-full object-cover"
              productName={product.name}
            />
          </div>
        </div>

        <div className="font-body uppercase text-left mt-2">
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
        </div>
      </ClickableImage>

      <FavoriteHeart product={product} />
    </div>
  );
}
