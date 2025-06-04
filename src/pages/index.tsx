import { getProducts } from '@/lib/sanity/queries';
import { Product } from '@/src/types/product';
import ProductCard from '@/src/components/ProductCard';
import { sanityClient } from '@/lib/sanity/client';

export default function Home({ products = [] }: { products: Product[] }) {
  return (
    <div className="min-h-screen bg-babyPink p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-deepPlum">Burbujitas & Bling</h1>
        <p className="text-lavender mt-2 text-lg">Little Bubbles & Sparkle ✨</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
         {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
      </div>
    </div>
  );
}

// Static generation using Sanity
export async function getStaticProps() {
  const products = await sanityClient.fetch(getProducts); // or whatever your query is

  return {
    props: {
      products,
    },
    revalidate: 60, // optional ISR
  };
};
