create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

-- First account created becomes the admin
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles(user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.handle_first_admin();

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  draft jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.site_settings to anon, authenticated;
grant insert, update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "admin insert settings" on public.site_settings for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "admin update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(), 'admin'));
insert into public.site_settings(id) values (1);

create table public.media_items (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('carousel','gallery','hero')),
  url text not null,
  caption text not null default '',
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.media_items to anon, authenticated;
grant insert, update, delete on public.media_items to authenticated;
grant all on public.media_items to service_role;
alter table public.media_items enable row level security;
create policy "public read active media" on public.media_items for select to anon, authenticated using (active or public.has_role(auth.uid(), 'admin'));
create policy "admin write media" on public.media_items for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  body text not null default '',
  photo_url text,
  rating int check (rating between 0 and 5),
  date_label text not null default '',
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.testimonials to anon, authenticated;
grant insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "public read active testimonials" on public.testimonials for select to anon, authenticated using (active or public.has_role(auth.uid(), 'admin'));
create policy "admin write testimonials" on public.testimonials for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

insert into public.media_items(section, url, sort_order) values
('carousel','/__l5e/assets-v1/5dfb8bfa-3cda-4262-a638-3c603284dc16/7f017b030ad3dbd1397b3c021798ff9a.jpg',1),
('carousel','/__l5e/assets-v1/54350ced-dcf3-4e83-93fb-51f75891ba69/e79dd41b0b6b29543259b7b02e89371e.jpg',2),
('carousel','/__l5e/assets-v1/8a5e128c-057f-4f86-aef2-a997c5cefddc/d477aaa1e2097ef1b9abe3d4485ab80d_1.jpg',3),
('carousel','/__l5e/assets-v1/1fc85a79-ee7e-47fb-ae99-b8b33d40765b/bb8f3ba4c7836bb4931428bb9f01914a.jpg',4),
('carousel','/__l5e/assets-v1/1bff9cc8-867a-4c95-88a4-df4d4aa53a29/325a97361866f86a8af448a75874ff9e.jpg',5),
('carousel','/__l5e/assets-v1/3e9193e1-a24a-43f0-87d0-6acc8f150985/2a0ae93e89d2f0200afe7b0d8f11d084_1.jpg',6),
('carousel','/__l5e/assets-v1/829a868e-14cf-462a-83d6-45fce8f4f1e4/d12a210abb04db67b937fa70a21f5a94_1.jpg',7),
('carousel','/__l5e/assets-v1/cd38635c-dbba-4d84-b147-46e7041cc1f6/30e6a997d3f9e073767bee849381048b.jpg',8),
('carousel','/__l5e/assets-v1/c8c50e0d-2697-43c2-b04b-4099488592c9/6e02de17b4e570ce75c2180c164a9671_1.jpg',9),
('carousel','/__l5e/assets-v1/a436f6ad-7a7c-48a5-ba78-cbcd508a6274/11d74db75f69991edd8b1a1e9390bd57.jpg',10);

create policy "public read site media" on storage.objects for select to anon, authenticated using (bucket_id = 'site-media');
create policy "admin upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "admin update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "admin delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));