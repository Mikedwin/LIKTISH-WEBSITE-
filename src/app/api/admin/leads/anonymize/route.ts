import { NextResponse } from "next/server";
import { logAdminAuditEvent } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/auth";
import { assertSameOriginAdminRequest } from "@/lib/admin/csrf";
import { anonymizeLead, isLeadTable } from "@/lib/admin/leads";
import { getRequestId, readJsonObjectRequest } from "@/lib/api/requests";
import { handleApiError, jsonError } from "@/lib/api/responses";
import { logOperationalEvent } from "@/lib/ops/events";

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
    const id = Number(body.id);

    if (!isLeadTable(table) || !Number.isInteger(id) || id < 1) {
      return jsonError({
        code: "invalid_request",
        message: "Invalid lead anonymization request.",
        requestId,
        status: 400,
      });
    }

    await anonymizeLead(table, id);
    await logAdminAuditEvent({
      session,
      action: "lead_anonymize",
      targetTable: table,
      targetId: id,
      metadata: { requestId },
    });
    await logOperationalEvent({
      eventType: "lead_anonymized",
      severity: "info",
      source: "/api/admin/leads/anonymize",
      message: `Lead ${table} #${id} was anonymized by an admin privacy action.`,
      requestId,
      metadata: {
        table,
        id,
        actor: session.username,
      },
    });

    return NextResponse.json({
      ok: true,
      requestId,
    });
  } catch (error) {
    return handleApiError(error, "/api/admin/leads/anonymize", requestId);
  }
}
