import { NextResponse } from "next/server";
import { logAdminAuditEvent } from "@/lib/admin/audit";
import { requireAdminSession } from "@/lib/admin/auth";
import { getLeadsForExport } from "@/lib/admin/leads";

const CSV_COLUMNS = [
  "type",
  "id",
  "status",
  "name",
  "email",
  "phone",
  "created_at",
  "source_path",
  "request_id",
  "summary",
];

export async function GET() {
  const session = await requireAdminSession(["admin"]);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const leads = await getLeadsForExport();
  const csv = [
    CSV_COLUMNS.join(","),
    ...leads.map((lead) =>
      [
        lead.type,
        lead.id,
        lead.lead_status,
        lead.name,
        lead.email,
        lead.phone,
        lead.created_at,
        lead.source_path ?? "",
        lead.request_id ?? "",
        lead.summary,
      ].map(csvCell).join(","),
    ),
  ].join("\n");

  await logAdminAuditEvent({
    session,
    action: "lead_export",
    metadata: { count: leads.length },
  });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="liktish-leads-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  });
}

function csvCell(value: string | number) {
  const raw = String(value);
  if (!/[",\n\r]/.test(raw)) {
    return raw;
  }

  return `"${raw.replaceAll('"', '""')}"`;
}
