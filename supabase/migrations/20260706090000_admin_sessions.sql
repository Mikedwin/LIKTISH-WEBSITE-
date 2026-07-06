-- Server-side admin session store so sessions can be revoked before their
-- cookie TTL expires. Session ids are stored as SHA-256 hashes only.

create table if not exists public.admin_sessions (
  session_id_hash text primary key,
  username text not null,
  role text not null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists admin_sessions_expires_at_idx
  on public.admin_sessions (expires_at);

alter table public.admin_sessions enable row level security;

revoke all on public.admin_sessions from public, anon, authenticated;
grant all on public.admin_sessions to service_role;

create or replace function public.cleanup_expired_operational_records()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := timezone('utc', now());
  v_rate_limit_deleted integer := 0;
  v_dedupe_deleted integer := 0;
  v_idempotency_deleted integer := 0;
  v_admin_sessions_deleted integer := 0;
begin
  delete from public.rate_limit_buckets
    where reset_at <= v_now - interval '1 day';
  get diagnostics v_rate_limit_deleted = row_count;

  delete from public.notification_dedupe
    where created_at <= v_now - interval '1 day';
  get diagnostics v_dedupe_deleted = row_count;

  delete from public.api_idempotency_keys
    where expires_at <= v_now;
  get diagnostics v_idempotency_deleted = row_count;

  delete from public.admin_sessions
    where expires_at <= v_now - interval '1 day';
  get diagnostics v_admin_sessions_deleted = row_count;

  return jsonb_build_object(
    'rateLimitDeleted', v_rate_limit_deleted,
    'notificationDedupeDeleted', v_dedupe_deleted,
    'idempotencyDeleted', v_idempotency_deleted,
    'adminSessionsDeleted', v_admin_sessions_deleted
  );
end;
$$;

revoke all on function public.cleanup_expired_operational_records()
  from public, anon, authenticated;

grant execute on function public.cleanup_expired_operational_records()
  to service_role;
