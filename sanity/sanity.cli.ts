import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "../src/lib/sanity/client";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  autoUpdates: false,
});
