import {defineCliConfig} from 'sanity/cli'
import { dataset, projectId } from '../lib/sanityClient'

export default defineCliConfig({
  api: {
    projectId: projectId!,
    dataset: dataset!,
  },

  autoUpdates: false,
})
