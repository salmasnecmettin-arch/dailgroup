-- =========================================================================
-- DAIL GROUP — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) once per
-- project. Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE guards.
-- =========================================================================

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
do $$ begin
  create type service_category as enum ('gida', 'icecek', 'insaat');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type user_role as enum ('admin', 'editor', 'staff');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type submission_type as enum ('teklif', 'iletisim', 'ik');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type submission_status as enum ('yeni', 'okundu', 'iletisime_gecildi', 'arsivlendi');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type media_type as enum ('image', 'video');
exception
  when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------
-- profiles — extends auth.users with a role for the admin CRM
-- ---------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role user_role not null default 'staff',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- categories — the 3 top-level service pillars (Gıda / İçecek / İnşaat)
-- ---------------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  key service_category not null unique,
  title text not null,
  short_description text not null default '',
  cover_url text not null default '',
  icon text not null default 'Sparkles',
  order_index int not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- brands — bayilikler (Yakup Ağa, A Piliç, Beysu, ... + İnşaat Hizmetleri)
-- ---------------------------------------------------------------------
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_name text not null,
  category service_category not null,
  tagline text not null default '',
  description text not null default '',
  about text not null default '',
  color text not null default '#2b2e83',
  website text,
  logo_url text not null default '',
  cover_url text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  order_index int not null default 0,
  active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- safe to re-run even if `brands` already existed from an earlier version of this schema
alter table brands add column if not exists about text not null default '';
alter table brands add column if not exists logo_url text not null default '';
alter table contact_info add column if not exists footer_image text not null default '';

create index if not exists brands_category_idx on brands (category);

-- ---------------------------------------------------------------------
-- hero_content / about_content / contact_info — singleton content blocks
-- ---------------------------------------------------------------------
create table if not exists hero_content (
  id int primary key default 1,
  eyebrow text not null default '',
  title text not null default '',
  highlight text not null default '',
  description text not null default '',
  background_image text not null default '',
  background_video text,
  primary_cta_label text not null default '',
  primary_cta_href text not null default '',
  secondary_cta_label text not null default '',
  secondary_cta_href text not null default '',
  updated_at timestamptz not null default now(),
  constraint hero_content_singleton check (id = 1)
);

create table if not exists about_content (
  id int primary key default 1,
  title text not null default '',
  description text not null default '',
  mission text not null default '',
  vision text not null default '',
  values jsonb not null default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb,
  management_message text not null default '',
  updated_at timestamptz not null default now(),
  constraint about_content_singleton check (id = 1)
);

create table if not exists contact_info (
  id int primary key default 1,
  address text not null default '',
  phone text not null default '',
  whatsapp text not null default '',
  email text not null default '',
  map_embed_url text not null default '',
  working_hours text not null default '',
  social jsonb not null default '{}'::jsonb,
  footer_image text not null default '',
  updated_at timestamptz not null default now(),
  constraint contact_info_singleton check (id = 1)
);

create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  icon text not null default 'Award',
  order_index int not null default 0
);

-- ---------------------------------------------------------------------
-- form_submissions — Fiyat Bilgi Formu / İletişim Formu / İK başvuruları
-- ---------------------------------------------------------------------
create table if not exists form_submissions (
  id uuid primary key default gen_random_uuid(),
  type submission_type not null,
  name text not null,
  company text,
  phone text not null,
  email text,
  service_slug text,
  message text,
  kvkk_consent boolean not null default false,
  status submission_status not null default 'yeni',
  notes text,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists form_submissions_status_idx on form_submissions (status);
create index if not exists form_submissions_type_idx on form_submissions (type);

-- ---------------------------------------------------------------------
-- gallery_items — genel galeri (foto/video, drone, referans görselleri)
-- ---------------------------------------------------------------------
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'genel',
  media_type media_type not null default 'image',
  url text not null,
  title text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- page_seo — sayfa bazlı SEO override
-- ---------------------------------------------------------------------
create table if not exists page_seo (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  title text,
  description text,
  keywords text,
  og_image text,
  canonical text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Storage — "media" bucket for admin-uploaded images (covers, logos, hero)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- =========================================================================
-- Row Level Security
-- =========================================================================
alter table profiles enable row level security;
alter table categories enable row level security;
alter table brands enable row level security;
alter table hero_content enable row level security;
alter table about_content enable row level security;
alter table contact_info enable row level security;
alter table stats enable row level security;
alter table form_submissions enable row level security;
alter table gallery_items enable row level security;
alter table page_seo enable row level security;

-- helper: is the current user an authenticated admin/editor?
create or replace function is_staff()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'editor', 'staff')
  );
$$;

-- Public read access for site content -----------------------------------
drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);

drop policy if exists "public read brands" on brands;
create policy "public read brands" on brands for select using (active = true);

drop policy if exists "public read hero_content" on hero_content;
create policy "public read hero_content" on hero_content for select using (true);

drop policy if exists "public read about_content" on about_content;
create policy "public read about_content" on about_content for select using (true);

drop policy if exists "public read contact_info" on contact_info;
create policy "public read contact_info" on contact_info for select using (true);

drop policy if exists "public read stats" on stats;
create policy "public read stats" on stats for select using (true);

drop policy if exists "public read gallery_items" on gallery_items;
create policy "public read gallery_items" on gallery_items for select using (true);

drop policy if exists "public read page_seo" on page_seo;
create policy "public read page_seo" on page_seo for select using (true);

-- Public can submit forms, but not read/update/delete them --------------
drop policy if exists "public insert form_submissions" on form_submissions;
create policy "public insert form_submissions" on form_submissions
  for insert with check (true);

-- Staff (admin/editor) full access ---------------------------------------
drop policy if exists "staff manage categories" on categories;
create policy "staff manage categories" on categories for all using (is_staff()) with check (is_staff());

drop policy if exists "staff manage brands" on brands;
create policy "staff manage brands" on brands for all using (is_staff()) with check (is_staff());

drop policy if exists "staff manage hero_content" on hero_content;
create policy "staff manage hero_content" on hero_content for all using (is_staff()) with check (is_staff());

drop policy if exists "staff manage about_content" on about_content;
create policy "staff manage about_content" on about_content for all using (is_staff()) with check (is_staff());

drop policy if exists "staff manage contact_info" on contact_info;
create policy "staff manage contact_info" on contact_info for all using (is_staff()) with check (is_staff());

drop policy if exists "staff manage stats" on stats;
create policy "staff manage stats" on stats for all using (is_staff()) with check (is_staff());

drop policy if exists "staff manage form_submissions" on form_submissions;
create policy "staff manage form_submissions" on form_submissions for select using (is_staff());
drop policy if exists "staff update form_submissions" on form_submissions;
create policy "staff update form_submissions" on form_submissions for update using (is_staff()) with check (is_staff());
drop policy if exists "staff delete form_submissions" on form_submissions;
create policy "staff delete form_submissions" on form_submissions for delete using (is_staff());

drop policy if exists "staff manage gallery_items" on gallery_items;
create policy "staff manage gallery_items" on gallery_items for all using (is_staff()) with check (is_staff());

drop policy if exists "staff manage page_seo" on page_seo;
create policy "staff manage page_seo" on page_seo for all using (is_staff()) with check (is_staff());

-- helper: is the current user an admin? (SECURITY DEFINER — must NOT query
-- `profiles` directly from a policy on `profiles` itself, or Postgres RLS
-- recurses infinitely re-evaluating the same policy for the subquery.)
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "user reads own profile" on profiles;
create policy "user reads own profile" on profiles for select using (auth.uid() = id or is_staff());

drop policy if exists "admin manages profiles" on profiles;
create policy "admin manages profiles" on profiles for all using (is_admin()) with check (is_admin());

-- Auto-create a profile row (default: staff) whenever a new auth user signs up.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data ->> 'full_name', 'staff');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Storage policies for the "media" bucket ---------------------------------
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "staff upload media" on storage.objects;
create policy "staff upload media" on storage.objects
  for insert with check (bucket_id = 'media' and is_staff());

drop policy if exists "staff update media" on storage.objects;
create policy "staff update media" on storage.objects
  for update using (bucket_id = 'media' and is_staff());

drop policy if exists "staff delete media" on storage.objects;
create policy "staff delete media" on storage.objects
  for delete using (bucket_id = 'media' and is_staff());
