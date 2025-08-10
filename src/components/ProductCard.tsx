import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';
import { Product } from '@/src/types/product';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image ? urlFor(product.image).url() : '/placeholder.png';

  return (
    <div className="border rounded p-4 shadow-sm">
      <Image
        src={imageUrl}
        alt={product.name}
        width={300}
        height={300}
        loading="lazy"
        className="object-cover"
      />
      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-1 font-bold">${product.price.toFixed(2)}</p>
    </div>
  );
}
