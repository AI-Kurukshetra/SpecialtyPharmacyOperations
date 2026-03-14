alter table public.patients
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists address text,
  add column if not exists member_id text,
  add column if not exists group_number text,
  add column if not exists provider_name text,
  add column if not exists clinic_name text,
  add column if not exists provider_npi text,
  add column if not exists hipaa_consent boolean not null default false,
  add column if not exists enrollment_confirmed boolean not null default false;

alter table public.prescriptions
  add column if not exists diagnosis text,
  add column if not exists icd10_code text,
  add column if not exists dose text;

create or replace function public.create_patient_enrollment(
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
  medication_name_input text,
  diagnosis_input text,
  icd10_code_input text,
  dose_input text,
  hipaa_consent_input boolean,
  enrollment_confirmed_input boolean
)
returns uuid
language plpgsql
security invoker
as $$
declare
  new_patient_id uuid;
begin
  insert into public.patients (
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
    hipaa_consent,
    enrollment_confirmed
  )
  values (
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
    hipaa_consent_input,
    enrollment_confirmed_input
  )
  returning id into new_patient_id;

  insert into public.prescriptions (
    patient_id,
    medication_name,
    diagnosis,
    icd10_code,
    dose,
    provider_name
  )
  values (
    new_patient_id,
    medication_name_input,
    diagnosis_input,
    icd10_code_input,
    dose_input,
    provider_name_input
  );

  return new_patient_id;
end;
$$;
