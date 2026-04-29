import "server-only";

import { getSupabaseConfig, hasSupabaseAdminConfig } from "@/lib/supabase/config";

type Primitive = string | number | boolean;

function encodeFilterValue(value: Primitive) {
  return encodeURIComponent(String(value));
}

function buildQuery(params: Record<string, string | number | boolean | undefined>) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    search.set(key, String(value));
  }

  return search.toString();
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Supabase request failed with ${response.status}.`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function supabaseSelect<T>(
  table: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (!hasSupabaseAdminConfig()) {
    throw new Error("Supabase admin configuration is missing.");
  }

  const { url, serviceRoleKey } = getSupabaseConfig();
  const query = buildQuery({ select: "*", ...params });
  const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    cache: "no-store",
  });

  return parseResponse<T>(response);
}

export async function supabaseInsert<T>(table: string, payload: Record<string, unknown>) {
  if (!hasSupabaseAdminConfig()) {
    throw new Error("Supabase admin configuration is missing.");
  }

  const { url, serviceRoleKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return parseResponse<T[]>(response);
}

export async function supabaseUpdate<T>(
  table: string,
  filters: Record<string, Primitive>,
  payload: Record<string, unknown>,
) {
  if (!hasSupabaseAdminConfig()) {
    throw new Error("Supabase admin configuration is missing.");
  }

  const { url, serviceRoleKey } = getSupabaseConfig();
  const filterParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(filters)) {
    filterParams[key] = `eq.${encodeFilterValue(value)}`;
  }

  const query = buildQuery({ select: "*", ...filterParams });
  const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
    method: "PATCH",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return parseResponse<T[]>(response);
}
