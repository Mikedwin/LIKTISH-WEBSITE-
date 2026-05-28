import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getRequestId } from "@/lib/api/requests";
import { jsonError } from "@/lib/api/responses";
import { logOperationalEvent } from "@/lib/ops/events";
import { runMaintenance } from "@/lib/ops/maintenance";

const ROUTE = "/api/cron/maintenance";

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function isAuthorized(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  return safeEquals(authHeader, `Bearer ${cronSecret}`);
}

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  if (!process.env.CRON_SECRET) {
    console.error(`[${ROUTE}] [${requestId}] Missing CRON_SECRET.`);
    await logOperationalEvent({
      eventType: "maintenance_unavailable",
      severity: "error",
      source: ROUTE,
      message: "Scheduled maintenance is missing CRON_SECRET.",
      requestId,
      alert: true,
    });
    return jsonError({
      code: "cron_unavailable",
      message: "Scheduled maintenance is not configured.",
      requestId,
      status: 503,
    });
  }

  if (!isAuthorized(request)) {
    console.warn(`[${ROUTE}] [${requestId}] Unauthorized cron request.`);
    await logOperationalEvent({
      eventType: "maintenance_unauthorized",
      severity: "warning",
      source: ROUTE,
      message: "Unauthorized maintenance endpoint request rejected.",
      requestId,
    });
    return jsonError({
      code: "unauthorized",
      message: "Unauthorized.",
      requestId,
      status: 401,
    });
  }

  try {
    const report = await runMaintenance();
    console.info(`[${ROUTE}] [${requestId}] Maintenance completed`, report.cleanup);
    await logOperationalEvent({
      eventType: "maintenance_completed",
      severity: "info",
      source: ROUTE,
      message: "Scheduled maintenance completed.",
      requestId,
      metadata: report.cleanup,
    });

    return NextResponse.json(
      {
        ok: true,
        code: "ok",
        requestId,
        ...report,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-Request-Id": requestId,
        },
      },
    );
  } catch (error) {
    console.error(`[${ROUTE}] [${requestId}] Maintenance failed`, error);
    await logOperationalEvent({
      eventType: "maintenance_failed",
      severity: "error",
      source: ROUTE,
      message: "Scheduled maintenance failed.",
      requestId,
      metadata: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      alert: true,
    });
    return jsonError({
      code: "maintenance_failed",
      message: "Scheduled maintenance failed.",
      requestId,
      status: 500,
    });
  }
}
