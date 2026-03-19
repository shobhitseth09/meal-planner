-- Run this in your Supabase SQL editor (Dashboard → SQL Editor → New query)

-- Meals library
create table if not exists meals (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  description text,
  calories integer,
  protein decimal(6,2),
  carbs decimal(6,2),
  fat decimal(6,2),
  diet_tags text[] default '{}',
  ingredients text[] default '{}'
);

-- Weekly meal plan
create table if not exists meal_plan (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  plan_date date not null,
  meal_type text not null check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')),
  meal_id uuid references meals(id) on delete set null,
  custom_meal_name text,
  notes text,
  unique(plan_date, meal_type)
);

-- Enable Row Level Security
alter table meals enable row level security;
alter table meal_plan enable row level security;

-- Allow all authenticated users full access (it's just the two of you)
create policy "Auth users full access on meals"
  on meals for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Auth users full access on meal_plan"
  on meal_plan for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
