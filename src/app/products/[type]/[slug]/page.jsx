import { sanityClient } from "@/src/lib/sanity/client";
import { urlFor } from "@/src/lib/sanity/image";
import DynamicProductCard from "@/src/components/DynamicProductCard";
export default async function ProductPage({ params }) {
    const product = await sanityClient.fetch(`*[_type == "product" && productType == $type && slug.current == $slug][0]`, { type: params.type, slug: params.slug } // ✅ pass both params
    );
    if (!product) {
        return <div className="p-6">Product not found</div>;
    }
    const imageUrl = product.image ? urlFor(product.image) : "/placeholder.png";
    return (<div>
        <DynamicProductCard product={product}/>
      </div>);
}
export async function generateStaticParams() {
    const products = await sanityClient.fetch(`*[_type == "product"]{ productType, slug }`);
    return products.map((p) => ({
        slug: p.slug.current,
    }));
}
