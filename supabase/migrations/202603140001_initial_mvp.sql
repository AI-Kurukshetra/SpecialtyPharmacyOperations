create extension if not exists "pgcrypto";

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid(),
  name text not null,
  date_of_birth date,
  insurance_provider text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  medication_name text not null,
  provider_name text,
  status text not null default 'pending_review',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.prior_authorizations (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid(),
  prescription_id uuid not null references public.prescriptions(id) on delete cascade,
  payer text not null,
  status text not null default 'submitted',
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid(),
  title text not null,
  status text not null default 'open',
  assigned_to text,
  due_date date,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  file_url text not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.patients enable row level security;
alter table public.prescriptions enable row level security;
alter table public.prior_authorizations enable row level security;
alter table public.tasks enable row level security;
alter table public.documents enable row level security;

create policy "patients_select_own" on public.patients
  for select using (auth.uid() = created_by);
create policy "patients_insert_own" on public.patients
  for insert with check (auth.uid() = created_by);
create policy "patients_update_own" on public.patients
  for update using (auth.uid() = created_by);

create policy "prescriptions_select_own" on public.prescriptions
  for select using (auth.uid() = created_by);
create policy "prescriptions_insert_own" on public.prescriptions
  for insert with check (auth.uid() = created_by);
create policy "prescriptions_update_own" on public.prescriptions
  for update using (auth.uid() = created_by);

create policy "prior_auths_select_own" on public.prior_authorizations
  for select using (auth.uid() = created_by);
create policy "prior_auths_insert_own" on public.prior_authorizations
  for insert with check (auth.uid() = created_by);
create policy "prior_auths_update_own" on public.prior_authorizations
  for update using (auth.uid() = created_by);

create policy "tasks_select_own" on public.tasks
  for select using (auth.uid() = created_by);
create policy "tasks_insert_own" on public.tasks
  for insert with check (auth.uid() = created_by);
create policy "tasks_update_own" on public.tasks
  for update using (auth.uid() = created_by);

create policy "documents_select_own" on public.documents
  for select using (auth.uid() = created_by);
create policy "documents_insert_own" on public.documents
  for insert with check (auth.uid() = created_by);
create policy "documents_update_own" on public.documents
  for update using (auth.uid() = created_by);
