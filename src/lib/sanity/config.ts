export function getSanityConfig() {
  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-04-01",
  };
}

export function hasSanityConfig() {
  const config = getSanityConfig();
  return Boolean(config.projectId && config.dataset);
}
