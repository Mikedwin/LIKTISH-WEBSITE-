import "server-only";

import { createHash } from "node:crypto";
import { isProductionRuntime } from "@/lib/env";
import { SecurityControlUnavailableError } from "@/lib/errors";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseRpc } from "@/lib/supabase/rest";

type RateLimitWindow = {
  limit: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

declare global {
  var __liktishRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const store =
  globalThis.__liktishRateLimitStore ??
  (globalThis.__liktishRateLimitStore = new Map<string, RateLimitEntry>());

function hashRateLimitKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const candidate = forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || "unknown";

  return candidate || "unknown";
}

function checkMemoryRateLimit(
  key: string,
  { limit, windowMs }: RateLimitWindow,
) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      remaining: Math.max(limit - 1, 0),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
      remaining: 0,
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
    remaining: Math.max(limit - current.count, 0),
  };
}

export async function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitWindow,
): Promise<{
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
}> {
  if (!hasSupabaseAdminConfig()) {
    if (!isProductionRuntime()) {
      return checkMemoryRateLimit(key, { limit, windowMs });
    }

    throw new SecurityControlUnavailableError(
      "Supabase admin configuration is required for production rate limiting.",
    );
  }

  try {
    return await supabaseRpc("check_rate_limit", {
      p_key_hash: hashRateLimitKey(key),
      p_route: key.split(":")[0] ?? "unknown",
      p_limit: limit,
      p_window_seconds: Math.ceil(windowMs / 1000),
    });
  } catch (error) {
    throw new SecurityControlUnavailableError(
      `Production rate limit check failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    );
  }
}
