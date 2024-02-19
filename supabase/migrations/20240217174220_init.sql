create table
  public.customers (
    id uuid not null,

    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default (now() at time zone 'utc'::text),
    constraint customer_pkey primary key (id),
    constraint customers_id_fkey foreign key (id) references auth.users (id)
  ) tablespace pg_default;


create table 
  public.customer_limits (
    id uuid not null default uuid_generate_v4 (),
    customer_id uuid not null,
    links_limit bigint not null,
    clicks_limit bigint not null,
    clicks_limit_exceeded boolean null,
    links_limit_exceeded boolean null,

    created_at timestamp with time zone not null default timezone ('utc'::text, now()),
    updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
    constraint customer_limits_pkey primary key (id),
    constraint customer_limits_customer_id_fkey foreign key (customer_id) references public.customers (id) on delete cascade
  ) tablespace pg_default;

create table
  public.links (
    id uuid not null default uuid_generate_v4 (),
    alias text not null,
    redirect_url text not null,
    original_url text not null,
    title text null,
    user_id uuid not null,
    description text null,
    image_url text null,

    updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
    created_at timestamp with time zone not null default timezone ('utc'::text, now()),

    constraint links_pkey primary key (id),
    constraint links_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;



create table
  public.clicks (
    id uuid not null default uuid_generate_v4 (),
    link_id uuid null,
    country text null,
    city text null,
    region text null,
    latitude text null,
    longitude text null,
    ua text null,
    browser text null,
    browser_version text null,
    engine text null,
    engine_version text null,
    os text null,
    os_version text null,
    device text null,
    device_vendor text null,
    device_model text null,
    cpu_architecture text null,
    bot boolean null,
    referer text null,
    referer_url text null,
    ip text null,


    created_at timestamp with time zone not null default timezone ('utc'::text, now()),

    constraint clicks_pkey primary key (id),
    constraint clicks_link_id_fkey foreign key (link_id) references links (id) on delete set null
  ) tablespace pg_default;




CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS trigger AS $$ BEGIN new.updated_at = now(); RETURN new; END; $$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR each ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_customer_limits_updated_at BEFORE UPDATE ON customer_limits FOR each ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_links_updated_at BEFORE UPDATE ON links FOR each ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO customers (id)
  VALUES (new.id);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY definer SET search_path = public;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR each ROW EXECUTE PROCEDURE handle_new_user();

