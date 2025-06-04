import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { clientConfig } from './config';

export const sanityClient = createClient(clientConfig);

// Helper to build image URLs from Sanity image objects
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}