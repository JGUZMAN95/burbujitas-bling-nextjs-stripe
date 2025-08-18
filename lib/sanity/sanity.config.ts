import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from '../../sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'burbujitas-and-bling',

  projectId: '1pcq3sxq',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
