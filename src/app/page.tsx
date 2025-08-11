import { getProducts } from '@/lib/sanity/queries';
import { Product } from '@/src/types/product';
import ProductCard from '@/src/components/ProductCard';
import { sanityClient } from '@/lib/sanity/client';
import Button from '../components/Button';

export default async function HomePage() {
  const products: Product[] = await sanityClient.fetch(getProducts);

  return (
    <div>
      <Button>Click Me!!!</Button>
      <div>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}