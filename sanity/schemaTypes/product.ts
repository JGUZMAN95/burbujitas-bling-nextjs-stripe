import { defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    { name: 'name', type: 'string', validation: (rule) => rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'name', maxLength: 96 }, validation: (rule) => rule.required() },
    { name: 'description', type: 'text' },
    { name: 'price', type: 'number', validation: (rule) => rule.required() },
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'color', type: 'string' },
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
