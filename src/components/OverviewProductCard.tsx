import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';
import { Product } from '@/src/types/product';
import Link from 'next/link';

export default function OverviewProductCard({ product }: {product: Product}) {
  const imageUrl = product.image ? urlFor(product.image).url() : '/placeholder.png';

  return (
    <Link className='bg-softWhite w-fill h-auto shadow-md truncate' href={`/products/${product.productType}/${product.slug.current}`}>
      <div className="flex">
        <Image
          src={imageUrl}
          alt={product.name}
          width={300}
          height={100}
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />

      </div>

      <h3 className="font-heading text-softCoral">{product.name}</h3>
      <p className="font-body text-softBrown line-clamp-2">{product.description}</p>
      <p className="font-heading text-softCoral">${product.price.toFixed(2)}</p>
    </Link>
    
  );
}