-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  guests integer not null default 1,
  attending boolean not null,
  allergies text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.event_settings (
  id integer primary key default 1 check (id = 1),
  date_iso date not null,
  date_label text not null,
  time_label text not null,
  venue_name text not null,
  venue_address text not null,
  dress_code text not null,
  updated_at timestamptz not null default now()
);

-- Allow anonymous inserts (guests submitting the forms)
alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;

create policy "anyone can rsvp" on public.rsvps
  for insert with check (true);

create policy "anyone can leave a wish" on public.wishes
  for insert with check (true);

create policy "wishes are public" on public.wishes
  for select using (true);
