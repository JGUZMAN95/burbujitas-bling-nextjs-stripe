// lib/getProductImageBySlug.ts
import { client } from "@/lib/sanity-client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export async function getProductImageBySlug(category: string, slug: string) {
  const query = `*[_type == "product" && category == $category && slug.current == $slug][0]{
    images[0]
  }`;

  const product = await client.fetch(query, { category, slug });
  if (!product?.images) return null;

  return builder.image(product.images).width(400).height(400).url();
}
