import "server-only";

import { supabaseRpc } from "@/lib/supabase/rest";

type CleanupOperationalResult = {
  rateLimitDeleted: number;
  notificationDedupeDeleted: number;
  idempotencyDeleted: number;
};

type CleanupLeadResult = {
  contactsDeleted: number;
  savingsDeleted: number;
  assessmentsDeleted: number;
};

export type MaintenanceReport = {
  status: "ok";
  ranAt: string;
  cleanup: {
    operational: CleanupOperationalResult;
    leads: CleanupLeadResult;
  };
};

export async function runMaintenance(): Promise<MaintenanceReport> {
  const [operational, leads] = await Promise.all([
    supabaseRpc<CleanupOperationalResult>("cleanup_expired_operational_records", {}),
    supabaseRpc<CleanupLeadResult>("delete_expired_closed_leads", {}),
  ]);

  return {
    status: "ok",
    ranAt: new Date().toISOString(),
    cleanup: {
      operational,
      leads,
    },
  };
}
