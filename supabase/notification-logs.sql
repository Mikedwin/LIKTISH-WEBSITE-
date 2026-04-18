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
