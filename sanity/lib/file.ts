// sanity/lib/file.ts
import { getFileAsset } from "@sanity/asset-utils";

export function getSanityFileUrl(file: any) {
  if (!file?.asset?._ref) return null;

  const asset = getFileAsset(file, {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  });

  return asset.url;
}
