create table if not exists public.contact_inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text not null,
  enquiry_type text not null,
  message text not null,
  lead_status text not null default 'new'
    check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam')),
  source_path text,
  source_page_url text,
  user_agent text,
  request_id text,
  assigned_to text,
  contacted_at timestamptz,
  qualified_at timestamptz,
  converted_at timestamptz,
  closed_at timestamptz,
  archived_at timestamptz,
  anonymized_at timestamptz,
  retention_until timestamptz not null default (timezone('utc', now()) + interval '2 years'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.savings_leads (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null,
  estimate_summary text not null,
  lead_status text not null default 'new'
    check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam')),
  source_path text,
  source_page_url text,
  user_agent text,
  request_id text,
  assigned_to text,
  contacted_at timestamptz,
  qualified_at timestamptz,
  converted_at timestamptz,
  closed_at timestamptz,
  archived_at timestamptz,
  anonymized_at timestamptz,
  retention_until timestamptz not null default (timezone('utc', now()) + interval '2 years'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.solar_assessments (
  id bigint generated always as identity primary key,
  request_nature text not null,
  installer_type text not null,
  name text not null,
  address text not null,
  email text not null,
  help_needed text not null,
  phone text not null,
  preferred_contact_method text not null,
  consent boolean not null default false,
  consent_at timestamptz,
  lead_status text not null default 'new'
    check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam')),
  source_path text,
  source_page_url text,
  user_agent text,
  request_id text,
  assigned_to text,
  contacted_at timestamptz,
  qualified_at timestamptz,
  converted_at timestamptz,
  closed_at timestamptz,
  archived_at timestamptz,
  anonymized_at timestamptz,
  retention_until timestamptz not null default (timezone('utc', now()) + interval '2 years'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.abuse_events (
  id bigint generated always as identity primary key,
  route text not null,
  event_type text not null,
  ip_address text,
  details text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_audit_events (
  id bigint generated always as identity primary key,
  actor text not null,
  actor_role text not null,
  action text not null,
  target_table text,
  target_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.operational_events (
  id bigint generated always as identity primary key,
  event_type text not null,
  severity text not null
    check (severity in ('info', 'warning', 'error')),
  source text not null,
  message text not null,
  request_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

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

create table if not exists public.api_idempotency_keys (
  key_hash text primary key,
  route text not null,
  response_status integer,
  response_body jsonb,
  expires_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists rate_limit_buckets_reset_at_idx
  on public.rate_limit_buckets (reset_at);

create index if not exists notification_dedupe_created_at_idx
  on public.notification_dedupe (created_at);

create index if not exists api_idempotency_keys_expires_at_idx
  on public.api_idempotency_keys (expires_at);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);
create index if not exists contact_inquiries_status_created_at_idx
  on public.contact_inquiries (lead_status, created_at desc);
create index if not exists contact_inquiries_email_lower_idx
  on public.contact_inquiries (lower(email));
create index if not exists contact_inquiries_phone_idx
  on public.contact_inquiries (phone);
create index if not exists contact_inquiries_request_id_idx
  on public.contact_inquiries (request_id);
create index if not exists contact_inquiries_retention_until_idx
  on public.contact_inquiries (retention_until);
create index if not exists contact_inquiries_anonymized_at_idx
  on public.contact_inquiries (anonymized_at);

create index if not exists savings_leads_created_at_idx
  on public.savings_leads (created_at desc);
create index if not exists savings_leads_status_created_at_idx
  on public.savings_leads (lead_status, created_at desc);
create index if not exists savings_leads_email_lower_idx
  on public.savings_leads (lower(email));
create index if not exists savings_leads_phone_idx
  on public.savings_leads (phone);
create index if not exists savings_leads_request_id_idx
  on public.savings_leads (request_id);
create index if not exists savings_leads_retention_until_idx
  on public.savings_leads (retention_until);
create index if not exists savings_leads_anonymized_at_idx
  on public.savings_leads (anonymized_at);

create index if not exists solar_assessments_created_at_idx
  on public.solar_assessments (created_at desc);
create index if not exists solar_assessments_status_created_at_idx
  on public.solar_assessments (lead_status, created_at desc);
create index if not exists solar_assessments_email_lower_idx
  on public.solar_assessments (lower(email));
create index if not exists solar_assessments_phone_idx
  on public.solar_assessments (phone);
create index if not exists solar_assessments_request_id_idx
  on public.solar_assessments (request_id);
create index if not exists solar_assessments_retention_until_idx
  on public.solar_assessments (retention_until);
create index if not exists solar_assessments_anonymized_at_idx
  on public.solar_assessments (anonymized_at);

create index if not exists admin_audit_events_created_at_idx
  on public.admin_audit_events (created_at desc);
create index if not exists admin_audit_events_actor_created_at_idx
  on public.admin_audit_events (actor, created_at desc);
create index if not exists admin_audit_events_target_idx
  on public.admin_audit_events (target_table, target_id);

create index if not exists operational_events_created_at_idx
  on public.operational_events (created_at desc);
create index if not exists operational_events_severity_created_at_idx
  on public.operational_events (severity, created_at desc);
create index if not exists operational_events_event_type_created_at_idx
  on public.operational_events (event_type, created_at desc);

alter table public.contact_inquiries enable row level security;
alter table public.savings_leads enable row level security;
alter table public.solar_assessments enable row level security;
alter table public.abuse_events enable row level security;
alter table public.admin_audit_events enable row level security;
alter table public.operational_events enable row level security;
alter table public.rate_limit_buckets enable row level security;
alter table public.notification_dedupe enable row level security;
alter table public.api_idempotency_keys enable row level security;

revoke all on public.contact_inquiries from public, anon, authenticated;
revoke all on public.savings_leads from public, anon, authenticated;
revoke all on public.solar_assessments from public, anon, authenticated;
revoke all on public.abuse_events from public, anon, authenticated;
revoke all on public.admin_audit_events from public, anon, authenticated;
revoke all on public.operational_events from public, anon, authenticated;
revoke all on public.rate_limit_buckets from public, anon, authenticated;
revoke all on public.notification_dedupe from public, anon, authenticated;
revoke all on public.api_idempotency_keys from public, anon, authenticated;

grant all on public.contact_inquiries to service_role;
grant all on public.savings_leads to service_role;
grant all on public.solar_assessments to service_role;
grant all on public.abuse_events to service_role;
grant all on public.admin_audit_events to service_role;
grant all on public.operational_events to service_role;
grant all on public.rate_limit_buckets to service_role;
grant all on public.notification_dedupe to service_role;
grant all on public.api_idempotency_keys to service_role;

grant usage, select on sequence public.contact_inquiries_id_seq to service_role;
grant usage, select on sequence public.savings_leads_id_seq to service_role;
grant usage, select on sequence public.solar_assessments_id_seq to service_role;
grant usage, select on sequence public.abuse_events_id_seq to service_role;
grant usage, select on sequence public.admin_audit_events_id_seq to service_role;
grant usage, select on sequence public.operational_events_id_seq to service_role;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists contact_inquiries_set_updated_at on public.contact_inquiries;
create trigger contact_inquiries_set_updated_at
  before update on public.contact_inquiries
  for each row
  execute function public.set_updated_at();

drop trigger if exists savings_leads_set_updated_at on public.savings_leads;
create trigger savings_leads_set_updated_at
  before update on public.savings_leads
  for each row
  execute function public.set_updated_at();

drop trigger if exists solar_assessments_set_updated_at on public.solar_assessments;
create trigger solar_assessments_set_updated_at
  before update on public.solar_assessments
  for each row
  execute function public.set_updated_at();

create or replace function public.claim_idempotency_key(
  p_key_hash text,
  p_route text,
  p_ttl_seconds integer
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := timezone('utc', now());
  v_existing public.api_idempotency_keys%rowtype;
begin
  if p_ttl_seconds < 1 then
    raise exception 'Invalid idempotency TTL';
  end if;

  select *
    into v_existing
    from public.api_idempotency_keys
    where key_hash = p_key_hash
    for update;

  if not found then
    insert into public.api_idempotency_keys (
      key_hash,
      route,
      expires_at,
      updated_at
    )
    values (
      p_key_hash,
      p_route,
      v_now + make_interval(secs => p_ttl_seconds),
      v_now
    );

    return jsonb_build_object('state', 'claimed');
  end if;

  if v_existing.expires_at <= v_now then
    update public.api_idempotency_keys
      set route = p_route,
          response_status = null,
          response_body = null,
          expires_at = v_now + make_interval(secs => p_ttl_seconds),
          updated_at = v_now
      where key_hash = p_key_hash;

    return jsonb_build_object('state', 'claimed');
  end if;

  if v_existing.response_body is null then
    return jsonb_build_object(
      'state', 'duplicate',
      'responseStatus', 202,
      'responseBody', jsonb_build_object(
        'ok', true,
        'code', 'already_processing',
        'message', 'This request is already being processed.'
      )
    );
  end if;

  return jsonb_build_object(
    'state', 'duplicate',
    'responseStatus', coalesce(v_existing.response_status, 200),
    'responseBody', v_existing.response_body
  );
end;
$$;

create or replace function public.complete_idempotency_key(
  p_key_hash text,
  p_response_status integer,
  p_response_body jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.api_idempotency_keys
    set response_status = p_response_status,
        response_body = p_response_body,
        updated_at = timezone('utc', now())
    where key_hash = p_key_hash;
end;
$$;

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

create or replace function public.delete_expired_closed_leads()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now timestamptz := timezone('utc', now());
  v_contacts_deleted integer := 0;
  v_savings_deleted integer := 0;
  v_assessments_deleted integer := 0;
begin
  delete from public.contact_inquiries
    where retention_until <= v_now
      and lead_status in ('closed', 'spam');
  get diagnostics v_contacts_deleted = row_count;

  delete from public.savings_leads
    where retention_until <= v_now
      and lead_status in ('closed', 'spam');
  get diagnostics v_savings_deleted = row_count;

  delete from public.solar_assessments
    where retention_until <= v_now
      and lead_status in ('closed', 'spam');
  get diagnostics v_assessments_deleted = row_count;

  return jsonb_build_object(
    'contactsDeleted', v_contacts_deleted,
    'savingsDeleted', v_savings_deleted,
    'assessmentsDeleted', v_assessments_deleted
  );
end;
$$;

revoke all on function public.check_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;
revoke all on function public.check_notification_dedupe(text, integer)
  from public, anon, authenticated;
revoke all on function public.claim_idempotency_key(text, text, integer)
  from public, anon, authenticated;
revoke all on function public.complete_idempotency_key(text, integer, jsonb)
  from public, anon, authenticated;
revoke all on function public.set_updated_at()
  from public, anon, authenticated;
revoke all on function public.cleanup_expired_operational_records()
  from public, anon, authenticated;
revoke all on function public.delete_expired_closed_leads()
  from public, anon, authenticated;

grant execute on function public.check_rate_limit(text, text, integer, integer)
  to service_role;
grant execute on function public.check_notification_dedupe(text, integer)
  to service_role;
grant execute on function public.claim_idempotency_key(text, text, integer)
  to service_role;
grant execute on function public.complete_idempotency_key(text, integer, jsonb)
  to service_role;
grant execute on function public.cleanup_expired_operational_records()
  to service_role;
grant execute on function public.delete_expired_closed_leads()
  to service_role;
