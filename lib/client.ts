import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "1pcq3sxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
// Helper to build image URLs from Sanity image objects
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}