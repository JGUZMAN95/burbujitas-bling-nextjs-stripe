import { SanityImageObject } from "@sanity/image-url/lib/types/types";

// Next.js helper to ensure app knows what a product looks like.
export type Product = {
  quantity: number;
  _id: string;
  name: string;
  slug: string; // flattened from { current: string }
  description: string;
  color: string;
  price: number;
  images: SanityImageObject[];
  stripePriceId?: string;
  stripeProductId?: string;
  stripeQuantity?: number;
  category:
    | "rings"
    | "bracelets"
    | "anklets"
    | "necklaces"
    | "beauty"
    | "handchains"
    | "stickers";
};
