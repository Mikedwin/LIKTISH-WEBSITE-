import { NextResponse } from "next/server";
import { logAdminAuditEvent } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/auth";
import { assertSameOriginAdminRequest } from "@/lib/admin/csrf";
import { isLeadStatus, isLeadTable, updateLeadStatus } from "@/lib/admin/leads";
import { getRequestId, readJsonObjectRequest } from "@/lib/api/requests";
import { handleApiError, jsonError } from "@/lib/api/responses";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    assertSameOriginAdminRequest(request);

    const session = await requireAdminSession(["admin"]);

    if (!session) {
      return jsonError({
        code: "unauthorized",
        message: "Unauthorized.",
        requestId,
        status: 401,
      });
    }

    const body = await readJsonObjectRequest(request, { maxBytes: 1024 });
    const table = String(body.table ?? "");
    const status = String(body.status ?? "");
    const id = Number(body.id);

    if (!isLeadTable(table) || !isLeadStatus(status) || !Number.isInteger(id)) {
      return jsonError({
        code: "invalid_request",
        message: "Invalid lead update request.",
        requestId,
        status: 400,
      });
    }

    await updateLeadStatus(table, id, status);
    await logAdminAuditEvent({
      session,
      action: "lead_status_update",
      targetTable: table,
      targetId: id,
      metadata: { status },
    });

    return NextResponse.json({ ok: true, requestId });
  } catch (error) {
    return handleApiError(error, "/api/admin/leads/status", requestId);
  }
}
