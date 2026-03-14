alter table public.patients
  alter column created_by drop not null,
  add column if not exists provider_phone text,
  add column if not exists status text not null default 'Enrollment Submitted';

alter table public.prescriptions
  alter column created_by drop not null;

alter table public.prior_authorizations
  alter column created_by drop not null;

alter table public.tasks
  alter column created_by drop not null,
  add column if not exists patient_id uuid references public.patients(id) on delete cascade;

alter table public.documents
  alter column created_by drop not null;

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  created_by uuid default auth.uid(),
  name text not null,
  clinic_name text,
  phone text,
  npi text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.insurance (
  id uuid primary key default gen_random_uuid(),
  created_by uuid default auth.uid(),
  provider_name text not null,
  member_id text,
  group_number text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_by uuid default auth.uid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  sender_role text not null default 'staff',
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.providers enable row level security;
alter table public.insurance enable row level security;
alter table public.messages enable row level security;

drop policy if exists "patients_select_own" on public.patients;
drop policy if exists "patients_insert_own" on public.patients;
drop policy if exists "patients_update_own" on public.patients;
drop policy if exists "prescriptions_select_own" on public.prescriptions;
drop policy if exists "prescriptions_insert_own" on public.prescriptions;
drop policy if exists "prescriptions_update_own" on public.prescriptions;
drop policy if exists "prior_auths_select_own" on public.prior_authorizations;
drop policy if exists "prior_auths_insert_own" on public.prior_authorizations;
drop policy if exists "prior_auths_update_own" on public.prior_authorizations;
drop policy if exists "tasks_select_own" on public.tasks;
drop policy if exists "tasks_insert_own" on public.tasks;
drop policy if exists "tasks_update_own" on public.tasks;
drop policy if exists "documents_select_own" on public.documents;
drop policy if exists "documents_insert_own" on public.documents;
drop policy if exists "documents_update_own" on public.documents;

create policy "patients_select_own" on public.patients
  for select using (auth.uid() = created_by or created_by is null);
create policy "patients_insert_own" on public.patients
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "patients_update_own" on public.patients
  for update using (auth.uid() = created_by or created_by is null);

create policy "prescriptions_select_own" on public.prescriptions
  for select using (auth.uid() = created_by or created_by is null);
create policy "prescriptions_insert_own" on public.prescriptions
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "prescriptions_update_own" on public.prescriptions
  for update using (auth.uid() = created_by or created_by is null);

create policy "prior_auths_select_own" on public.prior_authorizations
  for select using (auth.uid() = created_by or created_by is null);
create policy "prior_auths_insert_own" on public.prior_authorizations
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "prior_auths_update_own" on public.prior_authorizations
  for update using (auth.uid() = created_by or created_by is null);

create policy "tasks_select_own" on public.tasks
  for select using (auth.uid() = created_by or created_by is null);
create policy "tasks_insert_own" on public.tasks
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "tasks_update_own" on public.tasks
  for update using (auth.uid() = created_by or created_by is null);

create policy "documents_select_own" on public.documents
  for select using (auth.uid() = created_by or created_by is null);
create policy "documents_insert_own" on public.documents
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "documents_update_own" on public.documents
  for update using (auth.uid() = created_by or created_by is null);

create policy "providers_select_shared" on public.providers
  for select using (auth.uid() = created_by or created_by is null);
create policy "providers_insert_shared" on public.providers
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "providers_update_shared" on public.providers
  for update using (auth.uid() = created_by or created_by is null);

create policy "insurance_select_shared" on public.insurance
  for select using (auth.uid() = created_by or created_by is null);
create policy "insurance_insert_shared" on public.insurance
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "insurance_update_shared" on public.insurance
  for update using (auth.uid() = created_by or created_by is null);

create policy "messages_select_shared" on public.messages
  for select using (auth.uid() = created_by or created_by is null);
create policy "messages_insert_shared" on public.messages
  for insert with check (auth.uid() = created_by or created_by is null);
create policy "messages_update_shared" on public.messages
  for update using (auth.uid() = created_by or created_by is null);

create or replace function public.create_patient_workflow_enrollment(
  first_name_input text,
  last_name_input text,
  date_of_birth_input date,
  phone_input text,
  email_input text,
  address_input text,
  insurance_provider_input text,
  member_id_input text,
  group_number_input text,
  provider_name_input text,
  clinic_name_input text,
  provider_npi_input text,
  provider_phone_input text,
  medication_name_input text,
  diagnosis_input text,
  icd10_code_input text,
  dose_input text,
  hipaa_consent_input boolean,
  enrollment_confirmed_input boolean,
  status_input text,
  initial_message_input text
)
returns uuid
language plpgsql
security invoker
as $$
declare
  new_patient_id uuid;
begin
  insert into public.providers (
    created_by,
    name,
    clinic_name,
    phone,
    npi
  )
  values (
    null,
    provider_name_input,
    clinic_name_input,
    provider_phone_input,
    provider_npi_input
  );

  insert into public.insurance (
    created_by,
    provider_name,
    member_id,
    group_number
  )
  values (
    null,
    insurance_provider_input,
    member_id_input,
    group_number_input
  );

  insert into public.patients (
    created_by,
    name,
    first_name,
    last_name,
    date_of_birth,
    phone,
    email,
    address,
    insurance_provider,
    member_id,
    group_number,
    provider_name,
    clinic_name,
    provider_npi,
    provider_phone,
    hipaa_consent,
    enrollment_confirmed,
    status
  )
  values (
    null,
    concat_ws(' ', first_name_input, last_name_input),
    first_name_input,
    last_name_input,
    date_of_birth_input,
    phone_input,
    email_input,
    address_input,
    insurance_provider_input,
    member_id_input,
    group_number_input,
    provider_name_input,
    clinic_name_input,
    provider_npi_input,
    provider_phone_input,
    hipaa_consent_input,
    enrollment_confirmed_input,
    status_input
  )
  returning id into new_patient_id;

  insert into public.prescriptions (
    created_by,
    patient_id,
    medication_name,
    diagnosis,
    icd10_code,
    dose,
    provider_name,
    status
  )
  values (
    null,
    new_patient_id,
    medication_name_input,
    diagnosis_input,
    icd10_code_input,
    coalesce(nullif(dose_input, ''), 'Dose pending confirmation'),
    provider_name_input,
    'pending_review'
  );

  insert into public.messages (
    created_by,
    patient_id,
    sender_role,
    content
  )
  values (
    null,
    new_patient_id,
    'staff',
    initial_message_input
  );

  return new_patient_id;
end;
$$;
