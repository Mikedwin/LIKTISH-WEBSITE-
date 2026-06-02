import "server-only";

export type BackupReadinessStatus = "confirmed" | "unconfirmed";
export type BackupTier = "pitr" | "daily" | "unknown";

export type BackupReadiness = {
  status: BackupReadinessStatus;
  tier: BackupTier;
  pitrConfirmed: boolean;
  dailyBackupsConfirmed: boolean;
  backupPolicyConfirmedAt: string | null;
  backupPolicyOwner: string | null;
  recoveryPointObjectiveHours: number | null;
};

export function getBackupReadiness(): BackupReadiness {
  const backupTierValue = process.env.SUPABASE_BACKUP_TIER?.trim().toLowerCase();
  const tier: BackupTier =
    backupTierValue === "pitr" || backupTierValue === "daily" ? backupTierValue : "unknown";
  const backupPolicyConfirmedAt =
    process.env.SUPABASE_BACKUP_POLICY_CONFIRMED_AT?.trim() || null;
  const backupPolicyOwner = process.env.SUPABASE_BACKUP_POLICY_OWNER?.trim() || null;
  const pitrConfirmed = process.env.SUPABASE_PITR_CONFIRMED === "true";
  const dailyBackupsConfirmed = process.env.SUPABASE_DAILY_BACKUPS_CONFIRMED === "true";
  const recoveryPointObjectiveHoursValue = Number(process.env.SUPABASE_BACKUP_RPO_HOURS);
  const recoveryPointObjectiveHours =
    Number.isFinite(recoveryPointObjectiveHoursValue) && recoveryPointObjectiveHoursValue > 0
      ? recoveryPointObjectiveHoursValue
      : null;
  const hasPolicyMetadata =
    Boolean(backupPolicyConfirmedAt) &&
    Boolean(backupPolicyOwner) &&
    Boolean(recoveryPointObjectiveHours);
  const status =
    ((tier === "pitr" && pitrConfirmed) || (tier === "daily" && dailyBackupsConfirmed)) &&
    hasPolicyMetadata
      ? "confirmed"
      : "unconfirmed";

  return {
    status,
    tier,
    pitrConfirmed,
    dailyBackupsConfirmed,
    backupPolicyConfirmedAt,
    backupPolicyOwner,
    recoveryPointObjectiveHours,
  };
}
