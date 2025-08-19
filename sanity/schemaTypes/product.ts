import { defineType } from "sanity";

export const product = defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    { name: "name", type: "string"},
    { name: "slug", type: "slug", options: { source: "name", maxLength: 96 } },
    { name: "description", type: "text" },
    { name: "price", type: "number" },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "color", type: "string" },
    {
      name: "productType",
      type: "string",
      options: {
        list: [
          { title: "Rings", value: "rings" },
          { title: "Bracelets", value: "bracelets" },
          { title: "Anklets", value: "anklets" },
          { title: "Necklaces", value: "necklaces" },
          { title: "Beauty", value: "beauty" },
          { title: "Hand Chains", value: "handchains" },
          { title: "Stickers", value: "stickers" },
        ],
      },
    },
  ],
});

export const schemaTypes = [product];
