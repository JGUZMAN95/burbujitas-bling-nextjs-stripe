import { defineType } from "sanity";
import { product } from "./schemaTypes/product";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default {
  name: "default",
  title: "Burbujitas & Bling Studio",
  projectId,
  dataset,
  schema: {
    types: [product],
  },
};
