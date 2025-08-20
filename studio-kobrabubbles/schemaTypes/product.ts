// studio-kobrabubbles/schemas/schemaTypes/product.ts
import {defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'price', title: 'Price', type: 'number'},
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true}, // allows cropping
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Rings', value: 'rings'},
          {title: 'Bracelets', value: 'bracelets'},
          {title: 'Anklets', value: 'anklets'},
          {title: 'Necklaces', value: 'necklaces'},
          {title: 'Beauty', value: 'beauty'},
          {title: 'Handchains', value: 'handchains'},
          {title: 'Stickers', value: 'stickers'},
        ],
      },
    },
    {name: 'color', title: 'Color', type: 'string'},
    {name: 'stripePriceId', title: 'Stripe Price ID', type: 'string'},
    {name: 'stripeProductId', title: 'Stripe Product ID', type: 'string'},
    {name: 'stripeQuantity', title: 'Stripe Quantity', type: 'number'},
  ],
})
