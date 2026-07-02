-- Better Choice Health Plans — lead + contact capture schema
-- Security model: RLS enabled with INSERT-only policies for the anon/publishable
-- key used by the Next.js API routes. The key can write submissions but cannot
-- read, update, or delete them. Rows are viewable only from the Supabase dashboard
-- (or with the service-role key).

create extension if not exists "pgcrypto";

-- ============================================================
-- leads — homepage survey submissions
-- ============================================================
create table if not exists public.leads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  state             text,
  age_band          text,
  household          text,
  currently_insured  text,
  reason             text,
  first_name         text not null,
  email              text not null,
  phone              text not null,
  consent            boolean not null default false,
  source             text default 'website',
  page_path          text,
  utm_source         text,
  utm_medium         text,
  utm_campaign       text,
  utm_term           text,
  utm_content        text,
  user_agent         text,
  ip                 text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- ============================================================
-- contact_messages — contact form submissions
-- ============================================================
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  message     text not null,
  page_path   text,
  user_agent  text
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

drop policy if exists "contact_insert_anon" on public.contact_messages;
create policy "contact_insert_anon"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);
