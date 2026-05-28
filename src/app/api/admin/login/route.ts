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
import { handleApiError } from "@/lib/api/responses";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    assertSameOriginAdminRequest(request);

    const formData = await request.formData();
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");

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
    return handleApiError(error, "/api/admin/login", requestId);
  }
}
