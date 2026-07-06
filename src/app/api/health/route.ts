import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { getRequestId } from "@/lib/api/requests";
import { getHealthReport } from "@/lib/ops/health";
import { logOperationalEvent } from "@/lib/ops/events";

const DEGRADED_LOG_WINDOW_MS = 15 * 60 * 1000;

declare global {
  var __liktishHealthDegradedLoggedAt: number | undefined;
}

function safeEquals(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function hasHealthBearerToken(request: Request) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  return safeEquals(authHeader, `Bearer ${secret}`);
}

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  const authorized = hasHealthBearerToken(request) || Boolean(await getAdminSession());
  const report = await getHealthReport();
  const status = report.status === "ok" ? 200 : 503;

  if (report.status !== "ok" && authorized) {
    const now = Date.now();
    const lastLoggedAt = globalThis.__liktishHealthDegradedLoggedAt ?? 0;

    if (now - lastLoggedAt >= DEGRADED_LOG_WINDOW_MS) {
      globalThis.__liktishHealthDegradedLoggedAt = now;
      await logOperationalEvent({
        eventType: "health_degraded",
        severity: "warning",
        source: "/api/health",
        message: "Health check returned degraded status.",
        requestId,
        metadata: {
          missing: report.checks.environment.missing,
          supabaseReachable: report.checks.supabase.reachable,
          backupStatus: report.checks.backup.status,
          backupTier: report.checks.backup.tier,
          pitrConfirmed: report.checks.backup.pitrConfirmed,
          dailyBackupsConfirmed: report.checks.backup.dailyBackupsConfirmed,
        },
        alert: true,
      });
    }
  }

  // Unauthenticated callers only learn up/degraded; the detailed report needs
  // an admin session or `Authorization: Bearer <CRON_SECRET>`.
  if (!authorized) {
    return NextResponse.json(
      {
        ok: report.status === "ok",
        status: report.status,
        requestId,
      },
      {
        status,
        headers: {
          "Cache-Control": "no-store",
          "X-Request-Id": requestId,
        },
      },
    );
  }

  return NextResponse.json(
    {
      ok: report.status === "ok",
      requestId,
      ...report,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Request-Id": requestId,
      },
    },
  );
}
