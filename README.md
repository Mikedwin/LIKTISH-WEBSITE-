This is a Next.js build for the LIKTISH Engineering website.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the site from `src/app/(marketing)/page.tsx`. The app auto-updates as you edit files.

## Supabase Persistence Setup

The app now supports lightweight persistence for:

- contact enquiries
- savings leads
- solar assessment leads
- notification logs
- abuse-event logs
- production-safe rate limit buckets
- production-safe API idempotency records
- production-safe notification dedupe records
- lead lifecycle, source, consent, and retention metadata
- admin privacy actions for lead anonymization and cleanup
- admin audit events
- operational events for health and scheduled maintenance

To enable it:

1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql`.
3. Run the SQL in `supabase/notification-logs.sql`.
4. Fill in these environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (optional)
   - `TURNSTILE_SECRET_KEY` (optional)
5. Restart the app.

The main schema also creates the shared production rate-limit, API idempotency, notification-dedupe, lead lifecycle, and retention tables/functions used by the API routes.

If those values are not present in local development, the app falls back to lightweight in-memory storage and abuse controls. In production, lead capture and abuse controls require Supabase admin configuration and return a service-unavailable response instead of silently using process memory.

## Notification Setup

The app now supports real notification delivery for:

- website enquiry notifications through SendGrid and Hubtel
- solar assessment lead notifications through configured admin email and/or phone
- queued notification delivery through a Supabase outbox table
- redacted notification logging through Supabase

To enable the full notification flow:

1. Run the SQL in `supabase/notification-logs.sql`.
2. Fill in these environment variables:
   - `SENDGRID_API_KEY`
   - `SENDGRID_FROM_EMAIL`
   - `HUBTEL_CLIENT_ID`
   - `HUBTEL_CLIENT_SECRET`
   - `HUBTEL_SENDER_ID`
   - `ADMIN_NOTIFICATION_EMAIL`
   - `ADMIN_NOTIFICATION_PHONE`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Restart the app.

If provider credentials are missing, the app safely skips delivery and records the notification mode as skipped or logged-only. Notification logs intentionally store redacted recipients and message previews; the queue table stores the delivery payload until the job is processed.

## Security

The live forms now include lightweight anti-abuse protection, optional Turnstile support, shared production rate limiting, request size checks, idempotency, request IDs, and server-only Supabase handling.

The admin dashboard is available at `/admin` and requires:

- `ADMIN_USERS_JSON` (recommended hashed multi-user config)
- `ADMIN_DASHBOARD_USERNAME`
- `ADMIN_DASHBOARD_PASSWORD`
- `ADMIN_DASHBOARD_ROLE` (`admin` or `viewer`)
- `ADMIN_SESSION_SECRET`
- `ADMIN_ALLOWED_ORIGINS` (optional comma-separated admin origins)

Use the `viewer` role for read-only access. The `admin` role can update lead status and export CSV files.
Use `npm run admin:hash-password -- "your-password"` to generate password hashes
for `ADMIN_USERS_JSON`. Keep plaintext admin passwords out of shared notes.
Admins can also anonymize individual leads from the dashboard. This replaces
stored personal data with safe placeholders, audits the action, records an
operational event, and marks the record for retention cleanup.
Admin mutation endpoints require same-origin POST requests. Set
`ADMIN_ALLOWED_ORIGINS` only if the dashboard is intentionally served from an
additional trusted origin.

## Operational Readiness

The app exposes a production-safe health endpoint at `/api/health`. It returns:

- `200` when required server configuration is present and Supabase is reachable
- `503` when required configuration is missing or Supabase cannot be reached

The response includes a request ID and high-level check statuses only. It does not return secret values.
Degraded health checks are recorded as operational events for admin review.

Scheduled maintenance runs daily through Vercel Cron at `/api/cron/maintenance`.
The endpoint requires `CRON_SECRET` and runs the Supabase cleanup functions for:

- expired rate limit, notification dedupe, and idempotency records
- expired closed or spam leads

Maintenance success, unauthorized attempts, and failures are recorded in the admin
dashboard's operational events section.
Health degradation and maintenance failures also queue admin alerts through the
existing notification pipeline, using its Supabase-backed dedupe controls.
Admins can trigger a safe test alert from `/admin` to verify delivery routing
after credential or destination changes.

Before deploying or rotating access, review:

- `SECURITY.md`

Recommended checks before major releases:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run backup:check
npm audit
```

Backup and recovery procedures are documented in:

- `docs/backup-recovery.md`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
