-- Fastrr Studio: leads + accounts schema for Supabase.
-- Run once in Supabase: SQL Editor > New query > paste this file > Run. Safe to re-run.

create extension if not exists pgcrypto;

-- ------------------------------------------------------------------ leads: every enquiry and sign-up
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  ref           text unique,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  intent        text not null check (intent in ('project','agency','question','signup')),
  source        text check (char_length(source) <= 60),          -- which button they clicked
  name          text not null check (char_length(name) between 1 and 120),
  email         text not null check (char_length(email) <= 200 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone         text check (char_length(phone) <= 40),
  company       text check (char_length(company) <= 160),
  website       text check (char_length(website) <= 300),
  role          text check (char_length(role) <= 80),
  creatives     text[] not null default '{}' check (cardinality(creatives) <= 20),
  volume        text check (char_length(volume) <= 60),
  budget        text check (char_length(budget) <= 60),
  timeline      text check (char_length(timeline) <= 60),
  contact_pref  text check (char_length(contact_pref) <= 30),
  brands_count  text check (char_length(brands_count) <= 30),
  message       text check (char_length(message) <= 4000),
  consent       boolean not null default false,
  page          text check (char_length(page) <= 300),
  referrer      text check (char_length(referrer) <= 300),
  utm           jsonb not null default '{}'::jsonb,
  user_agent    text check (char_length(user_agent) <= 300),
  user_id       uuid references auth.users(id) on delete set null,
  -- sales pipeline (only staff can change these)
  status        text not null default 'new' check (status in ('new','contacted','qualified','proposal','won','lost','spam')),
  owner         text check (char_length(owner) <= 120),
  notes         text check (char_length(notes) <= 8000)
);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_status_idx  on public.leads (status);
create index if not exists leads_email_idx   on public.leads (lower(email));

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists leads_touch on public.leads;
create trigger leads_touch before update on public.leads for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------------ staff: who can open the sales dashboard
create table if not exists public.staff (
  email      text primary key,
  name       text,
  added_at   timestamptz not null default now()
);
-- Add your sales team here (they sign up on the site with the same email):
-- insert into public.staff (email, name) values ('sales@yourcompany.com', 'Sales') on conflict do nothing;

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.staff where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
grant execute on function public.is_staff() to anon, authenticated;

-- ------------------------------------------------------------------ profiles: filled from the sign-up form
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  name        text,
  company     text,
  created_at  timestamptz not null default now()
);
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, company)
  values (new.id, new.email, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'company')
  on conflict (id) do nothing;
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- ------------------------------------------------------------------ row level security
alter table public.leads    enable row level security;
alter table public.staff    enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "leads: anyone can submit"       on public.leads;
drop policy if exists "leads: staff and owners read"   on public.leads;
drop policy if exists "leads: staff update"            on public.leads;
drop policy if exists "leads: staff delete"            on public.leads;
create policy "leads: anyone can submit" on public.leads for insert to anon, authenticated
  with check (status = 'new' and owner is null and notes is null and consent and (user_id is null or user_id = auth.uid()));
create policy "leads: staff and owners read" on public.leads for select to authenticated
  using (public.is_staff() or user_id = auth.uid());
create policy "leads: staff update" on public.leads for update to authenticated
  using (public.is_staff()) with check (public.is_staff());
create policy "leads: staff delete" on public.leads for delete to authenticated
  using (public.is_staff());

drop policy if exists "staff: staff read" on public.staff;
create policy "staff: staff read" on public.staff for select to authenticated using (public.is_staff());

drop policy if exists "profiles: own or staff read" on public.profiles;
drop policy if exists "profiles: own update"        on public.profiles;
create policy "profiles: own or staff read" on public.profiles for select to authenticated using (id = auth.uid() or public.is_staff());
create policy "profiles: own update"        on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- visitors may only write the enquiry columns; the pipeline columns stay with staff
revoke insert on public.leads from anon, authenticated;
grant insert (ref, intent, source, name, email, phone, company, website, role, creatives, volume, budget, timeline,
              contact_pref, brands_count, message, consent, page, referrer, utm, user_agent, user_id)
  on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;
