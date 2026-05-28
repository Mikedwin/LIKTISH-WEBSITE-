alter table public.contact_inquiries
  add column if not exists anonymized_at timestamptz;

alter table public.savings_leads
  add column if not exists anonymized_at timestamptz;

alter table public.solar_assessments
  add column if not exists anonymized_at timestamptz;

create index if not exists contact_inquiries_anonymized_at_idx
  on public.contact_inquiries (anonymized_at);

create index if not exists savings_leads_anonymized_at_idx
  on public.savings_leads (anonymized_at);

create index if not exists solar_assessments_anonymized_at_idx
  on public.solar_assessments (anonymized_at);
