-- Run this ONCE in Supabase -> SQL Editor. It is safe to run again.
-- Adds what the /admin dashboard needs to the existing "leads" table.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text,
  phone text,
  service text,
  budget text,
  message text,
  source text
);

alter table public.leads add column if not exists created_at timestamptz not null default now();
alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add column if not exists notes text;

-- Only the server (service role key) may read or write leads. No public policies on purpose.
alter table public.leads enable row level security;
