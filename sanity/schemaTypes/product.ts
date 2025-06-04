import {defineType} from 'sanity'

// sanity/schemas/product.ts
export const product = defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    { name: 'name', type: 'string', validation: (rule) => rule.required(), },
    { name: 'slug', type: 'slug', options: { source: 'name' } },
    { name: 'description', type: 'text' },
    { name: 'price', type: 'number', validation: (rule) => rule.required() },
    { name: 'image', type: 'image',
      options: { hotspot: true} },
    { name: 'type',  type: 'string'},
    { name: 'quantity',  type: 'number'}
  ],
})