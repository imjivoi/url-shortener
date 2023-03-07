drop table if exists public.link;
create table link (
  id uuid not null primary key DEFAULT uuid_generate_v4(),
  updated_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  alias text,
  redirect_url text,
  original_url text,
  title text,
  user_id uuid references auth.users on delete cascade not null
);

drop table if exists public.click;
create table click (
  id uuid not null primary key DEFAULT uuid_generate_v4(),
  link_id uuid references public.link on delete cascade not null,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  country text,
  city text,
  region text,
  latitude text,
  longitude text,
  ua text,
  browser text,
  browser_version text,
  engine text,
  engine_version text,
  os text,
  os_version text,
  device text,
  device_vendor text,
  device_model text,
  cpu_architecture text,
  bot boolean,
  referer text,
  referer_url text,
  ip text
);

