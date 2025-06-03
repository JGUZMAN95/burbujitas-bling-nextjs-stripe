// ./lib/queries.ts
import { client } from './client';

export async function getProducts() {
    return await client.fetch(`*[_type == "product"]{
      _id,
      name,
      price,
      description,
      "image": image.asset->url
    }`);
}
