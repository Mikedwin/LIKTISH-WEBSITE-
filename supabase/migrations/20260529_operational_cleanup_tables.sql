create table if not exists public.rate_limit_buckets (
  key_hash text primary key,
  route text not null,
  request_count integer not null default 1,
  reset_at timestamptz not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notification_dedupe (
  fingerprint text primary key,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists rate_limit_buckets_reset_at_idx
  on public.rate_limit_buckets (reset_at);

create index if not exists notification_dedupe_created_at_idx
  on public.notification_dedupe (created_at);

alter table public.rate_limit_buckets enable row level security;
alter table public.notification_dedupe enable row level security;

revoke all on public.rate_limit_buckets from public, anon, authenticated;
revoke all on public.notification_dedupe from public, anon, authenticated;

grant all on public.rate_limit_buckets to service_role;
grant all on public.notification_dedupe to service_role;

create or replace function public.check_rate_limit(
  p_key_hash text,
  p_route text,
  p_limit integer,
  p_window_seconds integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := timezone('utc', now());
  v_count integer;
  v_reset_at timestamptz;
begin
  if p_limit < 1 or p_window_seconds < 1 then
    raise exception 'Invalid rate limit configuration';
  end if;

  insert into public.rate_limit_buckets (
    key_hash,
    route,
    request_count,
    reset_at,
    updated_at
  )
  values (
    p_key_hash,
    p_route,
    1,
    v_now + make_interval(secs => p_window_seconds),
    v_now
  )
  on conflict (key_hash) do update
    set route = excluded.route,
        request_count = case
          when public.rate_limit_buckets.reset_at <= v_now then 1
          else public.rate_limit_buckets.request_count + 1
        end,
        reset_at = case
          when public.rate_limit_buckets.reset_at <= v_now then excluded.reset_at
          else public.rate_limit_buckets.reset_at
        end,
        updated_at = v_now
  returning request_count, reset_at into v_count, v_reset_at;

  return jsonb_build_object(
    'allowed', v_count <= p_limit,
    'retryAfterSeconds', greatest(ceil(extract(epoch from (v_reset_at - v_now)))::integer, 1),
    'remaining', greatest(p_limit - v_count, 0)
  );
end;
$$;

create or replace function public.check_notification_dedupe(
  p_fingerprint text,
  p_window_seconds integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := timezone('utc', now());
  v_created_at timestamptz;
begin
  if p_window_seconds < 1 then
    raise exception 'Invalid notification dedupe window';
  end if;

  insert into public.notification_dedupe (fingerprint, created_at)
  values (p_fingerprint, v_now)
  on conflict (fingerprint) do update
    set created_at = case
      when public.notification_dedupe.created_at <= v_now - make_interval(secs => p_window_seconds) then v_now
      else public.notification_dedupe.created_at
    end
  returning created_at into v_created_at;

  return v_created_at < v_now;
end;
$$;

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

  return jsonb_build_object(
    'rateLimitDeleted', v_rate_limit_deleted,
    'notificationDedupeDeleted', v_dedupe_deleted,
    'idempotencyDeleted', v_idempotency_deleted
  );
end;
$$;

revoke all on function public.check_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;
revoke all on function public.check_notification_dedupe(text, integer)
  from public, anon, authenticated;
revoke all on function public.cleanup_expired_operational_records()
  from public, anon, authenticated;

grant execute on function public.check_rate_limit(text, text, integer, integer)
  to service_role;
grant execute on function public.check_notification_dedupe(text, integer)
  to service_role;
grant execute on function public.cleanup_expired_operational_records()
  to service_role;
