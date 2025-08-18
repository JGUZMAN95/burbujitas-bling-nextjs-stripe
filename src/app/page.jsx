import { getProducts } from "@/src/lib/sanity/queries";
import OverviewProductCard from "../components/OverviewProductCard";
import { sanityClient } from "@/src/lib/sanity/client";
export default async function HomePage() {
    const products = await sanityClient.fetch(getProducts);
    return (<div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-5">
      {products.map((product) => (<OverviewProductCard key={product._id} product={product}/>))}
    </div>);
}
