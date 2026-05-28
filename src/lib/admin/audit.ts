import "server-only";

import type { AdminSession } from "@/lib/admin/auth";
import { hasSupabaseAdminConfig } from "@/lib/supabase/config";
import { supabaseInsert } from "@/lib/supabase/rest";

export async function logAdminAuditEvent({
  session,
  action,
  targetTable,
  targetId,
  metadata,
}: {
  session: Pick<AdminSession, "username" | "role">;
  action: string;
  targetTable?: string;
  targetId?: string | number;
  metadata?: Record<string, unknown>;
}) {
  if (!hasSupabaseAdminConfig()) {
    console.info(`[admin:${action}]`, {
      actor: session.username,
      role: session.role,
      targetTable,
      targetId,
    });
    return;
  }

  await supabaseInsert("admin_audit_events", {
    actor: session.username,
    actor_role: session.role,
    action,
    target_table: targetTable ?? null,
    target_id: targetId === undefined ? null : String(targetId),
    metadata: metadata ?? {},
  });
}
