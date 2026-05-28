import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
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

function getAdminConfig() {
  return {
    username: process.env.ADMIN_DASHBOARD_USERNAME ?? "admin",
    password: process.env.ADMIN_DASHBOARD_PASSWORD ?? "",
    role: (process.env.ADMIN_DASHBOARD_ROLE === "viewer" ? "viewer" : "admin") as AdminRole,
    sessionSecret: process.env.ADMIN_SESSION_SECRET ?? "",
  };
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

  if (!isProductionRuntime()) {
    return;
  }

  const missing = [
    !password && "ADMIN_DASHBOARD_PASSWORD",
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

export function verifyAdminCredentials(username: string, password: string) {
  assertAdminAuthConfigured();

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
    role: getAdminConfig().role,
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
