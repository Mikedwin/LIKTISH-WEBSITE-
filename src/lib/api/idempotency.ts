import "server-only";

import { createHash } from "node:crypto";
import { isProductionRuntime } from "@/lib/env";
import { SecurityControlUnavailableError } from "@/lib/errors";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseRpc } from "@/lib/supabase/rest";

type IdempotencyClaim =
  | {
      state: "claimed";
    }
  | {
      state: "duplicate";
      responseStatus: number;
      responseBody: Record<string, unknown>;
    };

declare global {
  var __liktishIdempotencyStore:
    | Map<
        string,
        {
          expiresAt: number;
          responseStatus?: number;
          responseBody?: Record<string, unknown>;
        }
      >
    | undefined;
}

const store =
  globalThis.__liktishIdempotencyStore ??
  (globalThis.__liktishIdempotencyStore = new Map());

function hashIdempotencyKey(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function buildPayloadIdempotencyKey(route: string, payload: Record<string, unknown>) {
  const stablePayload = Object.fromEntries(
    Object.entries(payload)
      .filter(([key]) => !["turnstileToken", "formStartedAt", "website"].includes(key))
      .sort(([left], [right]) => left.localeCompare(right)),
  );

  return hashIdempotencyKey(`${route}:${JSON.stringify(stablePayload)}`);
}

export async function claimIdempotencyKey({
  route,
  key,
  ttlSeconds,
}: {
  route: string;
  key: string;
  ttlSeconds: number;
}): Promise<IdempotencyClaim> {
  const keyHash = hashIdempotencyKey(`${route}:${key}`);

  if (!hasSupabaseAdminConfig()) {
    if (!isProductionRuntime()) {
      return claimMemoryIdempotencyKey(keyHash, ttlSeconds);
    }

    throw new SecurityControlUnavailableError(
      "Supabase admin configuration is required for production idempotency.",
    );
  }

  const response = await supabaseRpc<{
    state: "claimed" | "duplicate";
    responseStatus?: number;
    responseBody?: Record<string, unknown>;
  }>("claim_idempotency_key", {
    p_key_hash: keyHash,
    p_route: route,
    p_ttl_seconds: ttlSeconds,
  });

  if (response.state === "duplicate") {
    return {
      state: "duplicate",
      responseStatus: response.responseStatus ?? 200,
      responseBody: response.responseBody ?? {
        ok: true,
        code: "ok",
        message: "This request was already received.",
      },
    };
  }

  return { state: "claimed" };
}

export async function completeIdempotencyKey({
  route,
  key,
  status,
  body,
}: {
  route: string;
  key: string;
  status: number;
  body: Record<string, unknown>;
}) {
  const keyHash = hashIdempotencyKey(`${route}:${key}`);

  if (!hasSupabaseAdminConfig()) {
    if (!isProductionRuntime()) {
      const current = store.get(keyHash);
      if (current) {
        store.set(keyHash, {
          ...current,
          responseStatus: status,
          responseBody: body,
        });
      }
      return;
    }

    throw new SecurityControlUnavailableError(
      "Supabase admin configuration is required for production idempotency.",
    );
  }

  await supabaseRpc("complete_idempotency_key", {
    p_key_hash: keyHash,
    p_response_status: status,
    p_response_body: body,
  });
}

function claimMemoryIdempotencyKey(keyHash: string, ttlSeconds: number): IdempotencyClaim {
  const now = Date.now();

  for (const [key, value] of store.entries()) {
    if (value.expiresAt <= now) {
      store.delete(key);
    }
  }

  const existing = store.get(keyHash);
  if (existing && existing.expiresAt > now && existing.responseBody) {
    return {
      state: "duplicate",
      responseStatus: existing.responseStatus ?? 200,
      responseBody: existing.responseBody,
    };
  }

  store.set(keyHash, {
    expiresAt: now + ttlSeconds * 1000,
  });

  return { state: "claimed" };
}
