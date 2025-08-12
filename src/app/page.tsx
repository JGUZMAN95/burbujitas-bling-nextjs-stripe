import { getProducts } from '@/lib/sanity/queries';
import { Product } from '@/src/types/product';
import ProductCard from '@/src/components/ProductCard';
import { sanityClient } from '@/lib/sanity/client';

export default async function HomePage() {
  const products: Product[] = await sanityClient.fetch(getProducts);

  return (
      <div className='grid grid-cols-1 md:grid-cols-2 m-6 md:m-20 gap-8'>

      </div>
  );
}