alter table public.contact_inquiries
  add column if not exists lead_status text not null default 'new',
  add column if not exists source_path text,
  add column if not exists source_page_url text,
  add column if not exists user_agent text,
  add column if not exists request_id text,
  add column if not exists assigned_to text,
  add column if not exists contacted_at timestamptz,
  add column if not exists qualified_at timestamptz,
  add column if not exists converted_at timestamptz,
  add column if not exists closed_at timestamptz,
  add column if not exists archived_at timestamptz,
  add column if not exists retention_until timestamptz not null default (timezone('utc', now()) + interval '2 years'),
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

alter table public.savings_leads
  add column if not exists lead_status text not null default 'new',
  add column if not exists source_path text,
  add column if not exists source_page_url text,
  add column if not exists user_agent text,
  add column if not exists request_id text,
  add column if not exists assigned_to text,
  add column if not exists contacted_at timestamptz,
  add column if not exists qualified_at timestamptz,
  add column if not exists converted_at timestamptz,
  add column if not exists closed_at timestamptz,
  add column if not exists archived_at timestamptz,
  add column if not exists retention_until timestamptz not null default (timezone('utc', now()) + interval '2 years'),
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

alter table public.solar_assessments
  add column if not exists lead_status text not null default 'new',
  add column if not exists source_path text,
  add column if not exists source_page_url text,
  add column if not exists user_agent text,
  add column if not exists request_id text,
  add column if not exists assigned_to text,
  add column if not exists contacted_at timestamptz,
  add column if not exists qualified_at timestamptz,
  add column if not exists converted_at timestamptz,
  add column if not exists closed_at timestamptz,
  add column if not exists archived_at timestamptz,
  add column if not exists consent_at timestamptz,
  add column if not exists retention_until timestamptz not null default (timezone('utc', now()) + interval '2 years'),
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

update public.solar_assessments
  set consent_at = created_at
  where consent = true and consent_at is null;

do $$
begin
  if not exists (
    select 1
      from pg_constraint
      where conname = 'contact_inquiries_lead_status_check'
  ) then
    alter table public.contact_inquiries
      add constraint contact_inquiries_lead_status_check
      check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam'));
  end if;

  if not exists (
    select 1
      from pg_constraint
      where conname = 'savings_leads_lead_status_check'
  ) then
    alter table public.savings_leads
      add constraint savings_leads_lead_status_check
      check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam'));
  end if;

  if not exists (
    select 1
      from pg_constraint
      where conname = 'solar_assessments_lead_status_check'
  ) then
    alter table public.solar_assessments
      add constraint solar_assessments_lead_status_check
      check (lead_status in ('new', 'contacted', 'qualified', 'converted', 'closed', 'spam'));
  end if;
end;
$$;

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

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.cleanup_expired_operational_records() from public, anon, authenticated;
revoke all on function public.delete_expired_closed_leads() from public, anon, authenticated;

grant execute on function public.cleanup_expired_operational_records() to service_role;
grant execute on function public.delete_expired_closed_leads() to service_role;
