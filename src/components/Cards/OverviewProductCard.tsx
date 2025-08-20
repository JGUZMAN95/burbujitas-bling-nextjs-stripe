"use client";
import { Product } from "../../types/product";
import ClickableImage from "../Buttons/ClickableImage";
import FavoriteHeart from "../Buttons/Heart";
import ProductGallery from "./ProductGallery";

interface OverviewProductCardProps {
  product: Product;
}

export default function OverviewCard({ product }: OverviewProductCardProps) {
  if (!product) return <div> Product not found </div>;
  return (
    <div className="relative aspect-square text-darkBrown/80 text-sm md:text-md">
      {/* Label / Badge */}
      <span className="absolute place-items-center top-0 left-0 text-bold text-sm font-bold px-2 py-1 z-10">
        New
      </span>
      <div>
      <ClickableImage productType={product.category} productSlug={product.slug}>
        <div className="aspect-square gap-2">
          <ProductGallery
            images={product.images}
            className="w-full h-full object-cover"
          />
          <div className="font-body uppercase">
            <h1>{product.name}</h1>
            <h2>${product.price}</h2>
          </div>
        </div>
      </ClickableImage>
            <div className="absolute md:bottom-4 bottom-3 right-0 z-10">

      <FavoriteHeart product={product} />
      </div>
      </div>
    </div>
  );
}
