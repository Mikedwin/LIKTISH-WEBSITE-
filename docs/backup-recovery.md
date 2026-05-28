# Backup And Recovery Runbook

This runbook covers the minimum recovery steps for the LIKTISH website, Supabase
database, and Vercel deployment configuration.

## Recovery Priorities

1. Preserve lead tables first:
   - `contact_inquiries`
   - `savings_leads`
   - `solar_assessments`
2. Preserve accountability tables next:
   - `admin_audit_events`
   - `operational_events`
   - `notification_logs`
3. Preserve operational queues and controls:
   - `notification_jobs`
   - `rate_limit_buckets`
   - `api_idempotency_keys`
   - `notification_dedupe`
   - `abuse_events`

## Readiness Check

Run this before major releases and after rotating infrastructure access:

```bash
npm run backup:check
```

The check verifies:

- Git has committed project state
- Supabase CLI is available and the project is linked
- local and remote Supabase migrations are aligned
- Vercel CLI is available and the project is linked
- required Vercel production environment variable names exist
- live `/api/health` returns healthy status

The command prints only environment variable names and presence status. It must
not print secret values.

## Supabase Backup Procedure

Confirm the Supabase project dashboard has backups enabled for the project plan.
If point-in-time recovery is available, record the retention window in the
private operations notes for LIKTISH.

For a manual schema snapshot:

```bash
supabase db dump --linked --schema public --file backups/schema-YYYY-MM-DD.sql
```

For a manual data snapshot, export only to an encrypted/private location because
lead tables contain personal data:

```bash
supabase db dump --linked --data-only --schema public --file backups/data-YYYY-MM-DD.sql
```

Do not commit files under `backups/`.

## Restore Procedure

1. Pause public lead intake if data integrity is uncertain.
2. Identify the incident window using:
   - Vercel deployment history
   - Supabase migration history
   - `admin_audit_events`
   - `operational_events`
3. Prefer Supabase dashboard point-in-time restore when available.
4. If restoring manually, restore into a temporary Supabase project first.
5. Verify row counts and sample records for the lead tables.
6. Re-point Vercel environment variables only after the restored database has
   been verified.
7. Run:

```bash
npm run backup:check
npm run lint
npm run typecheck
npm test
npm run build
```

8. Trigger `/api/health` and the admin test alert.
9. Record the incident summary and recovery timestamp.

## Environment Recovery

Vercel is the source of truth for runtime environment variables. Keep a private,
access-controlled inventory of variable names, owners, and rotation dates. Do
not store secret values in the repository.

Required production variables include:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_DASHBOARD_USERNAME`
- `ADMIN_DASHBOARD_PASSWORD`
- `ADMIN_DASHBOARD_ROLE`
- `ADMIN_SESSION_SECRET`
- `CRON_SECRET`

Optional production variables include:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `SENDGRID_API_KEY`
- `SENDGRID_FROM_EMAIL`
- `HUBTEL_CLIENT_ID`
- `HUBTEL_CLIENT_SECRET`
- `HUBTEL_SENDER_ID`
- `ADMIN_NOTIFICATION_EMAIL`
- `ADMIN_NOTIFICATION_PHONE`
- `ADMIN_ALLOWED_ORIGINS`

## Bad Migration Recovery

1. Stop new deploys.
2. Do not edit an already-applied migration in place.
3. Create a forward-only repair migration.
4. Test the repair against a restored copy or staging project when possible.
5. Apply with:

```bash
supabase db push
```

6. Confirm:

```bash
supabase migration list --linked
npm run backup:check
```

## Ownership Checklist

Keep these owner names in private operations notes:

- Supabase project owner
- Vercel project owner
- Domain/DNS owner
- SendGrid owner
- Hubtel owner
- Incident responder for spam or data exposure
