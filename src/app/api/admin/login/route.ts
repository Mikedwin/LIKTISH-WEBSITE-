import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  getAdminCookieOptions,
  serializeAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin/auth";
import { logAdminAuditEvent } from "@/lib/admin/audit";
import { assertSameOriginAdminRequest } from "@/lib/admin/csrf";
import { getRequestId } from "@/lib/api/requests";
import { handleApiError, jsonError } from "@/lib/api/responses";
import { logOperationalEvent } from "@/lib/ops/events";
import { checkRateLimit, getRequestIp } from "@/lib/security/rate-limit";

const ROUTE = "/api/admin/login";
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    assertSameOriginAdminRequest(request);

    const formData = await request.formData();
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");
    const ip = getRequestIp(request);
    const rateLimit = await checkRateLimit(`admin-login:${ip}:${username.toLowerCase()}`, {
      limit: LOGIN_LIMIT,
      windowMs: LOGIN_WINDOW_MS,
    });

    if (!rateLimit.allowed) {
      await logOperationalEvent({
        eventType: "admin_login_rate_limited",
        severity: "warning",
        source: ROUTE,
        message: "Admin login rate limit exceeded.",
        requestId,
        metadata: {
          username,
          ip,
        },
      });

      return jsonError({
        code: "rate_limited",
        message: "Too many login attempts. Please try again later.",
        requestId,
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      });
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
    }

    const session = createAdminSession(username);
    const response = NextResponse.redirect(new URL("/admin", request.url), 303);
    response.cookies.set(
      ADMIN_SESSION_COOKIE,
      serializeAdminSession(session),
      getAdminCookieOptions(),
    );

    await logAdminAuditEvent({
      session,
      action: "login",
    });

    return response;
  } catch (error) {
    return handleApiError(error, ROUTE, requestId);
  }
}
