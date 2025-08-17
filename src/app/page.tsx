import { getProducts } from '@/lib/sanity/queries';
import { Product } from '@/src/types/product';
<<<<<<< HEAD
import ProductCard from '@/src/components/ProductCard';
import { sanityClient } from '@/lib/sanity/client';

=======
import OverviewProductCard from '@/src/components/OverviewProductCard';
import { sanityClient } from '@/lib/sanity/client';
>>>>>>> 9bc74c3 (Remove large video file from repo)
export default async function HomePage() {
  const products: Product[] = await sanityClient.fetch(getProducts);

  return (
<<<<<<< HEAD
      <div className='grid grid-cols-1 md:grid-cols-2 m-6 md:m-20 gap-8'>

      </div>
=======
    <div className='break-normal justify-center p-5 w-screen'>
      {/*<video className="my-5 rounded-lg shadow-md" autoPlay muted controls loop disablePictureInPicture disableRemotePlayback controlsList='nodownload nofullscreen noplaybackrate'>
          <source
            src="https://www.canva.com/design/DAGvs0eQvcU/klXhAicf0KoCMV8YUNubRg/watch"
            type="video/mp4"
          />
          Your browser does not support the video tag.
      </video>*/}
<div className="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" className="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGvs0eQvcU/klXhAicf0KoCMV8YUNubRg/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
<a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGvs0eQvcU&#x2F;klXhAicf0KoCMV8YUNubRg&#x2F;watch?utm_content=DAGvs0eQvcU&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Burbujitas &amp; b ling (2560 x 1440 px)</a> by Jocelyn Guzman
      <div className='grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-5 '>
        {products.map((product) => (
          <OverviewProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
>>>>>>> 9bc74c3 (Remove large video file from repo)
  );
}