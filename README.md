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

If those values are not present, the app falls back to a lightweight in-memory store for development.

## Notification Setup

The app now supports real notification delivery for:

- website enquiry notifications through SendGrid and Hubtel
- solar assessment lead notifications through configured admin email and/or phone
- notification logging through Supabase

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

If provider credentials are missing, the app safely skips delivery and records the notification mode as skipped or logged-only.

## Security

The live forms now include lightweight anti-abuse protection, optional Turnstile support, rate limiting, and server-only Supabase handling.

Before deploying or rotating access, review:

- `SECURITY.md`

Recommended checks before major releases:

```bash
npm run lint
npm run build
npm audit
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
