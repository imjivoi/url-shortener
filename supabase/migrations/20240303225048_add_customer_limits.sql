alter table public.customers add column links_limit bigint not null default 20;
alter table public.customers add column clicks_limit bigint not null default 1000;
alter table public.customers add column clicks_limit_exceeded boolean null;
alter table public.customers add column links_limit_exceeded boolean null;


drop table if exists public.customer_limits;