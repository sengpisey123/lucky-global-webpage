-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/njwqhbpingqsyamevcbn/sql
--
-- AUTHENTICATION NOTE:
-- Neither form requires a user to be logged in.
-- Submissions flow through Next.js server-side API routes that use the
-- service-role key, which bypasses RLS completely.
-- The "anon insert" policies below also let the tables accept direct
-- anonymous writes in case you ever connect from the browser directly.

create table if not exists public.contact_inquiries (
  id          bigint generated always as identity primary key,
  created_at  timestamp with time zone default timezone('utc', now()) not null,
  locale      text not null,
  name        text not null,
  company     text,
  email       text not null,
  message     text not null
);

alter table public.contact_inquiries enable row level security;

-- Server-side API route (service role key) — full access
create policy "service role insert contact"
  on public.contact_inquiries
  for insert
  to service_role
  with check (true);

create policy "service role select contact"
  on public.contact_inquiries
  for select
  to service_role
  using (true);

-- Anonymous / public — insert only, no login required
create policy "anon insert contact"
  on public.contact_inquiries
  for insert
  to anon
  with check (true);

-- ─── APPLICANTS TABLE ───────────────────────────────────────────────────────
-- For candidates who want to join the internship program. No login required.

create table if not exists public.applicants (
  id          bigint generated always as identity primary key,
  created_at  timestamp with time zone default timezone('utc', now()) not null,
  locale      text not null,
  full_name   text not null,
  phone       text not null,
  sex         text not null check (sex in ('male', 'female')),
  province    text not null
);

alter table public.applicants enable row level security;

-- Server-side API route (service role key) — full access
create policy "service role insert applicants"
  on public.applicants
  for insert
  to service_role
  with check (true);

create policy "service role select applicants"
  on public.applicants
  for select
  to service_role
  using (true);

-- Anonymous / public — insert only, no login required
create policy "anon insert applicants"
  on public.applicants
  for insert
  to anon
  with check (true);

