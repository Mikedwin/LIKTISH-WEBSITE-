import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, getAdminCookieOptions, getAdminSession } from "@/lib/admin/auth";
import { logAdminAuditEvent } from "@/lib/admin/audit";
import { assertSameOriginAdminRequest } from "@/lib/admin/csrf";
import { getRequestId } from "@/lib/api/requests";
import { handleApiError } from "@/lib/api/responses";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    assertSameOriginAdminRequest(request);

    const session = await getAdminSession();

    if (session) {
      await logAdminAuditEvent({
        session,
        action: "logout",
      });
    }

    const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
    response.cookies.set(ADMIN_SESSION_COOKIE, "", {
      ...getAdminCookieOptions(),
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return handleApiError(error, "/api/admin/logout", requestId);
  }
}
