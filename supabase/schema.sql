-- Flawless Beauty gift card shop schema
-- Run this in the Supabase SQL editor for the project used by Vercel.

create extension if not exists pgcrypto;

create table if not exists products (
  id text primary key,
  name text not null,
  description text not null,
  type text not null check (type in ('gift_card', 'physical')),
  price_cents integer,
  active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  status text not null check (
    status in ('pending', 'paid', 'fulfilled', 'failed', 'cancelled', 'refunded')
  ),
  currency text not null default 'EUR',
  total_cents integer not null check (total_cents >= 0),
  customer_name text not null,
  customer_email text not null,
  recipient_name text,
  recipient_email text,
  personal_message text,
  mollie_payment_id text unique,
  mollie_checkout_url text,
  fulfilled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text not null references products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists gift_cards (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references orders(id) on delete restrict,
  code_hash text not null unique,
  code_suffix text not null,
  initial_value_cents integer not null check (initial_value_cents > 0),
  remaining_value_cents integer not null check (remaining_value_cents >= 0),
  currency text not null default 'EUR',
  status text not null check (
    status in ('active', 'partially_redeemed', 'redeemed', 'expired', 'void')
  ) default 'active',
  expires_at timestamptz,
  sent_at timestamptz,
  last_email_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists gift_card_redemptions (
  id uuid primary key default gen_random_uuid(),
  gift_card_id uuid not null references gift_cards(id) on delete restrict,
  amount_cents integer not null check (amount_cents > 0),
  staff_note text,
  created_at timestamptz not null default now()
);

create table if not exists webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_event_id text not null,
  processed_at timestamptz not null default now(),
  payload jsonb not null default '{}'::jsonb,
  unique(provider, provider_event_id)
);

insert into products (id, name, description, type, active, metadata)
values (
  'gift-card',
  'Flawless Beauty cadeaukaart',
  'Digitale cadeaukaart voor behandelingen bij Flawless Beauty.',
  'gift_card',
  true,
  '{"amounts":[2500,5000,7500,10000,15000],"minCustomAmount":2000,"maxCustomAmount":25000}'::jsonb
)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  type = excluded.type,
  active = excluded.active,
  metadata = excluded.metadata,
  updated_at = now();

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
before update on products
for each row execute function set_updated_at();

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at
before update on orders
for each row execute function set_updated_at();

drop trigger if exists gift_cards_set_updated_at on gift_cards;
create trigger gift_cards_set_updated_at
before update on gift_cards
for each row execute function set_updated_at();
