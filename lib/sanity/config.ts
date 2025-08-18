export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!;

// lib/sanity/config.ts
export const clientConfig = {
  projectId: projectId,
  dataset: dataset , 
  apiVersion: apiVersion,
  useCdn: true,
};
