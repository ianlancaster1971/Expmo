-- Run this once in your Supabase project's SQL editor:
-- Dashboard → SQL Editor → New query → paste all of this → Run.
--
-- Creates the two tables this site needs, turns on Realtime (so Dashboard
-- edits appear live for every visitor), and sets permissive row-level
-- security policies matching this site's current "no login" choice —
-- anyone with the anon key (i.e. anyone visiting the site) can read AND
-- write. If you add authentication later, tighten the "with check"/"using"
-- clauses below to `auth.role() = 'authenticated'`.

-- ---------------------------------------------------------------- events
create table if not exists public.events (
  id          text primary key,
  category    text not null check (category in ('future', 'potential', 'past')),
  title       text not null,
  date        text,
  time        text,
  location    text,
  venue       text,
  eats        text,
  website     text,
  directions  text,
  description text,
  recap       text,
  votes       integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "public read events" on public.events;
create policy "public read events" on public.events
  for select using (true);

drop policy if exists "public write events" on public.events;
create policy "public write events" on public.events
  for insert with check (true);

drop policy if exists "public update events" on public.events;
create policy "public update events" on public.events
  for update using (true) with check (true);

drop policy if exists "public delete events" on public.events;
create policy "public delete events" on public.events
  for delete using (true);

-- ---------------------------------------------------------- site_content
-- A single-row table (id is always 'home') holding the editable Home page
-- text.
create table if not exists public.site_content (
  id             text primary key default 'home',
  hero_eyebrow   text,
  hero_title     text,
  hero_subtitle  text,
  about_title    text,
  about_text     text,
  ring_labels    jsonb
);

alter table public.site_content enable row level security;

drop policy if exists "public read content" on public.site_content;
create policy "public read content" on public.site_content
  for select using (true);

drop policy if exists "public upsert content" on public.site_content;
create policy "public upsert content" on public.site_content
  for insert with check (true);

drop policy if exists "public update content" on public.site_content;
create policy "public update content" on public.site_content
  for update using (true) with check (true);

-- --------------------------------------------------------- vote increment
-- Called by the "I'm interested" button. A function keeps the +1 atomic
-- (two people voting at the same instant won't clobber each other), which
-- a plain client-side "read votes, then write votes+1" can't guarantee.
create or replace function public.increment_votes(event_id text)
returns void
language sql
as $$
  update public.events set votes = votes + 1 where id = event_id;
$$;

-- ---------------------------------------------------------------- realtime
-- Lets the site's Dashboard edits push live to every open browser tab.
-- (Wrapped so it's safe to re-run this whole script without erroring on
-- "table is already a member of publication".)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'events'
  ) then
    alter publication supabase_realtime add table public.events;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'site_content'
  ) then
    alter publication supabase_realtime add table public.site_content;
  end if;
end $$;
