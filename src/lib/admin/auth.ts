import "server-only";

import { createHmac, pbkdf2Sync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { isProductionRuntime } from "@/lib/env";

export type AdminRole = "admin" | "viewer";

export interface AdminSession {
  username: string;
  role: AdminRole;
  issuedAt: number;
  expiresAt: number;
}

export const ADMIN_SESSION_COOKIE = "liktish_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const PASSWORD_HASH_ALGORITHM = "pbkdf2_sha256";

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

function getConfiguredAdminUsers() {
  const rawUsers = process.env.ADMIN_USERS_JSON;

  if (!rawUsers) {
    return [] satisfies AdminUserConfig[];
  }

  try {
    const parsed = JSON.parse(rawUsers) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((user) => {
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
      })
      .filter((user): user is AdminUserConfig => Boolean(user));
  } catch {
    return [];
  }
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

  const user = getAdminUser(username);
  if (user) {
    return verifyPasswordHash(password, user.passwordHash);
  }

  if (getConfiguredAdminUsers().length > 0) {
    return false;
  }

  const config = getAdminConfig();
  if (!config.password) {
    return false;
  }

  return username === config.username && safeEqual(password, config.password);
}

export function createAdminSession(username: string): AdminSession {
  const now = Math.floor(Date.now() / 1000);
  return {
    username,
    role: getAdminRole(username),
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };
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

    return session;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return parseAdminSessionCookie(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
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
