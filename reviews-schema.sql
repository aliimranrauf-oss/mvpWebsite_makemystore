-- Run this whole file once in Supabase: Dashboard → SQL Editor → New query.

-- 1. Reviews table (same shape as the reference site, plus a `service` column
-- so each review can show which service it was for).
create table if not exists public.reviews (
  id uuid not null default gen_random_uuid (),
  name text not null,
  company text null,
  country text not null,
  rating smallint not null,
  review text not null,
  avatar_url text null,
  service text null,
  status text not null default 'pending'::text,
  created_at timestamp with time zone not null default now(),
  pinned boolean not null default false,
  order_number text not null,
  contact text not null,
  constraint reviews_pkey primary key (id),
  constraint reviews_rating_check check (rating >= 1 and rating <= 5),
  constraint reviews_status_check check (
    status = any (array['pending'::text, 'approved'::text, 'rejected'::text])
  )
) tablespace pg_default;

create index if not exists reviews_status_created_at_idx
  on public.reviews using btree (status, created_at desc) tablespace pg_default;

create index if not exists reviews_pinned_idx
  on public.reviews using btree (pinned) tablespace pg_default
  where (pinned = true);

-- 2. Row Level Security. order_number and contact are private, so we add NO
-- policy for the public anon key: nobody can read this table with it.
-- The site reads/writes only through the server (service role key, which
-- bypasses RLS) and only ever selects the public columns.
alter table public.reviews enable row level security;

-- 3. Your 10 real reviews (already approved, backdated to the dates you received them).
insert into public.reviews
  (name, country, rating, review, service, status, order_number, contact, created_at)
values
  ('James Walker', 'United Kingdom', 5, 'The chatbot fits perfectly into my website and handles common customer questions automatically. The whole process was smooth, and the result was exactly what I needed.', 'AI Chatbot', 'approved', 'IMPORTED', 'imported', '2026-10-18 10:00:00+00'),
  ('Emily Carter', 'United States', 5, 'I wanted a clean, professional portfolio that reflected my work. The final design looks modern, loads quickly, and makes it easy to showcase my projects.', 'Portfolio Website', 'approved', 'IMPORTED', 'imported', '2026-10-16 10:00:00+00'),
  ('Omar Al Mansoori', 'UAE', 5, 'I had an idea for a software product but needed help turning it into a working MVP. The development process was clear, and I could see my idea taking shape.', 'SaaS MVP', 'approved', 'IMPORTED', 'imported', '2026-10-14 10:00:00+00'),
  ('Olivia Bennett', 'Australia', 5, 'My CV needed a complete refresh. The new version is well structured, easy to read, and presents my skills and experience much more professionally.', 'CV Writing', 'approved', 'IMPORTED', 'imported', '2026-10-12 10:00:00+00'),
  ('Daniel Brooks', 'United States', 5, 'Great experience from planning to delivery. The application has a clean interface and the core features I needed to demonstrate my concept to potential users.', 'MVP Development', 'approved', 'IMPORTED', 'imported', '2026-10-10 10:00:00+00'),
  ('Sophie Mitchell', 'United Kingdom', 5, 'I needed a smarter way to respond to website visitors. The AI chatbot makes the experience more interactive and helps visitors find information without waiting for a reply.', 'AI Chatbot', 'approved', 'IMPORTED', 'imported', '2026-10-08 10:00:00+00'),
  ('Mariam Hassan', 'UAE', 5, 'The portfolio feels polished and professional, with a layout that works well on mobile. It gives me a much better way to present my services and experience.', 'Portfolio Website', 'approved', 'IMPORTED', 'imported', '2026-10-06 10:00:00+00'),
  ('Liam Anderson', 'Australia', 5, 'The updated CV communicates my experience much better than my old one. The formatting is professional, and the content is more focused on the roles I want.', 'CV Writing', 'approved', 'IMPORTED', 'imported', '2026-10-04 10:00:00+00'),
  ('Rachel Morgan', 'United States', 5, 'What I liked most was having a solution built around my business rather than a generic template. The chatbot is useful, and the setup was straightforward.', 'AI Chatbot', 'approved', 'IMPORTED', 'imported', '2026-10-02 10:00:00+00'),
  ('Thomas Reed', 'United Kingdom', 5, 'A solid starting point for my software idea. The key features are in place, and having a working product makes it much easier to explain the concept to others.', 'SaaS MVP', 'approved', 'IMPORTED', 'imported', '2026-09-30 10:00:00+00');
