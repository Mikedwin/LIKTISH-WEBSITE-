import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { logAdminAuditEvent } from "@/lib/admin/audit";
import { assertSameOriginAdminRequest } from "@/lib/admin/csrf";
import { getRequestId } from "@/lib/api/requests";
import { handleApiError, jsonError } from "@/lib/api/responses";
import { logOperationalEvent } from "@/lib/ops/events";

const ROUTE = "/api/admin/ops/test-alert";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    assertSameOriginAdminRequest(request);

    const session = await getAdminSession();

    if (!session) {
      return jsonError({
        code: "unauthorized",
        message: "Unauthorized.",
        requestId,
        status: 401,
      });
    }

    if (session.role !== "admin") {
      return jsonError({
        code: "forbidden",
        message: "Admin access is required.",
        requestId,
        status: 403,
      });
    }

    await logOperationalEvent({
      eventType: "ops_alert_test",
      severity: "info",
      source: ROUTE,
      message: `Test operational alert requested by ${session.username}.`,
      requestId,
      alert: true,
    });

    await logAdminAuditEvent({
      session,
      action: "ops_test_alert",
      metadata: {
        requestId,
      },
    });

    return NextResponse.redirect(new URL("/admin", request.url), 303);
  } catch (error) {
    return handleApiError(error, ROUTE, requestId);
  }
}
