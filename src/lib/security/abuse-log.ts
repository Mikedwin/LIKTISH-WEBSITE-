import "server-only";

import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert } from "@/lib/supabase/rest";

type AbuseEventType =
  | "rate_limited"
  | "spam_rejected"
  | "turnstile_failed"
  | "notification_suppressed";

interface AbuseEventInput {
  route: string;
  type: AbuseEventType;
  ipAddress?: string;
  details: string;
}

export async function logAbuseEvent(input: AbuseEventInput) {
  if (!hasSupabaseAdminConfig()) {
    console.warn(`[abuse:${input.type}] ${input.route} ${input.details}`);
    return;
  }

  try {
    await supabaseInsert("abuse_events", {
      route: input.route,
      event_type: input.type,
      ip_address: input.ipAddress ?? null,
      details: input.details,
    });
  } catch (error) {
    console.error("Unable to log abuse event", error);
  }
}
