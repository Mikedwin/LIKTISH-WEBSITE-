create table if not exists public.api_idempotency_keys (
  key_hash text primary key,
  route text not null,
  response_status integer,
  response_body jsonb,
  expires_at timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists api_idempotency_keys_expires_at_idx
  on public.api_idempotency_keys (expires_at);

alter table public.api_idempotency_keys enable row level security;

revoke all on public.api_idempotency_keys from public, anon, authenticated;
grant all on public.api_idempotency_keys to service_role;

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

revoke all on function public.claim_idempotency_key(text, text, integer)
  from public, anon, authenticated;
revoke all on function public.complete_idempotency_key(text, integer, jsonb)
  from public, anon, authenticated;

grant execute on function public.claim_idempotency_key(text, text, integer)
  to service_role;
grant execute on function public.complete_idempotency_key(text, integer, jsonb)
  to service_role;
