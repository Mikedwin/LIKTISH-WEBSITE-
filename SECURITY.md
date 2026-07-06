# Security Notes

This project is a lightweight marketing site with server-side lead capture. It does not need portal-grade security, but it should keep the live forms, secrets, and lead data protected.

## App Protections In Repo

- API route rate limiting for:
  - `/api/contact`
  - `/api/savings-leads`
  - `/api/solar-assessment`
- Honeypot and minimum-form-time spam checks on live forms
- Required Cloudflare Turnstile support for production lead forms
- JSON content-type and request-size enforcement on form APIs
- API idempotency controls to reduce duplicate lead inserts on retries
- Request IDs on API responses and server logs for easier incident tracing
- Server-only boundaries around Supabase service-role access and notification code
- Duplicate admin-notification suppression to reduce inbox flooding
- Abuse-event logging support in Supabase
- Supabase-backed notification queueing so lead submissions do not wait on provider delivery
- Redacted notification logs to reduce unnecessary personal-data duplication
- Lead lifecycle, source, consent timestamp, and retention metadata in Supabase
- Admin-only lead anonymization for privacy requests and accidental data exposure
- Service-role cleanup functions for expired operational records and expired closed/spam leads
- Signed admin dashboard sessions with `admin` and `viewer` roles
- Server-side session store in Supabase so admin sessions can be revoked before expiry
- Hashed multi-admin credentials through `ADMIN_USERS_JSON` (must be a JSON array;
  an invalid value fails closed instead of silently falling back to the plaintext password)
- Supabase-backed admin login rate limiting
- Failed admin login attempts logged as abuse events, with timing-equalized
  username checks to prevent username enumeration
- Same-origin enforcement on admin POST endpoints to reduce CSRF risk
- Admin audit logging for login, logout, lead status updates, and CSV export
- CSV lead export hardened against spreadsheet formula injection
- `/api/health` returns only up/degraded publicly; the detailed report requires
  an admin session or `Authorization: Bearer <CRON_SECRET>` (point uptime
  monitors at the bearer form), and degraded-event logging is debounced
- Backup tier confirmation in health and backup readiness checks
- `CRON_SECRET`-protected scheduled maintenance for operational cleanup and retained closed/spam leads
- Supabase-backed operational events for health degradation, maintenance runs, and cron abuse attempts
- Admin alert queueing for health degradation and maintenance failures
- Admin-only test alert endpoint for verifying operations alert routing
- Security headers in `next.config.ts`, including HSTS

## Required Live Configuration

### Turnstile

To enable the CAPTCHA layer, add these environment variables in Vercel and local development:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

In production, these variables are required. If they are absent, health checks
degrade and form submissions fail closed instead of bypassing verification.

### Supabase SQL

Run these files in the Supabase SQL editor:

- `supabase/schema.sql`
- `supabase/notification-logs.sql`

For existing databases, also apply the pending migrations in
`supabase/migrations/` (most recently `20260706090000_admin_sessions.sql`,
which adds the revocable admin session store).

This enables row level security, revokes browser-side access to lead tables and log tables, and preserves service-role access for the Next.js backend.

## Operational Review Checklist

### Supabase access and key hygiene

- Rotate `SUPABASE_SERVICE_ROLE_KEY` if it has ever been shared insecurely.
- Limit Supabase dashboard access to only the people who need it.
- Remove old team members from the Supabase project.
- Keep `SUPABASE_SERVICE_ROLE_KEY` only in server-side environments.
- Do not expose service-role secrets in client components, browser logs, or Git history.

### Vercel environment and team access

- Limit production project access to trusted team members only.
- Review who can read and edit production environment variables.
- Remove stale collaborators from the Vercel project.
- Use separate environment scopes for preview and production where practical.
- Use a long random `ADMIN_SESSION_SECRET`.
- Prefer `ADMIN_USERS_JSON` password hashes over plaintext `ADMIN_DASHBOARD_PASSWORD`.
  It must be a JSON array: `[{"username":"...","passwordHash":"...","role":"admin"}]`.
  Once it is set, remove `ADMIN_DASHBOARD_PASSWORD` entirely.
- Rotate admin credentials when admin access changes.

### Email security and deliverability

- Verify the sender identity used by SendGrid.
- Prefer domain authentication with SPF, DKIM, and DMARC if LIKTISH moves to a branded domain inbox.
- Mark legitimate admin notifications as safe if inbox providers place them in spam.

### Backup and recovery readiness

- Confirm Supabase backups are enabled for the project plan in use.
- If PITR is purchased, confirm `supabase backups list --output json` reports
  `pitr_enabled: true`.
- If PITR is not purchased, confirm the business accepts the Pro daily-backup
  tier and a 24-hour recovery point objective.
- Set `SUPABASE_BACKUP_TIER`, `SUPABASE_PITR_CONFIRMED`,
  `SUPABASE_DAILY_BACKUPS_CONFIRMED`, `SUPABASE_BACKUP_RPO_HOURS`,
  `SUPABASE_BACKUP_POLICY_CONFIRMED_AT`, and `SUPABASE_BACKUP_POLICY_OWNER`
  only after the Supabase dashboard has been reviewed.
- Run `npm run backup:check` before major releases and after access changes.
- Keep manual database exports in a private encrypted location, never in Git.
- Decide who responds if spam floods the forms or inbox.
- Decide who rotates keys if one is exposed.
- Keep a short incident note with:
  - where env vars live
  - who owns Supabase access
  - who owns Vercel access
  - which tables contain live leads

## Dependency Review

Run these checks before major deploys:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

If `npm audit` reports vulnerabilities, review whether they are:

- production dependencies
- development-only dependencies
- direct or transitive

Then update deliberately instead of mass-upgrading blindly.
