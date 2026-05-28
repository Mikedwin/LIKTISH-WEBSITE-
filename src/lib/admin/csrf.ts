import "server-only";

import { ForbiddenError } from "@/lib/errors";

function normalizeOrigin(value: string) {
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return "";
  }
}

function getExpectedOrigins(request: Request) {
  const origins = new Set<string>();
  origins.add(new URL(request.url).origin);

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    origins.add(`${forwardedProto}://${forwardedHost}`);
  }

  const configuredOrigins = process.env.ADMIN_ALLOWED_ORIGINS?.split(",") ?? [];

  for (const origin of configuredOrigins) {
    const normalized = normalizeOrigin(origin.trim());
    if (normalized) {
      origins.add(normalized);
    }
  }

  return origins;
}

export function assertSameOriginAdminRequest(request: Request) {
  const origin = normalizeOrigin(request.headers.get("origin") ?? "");

  if (!origin || !getExpectedOrigins(request).has(origin)) {
    throw new ForbiddenError("Invalid admin request origin.");
  }
}
