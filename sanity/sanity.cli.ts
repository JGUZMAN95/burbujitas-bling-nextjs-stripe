import {defineCliConfig} from 'sanity/cli'
import { dataset, projectId } from '../sanityClient'

export default defineCliConfig({
  api: {
    projectId: projectId!,
    dataset: dataset!,
  },

  autoUpdates: false,
})
