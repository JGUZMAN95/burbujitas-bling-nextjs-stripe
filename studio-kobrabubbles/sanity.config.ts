import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import schemaTypes from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'KobraBubbles',

  projectId: 'wm8b2fha',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
