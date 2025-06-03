import { GetStaticProps } from 'next';
import { getProducts } from '@/lib/queries';
import { Product } from '@/src/types/product';
import ProductCard from '@/src/components/ProductCard';

type HomeProps = {
  products: Product[];
};

export default function Home({ products }: HomeProps) {
  return (
    <div className="min-h-screen bg-babyPink p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-deepPlum">Burbujitas & Bling</h1>
        <p className="text-lavender mt-2 text-lg">Little Bubbles & Sparkle ✨</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((products) => (
          <ProductCard key={products._id} product={products} />
        ))}
      </div>
    </div>
  );
}

// Static generation using Sanity
export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: 60, // optional: ISR every 60 seconds
  };
};
