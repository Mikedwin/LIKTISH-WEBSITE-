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

create index if not exists admin_audit_events_created_at_idx
  on public.admin_audit_events (created_at desc);

create index if not exists admin_audit_events_actor_created_at_idx
  on public.admin_audit_events (actor, created_at desc);

create index if not exists admin_audit_events_target_idx
  on public.admin_audit_events (target_table, target_id);

alter table public.admin_audit_events enable row level security;

revoke all on public.admin_audit_events from public, anon, authenticated;
grant all on public.admin_audit_events to service_role;
grant usage, select on sequence public.admin_audit_events_id_seq to service_role;
