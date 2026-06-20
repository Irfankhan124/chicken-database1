create extension if not exists pgcrypto;

create type user_role as enum ('مدیر','مسؤل','کارکوونکی');
create type employee_status as enum ('فعال','غیر فعال');

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'زما شرکت',
  logo_url text,
  phone text,
  address text,
  currency text not null default 'AFN',
  print_footer text,
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  full_name text not null,
  role user_role not null default 'کارکوونکی',
  phone text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.vendor_accounts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  driver_name text not null,
  vendor_name text not null,
  load_weight numeric(14,2) not null default 0,
  unit_price numeric(14,2) not null default 0,
  unit_commission numeric(14,2) not null default 0,
  total_commission numeric(14,2) generated always as (load_weight * unit_commission) stored,
  total_price numeric(14,2) generated always as (load_weight * unit_price) stored,
  receipts numeric(14,2) not null default 0,
  balance numeric(14,2) generated always as ((load_weight * unit_price) - receipts) stored,
  entry_date date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

create table public.warehouse_invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  driver_name text not null,
  vendor_name text not null,
  load_weight numeric(14,2) not null default 0,
  unit_price numeric(14,2) not null default 0,
  total_price numeric(14,2) generated always as (load_weight * unit_price) stored,
  receipts numeric(14,2) not null default 0,
  balance numeric(14,2) generated always as ((load_weight * unit_price) - receipts) stored,
  empty_weight numeric(14,2) not null default 0,
  waste numeric(14,2) not null default 0,
  rent numeric(14,2) not null default 0,
  expenses numeric(14,2) not null default 0,
  warehouse_expenses numeric(14,2) not null default 0,
  commission numeric(14,2) not null default 0,
  total_commission numeric(14,2) generated always as (load_weight * commission) stored,
  extra_profit numeric(14,2) not null default 0,
  final_cost numeric(14,2) generated always as ((load_weight * unit_price) + rent + expenses + warehouse_expenses + (load_weight * commission) - extra_profit) stored,
  entry_date date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

create table public.warehouse_outvoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  customer_name text not null,
  stock_before numeric(14,2) not null default 0,
  stock_out numeric(14,2) not null default 0,
  load_weight numeric(14,2) not null default 0,
  unit_price numeric(14,2) not null default 0,
  total_price numeric(14,2) generated always as (load_weight * unit_price) stored,
  receipts numeric(14,2) not null default 0,
  balance numeric(14,2) generated always as ((load_weight * unit_price) - receipts) stored,
  entry_date date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  name text not null,
  father_name text,
  job_title text,
  phone text,
  address text,
  hire_date date,
  monthly_salary numeric(14,2) not null default 0,
  status employee_status not null default 'فعال',
  created_at timestamptz not null default now()
);

create table public.salaries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  employee_id uuid references public.employees(id) on delete cascade,
  afghan_month text not null check (afghan_month in ('حمل','ثور','جوزا','سرطان','اسد','سنبله','میزان','عقرب','قوس','جدي','دلو','حوت')),
  monthly_salary numeric(14,2) not null default 0,
  paid_amount numeric(14,2) not null default 0,
  remaining_amount numeric(14,2) generated always as (monthly_salary - paid_amount) stored,
  paid_date date not null default current_date,
  created_at timestamptz not null default now()
);
