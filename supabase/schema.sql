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
