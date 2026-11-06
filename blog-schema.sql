-- Run this whole file once in Supabase: Dashboard → SQL Editor → New query.

-- 1. Trigger function that keeps `updated_at` current on every edit.
-- Safe to run even if it already exists in this project.
create or replace function update_modified_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 2. The blogs table.
create table public.blogs (
  id uuid not null default gen_random_uuid (),
  title text not null,
  slug text not null,
  excerpt text null,
  content text not null,
  image_url text null,
  author_name text null default 'MakeMyStore Team'::text,
  category text null default 'AI Development'::text,
  is_live boolean null default false,
  published_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  image_url_2 text null,
  image_url_3 text null,
  lang text not null default 'en'::text,
  translation_of uuid null,
  constraint blogs_pkey primary key (id),
  constraint blogs_slug_key unique (slug),
  constraint blogs_translation_of_fkey foreign key (translation_of) references blogs (id)
) tablespace pg_default;

create index if not exists blogs_is_live_published_at_idx
  on public.blogs using btree (is_live, published_at desc) tablespace pg_default;

create trigger update_blogs_modtime before
update on blogs for each row
execute function update_modified_column ();

-- 3. Row Level Security — the app reads this table with the public anon
-- key, so only rows with is_live = true should ever be visible to it.
-- Writing/editing posts still happens with the service role key (which
-- bypasses RLS), e.g. from an admin script or Supabase Studio directly.
alter table public.blogs enable row level security;

create policy "Public can read live posts"
  on public.blogs
  for select
  to anon
  using (is_live = true);

-- 4. (Optional but recommended) A public Storage bucket for post images,
-- so image_url / image_url_2 / image_url_3 can point at Supabase Storage
-- and Next/Image (already configured for *.supabase.co) can load them.
-- Create it once via Dashboard → Storage → New bucket → name it "blog",
-- and mark it Public. No SQL needed for that step.
