create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'معلومات',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.my_company_id()
returns uuid language sql security definer stable as $$
  select company_id from public.profiles where id = auth.uid();
$$;

create or replace function public.is_manager()
returns boolean language sql security definer stable as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role in ('مدیر','مسؤل'));
$$;

create or replace view public.dashboard_summary as
select c.id company_id,
coalesce((select sum(total_price) from public.warehouse_invoices where company_id=c.id),0) total_inventory_value,
coalesce((select sum(total_price) from public.warehouse_outvoices where company_id=c.id),0) total_income,
coalesce((select sum(rent + expenses + warehouse_expenses + total_commission) from public.warehouse_invoices where company_id=c.id),0) total_expenses,
coalesce((select sum(balance) from public.warehouse_outvoices where company_id=c.id),0) total_receivables,
coalesce((select sum(balance) from public.vendor_accounts where company_id=c.id),0) total_payables,
coalesce((select sum(monthly_salary) from public.employees where company_id=c.id and status='فعال'),0) salary_budget
from public.companies c;

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.vendor_accounts enable row level security;
alter table public.warehouse_invoices enable row level security;
alter table public.warehouse_outvoices enable row level security;
alter table public.employees enable row level security;
alter table public.salaries enable row level security;
alter table public.notifications enable row level security;

create policy companies_read on public.companies for select using (id = public.my_company_id());
create policy companies_edit on public.companies for update using (id = public.my_company_id() and public.is_manager());
create policy profiles_read on public.profiles for select using (company_id = public.my_company_id() or id = auth.uid());
create policy profiles_edit on public.profiles for update using (id = auth.uid());
create policy vendor_crud on public.vendor_accounts for all using (company_id = public.my_company_id()) with check (company_id = public.my_company_id());
create policy win_crud on public.warehouse_invoices for all using (company_id = public.my_company_id()) with check (company_id = public.my_company_id());
create policy wout_crud on public.warehouse_outvoices for all using (company_id = public.my_company_id()) with check (company_id = public.my_company_id());
