import { SanityImageObject } from "@sanity/image-url/lib/types/types";

// Next.js helper to ensure app knows what a product looks like.
export type Product = {
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  _id: string;
  name: string;
  slug: string; // flattened from { current: string }
  description: string;
  price: number;
  stripePriceId?: string;
  stripeProductId?: string;
  weight: number; //mL
  dimension: string;
  images: SanityImageObject[];
  size?: number[]; 
  color?: string[];
  
  category:
    | "rings"
    | "bracelets"
    | "anklets"
    | "necklaces"
    | "beauty"
    | "handchains"
    | "stickers";
};
