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

create index if not exists operational_events_created_at_idx
  on public.operational_events (created_at desc);

create index if not exists operational_events_severity_created_at_idx
  on public.operational_events (severity, created_at desc);

create index if not exists operational_events_event_type_created_at_idx
  on public.operational_events (event_type, created_at desc);

alter table public.operational_events enable row level security;

revoke all on public.operational_events from public, anon, authenticated;
grant all on public.operational_events to service_role;
grant usage, select on sequence public.operational_events_id_seq to service_role;
