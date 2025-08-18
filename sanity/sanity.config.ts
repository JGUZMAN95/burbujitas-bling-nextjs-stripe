import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default {
  name: 'default',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1pcq3sxq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
}

