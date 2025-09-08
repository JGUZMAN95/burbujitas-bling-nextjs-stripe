// studio-kobrabubbles/schemas/schemaTypes/product.ts
import {defineType} from 'sanity'

// Define the schema for the "product" document type in Sanity.
export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    },
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'price', title: 'Price', type: 'number', validation: (Rule) => Rule.required()},
    {name: 'dimensions', title: 'Dimensions', type: 'string'},
    {
      name: 'size',
      title: 'Available Sizes',
      type: 'array',
      of: [{type: 'number'}],
      description: 'List all available sizes, e.g., S, M, L, XL',
    },
    {name: 'weight', title: 'Weight', type: 'number'},
    {
      name: 'color',
      title: 'Color',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List all available colors, e.g., Red, Blue, Black',
    },
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
          {title: 'Ring', value: 'rings'},
          {title: 'Bracelet', value: 'bracelets'},
          {title: 'Anklet', value: 'anklets'},
          {title: 'Necklace', value: 'necklaces'},
          {title: 'Beauty', value: 'beauty'},
          {title: 'Hand Chain', value: 'handchains'},
          {title: 'Sticker', value: 'stickers'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {name: 'stripePriceId', title: 'Stripe Price ID', type: 'string'},
    {name: 'stripeProductId', title: 'Stripe Product ID', type: 'string'},
    {
      name: 'lastSyncedAt',
      title: 'Last Synced At',
      type: 'datetime',
      description: 'Tracks last sync with Stripe',
    },
    {
      name: 'syncStatus',
      title: 'Sync Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Synced', value: 'synced'},
          {title: 'Failed', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    },
    {
      name: 'syncError',
      title: 'Sync Error',
      type: 'text',
      description: 'If sync failed, the error message will be stored here',
    },
  ],
})
