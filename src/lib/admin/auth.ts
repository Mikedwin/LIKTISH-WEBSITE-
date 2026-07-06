import "server-only";

import {
  createHash,
  createHmac,
  pbkdf2Sync,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { isProductionRuntime } from "@/lib/env";
import { SecurityControlUnavailableError } from "@/lib/errors";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert, supabaseSelect, supabaseUpdate } from "@/lib/supabase/rest";

export type AdminRole = "admin" | "viewer";

export interface AdminSession {
  sessionId: string;
  username: string;
  role: AdminRole;
  issuedAt: number;
  expiresAt: number;
}

export const ADMIN_SESSION_COOKIE = "liktish_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const PASSWORD_HASH_ALGORITHM = "pbkdf2_sha256";
// Valid-format hash that matches no password. Verified for unknown usernames so
// response timing does not reveal which usernames exist.
const UNKNOWN_USER_PASSWORD_HASH =
  "pbkdf2_sha256$310000$liktish-unknown-user-salt$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

type AdminUserConfig = {
  username: string;
  role: AdminRole;
  passwordHash: string;
};

function getAdminConfig() {
  return {
    username: process.env.ADMIN_DASHBOARD_USERNAME ?? "admin",
    password: process.env.ADMIN_DASHBOARD_PASSWORD ?? "",
    role: (process.env.ADMIN_DASHBOARD_ROLE === "viewer" ? "viewer" : "admin") as AdminRole,
    sessionSecret: process.env.ADMIN_SESSION_SECRET ?? "",
  };
}

function normalizeRole(value: unknown): AdminRole {
  return value === "viewer" ? "viewer" : "admin";
}

function parseAdminUserCandidate(user: unknown): AdminUserConfig | null {
  if (!user || typeof user !== "object") {
    return null;
  }

  const candidate = user as Record<string, unknown>;
  const username = typeof candidate.username === "string" ? candidate.username.trim() : "";
  const passwordHash =
    typeof candidate.passwordHash === "string" ? candidate.passwordHash.trim() : "";

  if (!username || !passwordHash) {
    return null;
  }

  return {
    username,
    passwordHash,
    role: normalizeRole(candidate.role),
  };
}

function getConfiguredAdminUsers() {
  const rawUsers = process.env.ADMIN_USERS_JSON;

  if (!rawUsers) {
    return [] satisfies AdminUserConfig[];
  }

  try {
    const parsed = JSON.parse(rawUsers) as unknown;
    const candidates = Array.isArray(parsed) ? parsed : [parsed];
    const users = candidates
      .map(parseAdminUserCandidate)
      .filter((user): user is AdminUserConfig => Boolean(user));

    if (users.length === 0) {
      console.error(
        "ADMIN_USERS_JSON is set but contains no usable admin users. " +
          'Expected a JSON array like [{"username":"...","passwordHash":"...","role":"admin"}].',
      );
    }

    return users;
  } catch {
    console.error("ADMIN_USERS_JSON is set but is not valid JSON.");
    return [];
  }
}

export function hasHashedAdminUsers() {
  return getConfiguredAdminUsers().length > 0;
}

export function isAdminUsersJsonUnusable() {
  return Boolean(process.env.ADMIN_USERS_JSON) && getConfiguredAdminUsers().length === 0;
}

function getSessionSecret() {
  const { sessionSecret } = getAdminConfig();

  if (sessionSecret) {
    return sessionSecret;
  }

  if (!isProductionRuntime()) {
    return "development-only-liktish-admin-session-secret";
  }

  throw new Error("ADMIN_SESSION_SECRET is required in production.");
}

export function assertAdminAuthConfigured() {
  const { password, sessionSecret } = getAdminConfig();
  const users = getConfiguredAdminUsers();

  if (!isProductionRuntime()) {
    return;
  }

  if (isAdminUsersJsonUnusable()) {
    throw new Error(
      "ADMIN_USERS_JSON is set but could not be parsed into any usable admin users.",
    );
  }

  const missing = [
    users.length === 0 && !password && "ADMIN_USERS_JSON or ADMIN_DASHBOARD_PASSWORD",
    !sessionSecret && "ADMIN_SESSION_SECRET",
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(`Missing admin auth configuration: ${missing.join(", ")}`);
  }
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyPasswordHash(password: string, encodedHash: string) {
  const [algorithm, iterationsValue, salt, expectedHash] = encodedHash.split("$");
  const iterations = Number(iterationsValue);

  if (
    algorithm !== PASSWORD_HASH_ALGORITHM ||
    !Number.isInteger(iterations) ||
    iterations < 100_000 ||
    !salt ||
    !expectedHash
  ) {
    return false;
  }

  const actualHash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("base64url");
  return safeEqual(actualHash, expectedHash);
}

function getAdminUser(username: string) {
  return getConfiguredAdminUsers().find((user) => user.username === username) ?? null;
}

function getAdminRole(username: string): AdminRole {
  return getAdminUser(username)?.role ?? getAdminConfig().role;
}

export function verifyAdminCredentials(username: string, password: string) {
  assertAdminAuthConfigured();

  const users = getConfiguredAdminUsers();
  const user = users.find((candidate) => candidate.username === username) ?? null;

  if (user) {
    return verifyPasswordHash(password, user.passwordHash);
  }

  if (users.length > 0 || isAdminUsersJsonUnusable()) {
    // Keep timing consistent for unknown usernames, and never fall back to the
    // plaintext password while ADMIN_USERS_JSON is set.
    verifyPasswordHash(password, UNKNOWN_USER_PASSWORD_HASH);
    return false;
  }

  const config = getAdminConfig();
  if (!config.password) {
    return false;
  }

  const usernameMatches = safeEqual(username, config.username);
  const passwordMatches = safeEqual(password, config.password);
  return usernameMatches && passwordMatches;
}

export function createAdminSession(username: string): AdminSession {
  const now = Math.floor(Date.now() / 1000);
  return {
    sessionId: randomUUID(),
    username,
    role: getAdminRole(username),
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };
}

function hashSessionId(sessionId: string) {
  return createHash("sha256").update(sessionId).digest("hex");
}

export async function persistAdminSession(session: AdminSession) {
  if (!hasSupabaseAdminConfig()) {
    if (isProductionRuntime()) {
      throw new SecurityControlUnavailableError(
        "Supabase admin configuration is required for production admin sessions.",
      );
    }

    return;
  }

  await supabaseInsert("admin_sessions", {
    session_id_hash: hashSessionId(session.sessionId),
    username: session.username,
    role: session.role,
    expires_at: new Date(session.expiresAt * 1000).toISOString(),
  });
}

export async function revokeAdminSession(sessionId: string) {
  if (!hasSupabaseAdminConfig()) {
    return;
  }

  try {
    await supabaseUpdate(
      "admin_sessions",
      { session_id_hash: hashSessionId(sessionId) },
      { revoked_at: new Date().toISOString() },
    );
  } catch (error) {
    console.error("Failed to revoke admin session", error);
  }
}

async function isAdminSessionActive(session: AdminSession) {
  if (!hasSupabaseAdminConfig()) {
    return !isProductionRuntime();
  }

  try {
    const rows = await supabaseSelect<
      Array<{ revoked_at: string | null; expires_at: string }>
    >("admin_sessions", {
      select: "revoked_at,expires_at",
      session_id_hash: `eq.${hashSessionId(session.sessionId)}`,
      limit: 1,
    });
    const row = rows[0];

    if (!row || row.revoked_at) {
      return false;
    }

    return new Date(row.expires_at).getTime() > Date.now();
  } catch (error) {
    console.error("Admin session store check failed", error);
    return false;
  }
}

export function serializeAdminSession(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${signPayload(payload)}`;
}

export function parseAdminSessionCookie(value: string | undefined): AdminSession | null {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");
  if (!payload || !signature || !safeEqual(signPayload(payload), signature)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;

    if (session.expiresAt <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    if (session.role !== "admin" && session.role !== "viewer") {
      return null;
    }

    if (typeof session.sessionId !== "string" || !session.sessionId) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const session = parseAdminSessionCookie(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!session) {
    return null;
  }

  if (!(await isAdminSessionActive(session))) {
    return null;
  }

  return session;
}

export async function requireAdminSession(roles: AdminRole[] = ["admin", "viewer"]) {
  const session = await getAdminSession();

  if (!session || !roles.includes(session.role)) {
    return null;
  }

  return session;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: isProductionRuntime(),
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}
