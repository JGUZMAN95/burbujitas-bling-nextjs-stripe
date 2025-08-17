"use client";

import { urlFor } from "@/lib/sanity/client";
import { Product } from "../types/product";
import Button from "./Button";
import Image from "next/image";
import { useCart } from "@/src/context/CartContext";

export default function ProductCard({ product }: {product: Product}) {
      const imageUrl = product.image ? urlFor(product.image).url() : '/placeholder.png';
      const { addToCart } = useCart();

  return (
    <div className=" transition-transform duration-300 ease-in-out place-items-start m-4 h-screen">
      <div className="md:grid md:grid-cols-2 gap-10">
        
          <Image
          src={imageUrl}
          alt={product.name}
          width={900}
          height={0}
          className="object-cover ease-in-out"/>  

      <div className='grid-rows md:text-md text-sm'>
        <h3 className="font-heading text-softCoral">{product.name}</h3>
        <p className="font-heading text-softCoral my-5">Color: {product.color}</p>
        <p className="font-heading text-softCoral my-5">${product.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(product)}>Add to cart</Button>
        <p className="font-body text-softBrown break-normal my-5">{product.description}</p>


      </div>
</div>
        
  </div>
  );
}
