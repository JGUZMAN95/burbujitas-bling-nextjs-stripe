// app/page.tsx or app/(home)/page.tsx
import { product } from '@/sanity/schemaTypes/product';
import ProductCard from '@/src/components/ProductCard';

export default async function HomePage() {
  const products = await product(); // data fetching on server

  return <ProductCard product={products} />;
}
