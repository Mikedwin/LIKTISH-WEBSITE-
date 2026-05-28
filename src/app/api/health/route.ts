import { NextResponse } from "next/server";
import { getRequestId } from "@/lib/api/requests";
import { getHealthReport } from "@/lib/ops/health";
import { logOperationalEvent } from "@/lib/ops/events";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  const report = await getHealthReport();

  if (report.status !== "ok") {
    await logOperationalEvent({
      eventType: "health_degraded",
      severity: "warning",
      source: "/api/health",
      message: "Health check returned degraded status.",
      requestId,
      metadata: {
        missing: report.checks.environment.missing,
        supabaseReachable: report.checks.supabase.reachable,
      },
      alert: true,
    });
  }

  return NextResponse.json(
    {
      ok: report.status === "ok",
      requestId,
      ...report,
    },
    {
      status: report.status === "ok" ? 200 : 503,
      headers: {
        "Cache-Control": "no-store",
        "X-Request-Id": requestId,
      },
    },
  );
}
