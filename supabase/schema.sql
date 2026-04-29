create table if not exists public.contact_inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text not null,
  enquiry_type text not null,
  message text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.savings_leads (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null,
  estimate_summary text not null,
  created_at timestamptz not null default timezone('utc', now())
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
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.contact_inquiries enable row level security;
alter table public.savings_leads enable row level security;
alter table public.solar_assessments enable row level security;

revoke all on public.contact_inquiries from anon, authenticated;
revoke all on public.savings_leads from anon, authenticated;
revoke all on public.solar_assessments from anon, authenticated;

grant all on public.contact_inquiries to service_role;
grant all on public.savings_leads to service_role;
grant all on public.solar_assessments to service_role;

grant usage, select on sequence public.contact_inquiries_id_seq to service_role;
grant usage, select on sequence public.savings_leads_id_seq to service_role;
grant usage, select on sequence public.solar_assessments_id_seq to service_role;
