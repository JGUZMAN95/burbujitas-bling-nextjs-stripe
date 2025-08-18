import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source).url();
