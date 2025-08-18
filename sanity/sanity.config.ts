import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'burbujitas-and-bling',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1pcq3sxq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
