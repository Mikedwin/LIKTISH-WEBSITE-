import "server-only";

import { StorageUnavailableError } from "@/lib/errors";

const REQUIRED_PRODUCTION_ENV = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

export function isProductionRuntime() {
  return process.env.NODE_ENV === "production";
}

export function getMissingProductionEnv() {
  if (!isProductionRuntime()) {
    return [];
  }

  return REQUIRED_PRODUCTION_ENV.filter((key) => !process.env[key]);
}

export function assertProductionLeadStorageEnv() {
  const missing = getMissingProductionEnv();

  if (missing.length > 0) {
    throw new StorageUnavailableError(
      `Missing required production environment variables: ${missing.join(", ")}`,
    );
  }
}
