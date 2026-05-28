import "server-only";

import { sendAdminNotification } from "@/lib/notifications";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert, supabaseSelect } from "@/lib/supabase/rest";

export type OperationalEventSeverity = "info" | "warning" | "error";

export type OperationalEvent = {
  id: number;
  event_type: string;
  severity: OperationalEventSeverity;
  source: string;
  message: string;
  request_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export async function logOperationalEvent({
  eventType,
  severity,
  source,
  message,
  requestId,
  metadata,
  alert,
}: {
  eventType: string;
  severity: OperationalEventSeverity;
  source: string;
  message: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
  alert?: boolean;
}) {
  if (!hasSupabaseAdminConfig()) {
    console.info(`[ops:${eventType}] ${message}`, {
      severity,
      source,
      requestId,
      metadata,
    });
    if (alert) {
      await sendOperationalAlert({ eventType, severity, source, message, requestId });
    }

    return;
  }

  try {
    await supabaseInsert("operational_events", {
      event_type: eventType,
      severity,
      source,
      message,
      request_id: requestId ?? null,
      metadata: metadata ?? {},
    });
  } catch (error) {
    console.error(`[ops:${eventType}] Failed to write operational event`, error);
  }

  if (alert) {
    await sendOperationalAlert({ eventType, severity, source, message, requestId });
  }
}

export async function getOperationalEvents(limit = 20) {
  if (!hasSupabaseAdminConfig()) {
    return [] satisfies OperationalEvent[];
  }

  return supabaseSelect<OperationalEvent[]>("operational_events", {
    order: "created_at.desc",
    limit,
  });
}

async function sendOperationalAlert({
  eventType,
  severity,
  source,
  message,
  requestId,
}: {
  eventType: string;
  severity: OperationalEventSeverity;
  source: string;
  message: string;
  requestId?: string;
}) {
  try {
    await sendAdminNotification({
      subject: `LIKTISH ops alert: ${eventType}`,
      recipient: "LIKTISH operations",
      message: [
        `Severity: ${severity}`,
        `Source: ${source}`,
        requestId ? `Request ID: ${requestId}` : null,
        "",
        message,
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
    });
  } catch (error) {
    console.error(`[ops:${eventType}] Failed to send operational alert`, error);
  }
}
