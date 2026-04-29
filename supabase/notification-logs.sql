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

create index if not exists notification_logs_created_at_idx
  on public.notification_logs (created_at desc);

create index if not exists notification_logs_channel_idx
  on public.notification_logs (channel, created_at desc);

alter table public.notification_logs enable row level security;

revoke all on public.notification_logs from anon, authenticated;
grant all on public.notification_logs to service_role;
grant usage, select on sequence public.notification_logs_id_seq to service_role;
