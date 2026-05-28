create table if not exists public.notification_logs (
  id bigint generated always as identity primary key,
  channel text not null,
  recipient text not null,
  subject text not null,
  message text not null,
  mode text not null,
  status text not null,
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notification_jobs (
  id bigint generated always as identity primary key,
  notification_type text not null,
  subject text not null,
  recipient_label text not null,
  message text not null,
  html_message text,
  reply_to text,
  status text not null default 'queued',
  attempts integer not null default 0,
  last_error text,
  processed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint notification_jobs_status_check
    check (status in ('queued', 'processing', 'sent', 'failed'))
);

create index if not exists notification_logs_created_at_idx
  on public.notification_logs (created_at desc);

create index if not exists notification_logs_channel_idx
  on public.notification_logs (channel, created_at desc);

create index if not exists notification_jobs_status_created_at_idx
  on public.notification_jobs (status, created_at);

create index if not exists notification_jobs_processed_at_idx
  on public.notification_jobs (processed_at desc);

alter table public.notification_logs enable row level security;
alter table public.notification_jobs enable row level security;

revoke all on public.notification_logs from public, anon, authenticated;
revoke all on public.notification_jobs from public, anon, authenticated;

grant all on public.notification_logs to service_role;
grant all on public.notification_jobs to service_role;

grant usage, select on sequence public.notification_logs_id_seq to service_role;
grant usage, select on sequence public.notification_jobs_id_seq to service_role;
