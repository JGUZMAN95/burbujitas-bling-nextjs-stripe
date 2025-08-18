import { Product } from "./product";

export type CartProduct = Product & {
  quantity: number;
  imageUrl?: string; // ✅ resolved URL
};
