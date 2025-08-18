import {structureTool} from 'sanity/structure'
import {schemaTypes} from '../../sanity/schemaTypes'

export default ({
  name: 'default',
  title: 'burbujitas-and-bling',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
