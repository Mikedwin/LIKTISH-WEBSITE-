import "server-only";

import { getBackupReadiness } from "@/lib/ops/backup";
import { getSupabaseConfig } from "@/lib/supabase/config";

const REQUIRED_ENV = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "ADMIN_USERS_JSON",
  "ADMIN_DASHBOARD_USERNAME",
  "ADMIN_DASHBOARD_PASSWORD",
  "ADMIN_DASHBOARD_ROLE",
  "ADMIN_SESSION_SECRET",
  "CRON_SECRET",
] as const;

type HealthCheckStatus = "ok" | "degraded";

export type HealthReport = {
  status: HealthCheckStatus;
  checkedAt: string;
  version: string;
  checks: {
    environment: {
      status: HealthCheckStatus;
      missing: string[];
    };
    supabase: {
      status: HealthCheckStatus;
      reachable: boolean;
    };
    backup: {
      status: HealthCheckStatus;
      tier: string;
      pitrConfirmed: boolean;
      dailyBackupsConfirmed: boolean;
      backupPolicyConfirmedAt: string | null;
      backupPolicyOwner: string | null;
      recoveryPointObjectiveHours: number | null;
    };
  };
};

function getAppVersion() {
  return process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ?? "local";
}

async function checkSupabaseReachability() {
  const { url, serviceRoleKey } = getSupabaseConfig();

  if (!url || !serviceRoleKey) {
    return false;
  }

  try {
    const response = await fetch(
      `${url}/rest/v1/contact_inquiries?select=id&limit=1`,
      {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      },
    );

    return response.ok;
  } catch {
    return false;
  }
}

export async function getHealthReport(): Promise<HealthReport> {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  const supabaseReachable = await checkSupabaseReachability();
  const backup = getBackupReadiness();
  const environmentStatus = missing.length === 0 ? "ok" : "degraded";
  const supabaseStatus = supabaseReachable ? "ok" : "degraded";
  const backupStatus = backup.status === "confirmed" ? "ok" : "degraded";
  const status =
    environmentStatus === "ok" && supabaseStatus === "ok" && backupStatus === "ok"
      ? "ok"
      : "degraded";

  return {
    status,
    checkedAt: new Date().toISOString(),
    version: getAppVersion(),
    checks: {
      environment: {
        status: environmentStatus,
        missing,
      },
      supabase: {
        status: supabaseStatus,
        reachable: supabaseReachable,
      },
      backup: {
        status: backupStatus,
        tier: backup.tier,
        pitrConfirmed: backup.pitrConfirmed,
        dailyBackupsConfirmed: backup.dailyBackupsConfirmed,
        backupPolicyConfirmedAt: backup.backupPolicyConfirmedAt,
        backupPolicyOwner: backup.backupPolicyOwner,
        recoveryPointObjectiveHours: backup.recoveryPointObjectiveHours,
      },
    },
  };
}
