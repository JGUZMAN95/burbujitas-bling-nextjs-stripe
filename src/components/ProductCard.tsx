import Image from 'next/image';
import {Product, urlFor} from '@/lib/client';

type ProductCardProps = {
  item: Product;
};

export default function ProductCard({ item }: ProductCardProps) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <Image
      src={urlFor(item.imageUrl).url()}
      alt={item.name}
      width={300}
      height={300}
      />
      <h3 className="mt-2 font-semibold text-lg">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="mt-1 font-bold">{item.price}</p>
    </div>
  );
}
