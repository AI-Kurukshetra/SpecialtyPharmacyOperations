"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type NewEnrollmentOption = { id: string; name: string };

export type PatientEnrollmentData = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  insurance_provider: string | null;
  member_id: string | null;
  group_number: string | null;
  provider_name: string | null;
  clinic_name: string | null;
  provider_npi: string | null;
  provider_phone: string | null;
  hipaa_consent: boolean;
  enrollment_confirmed: boolean;
  medication_name: string | null;
  diagnosis: string | null;
  icd10_code: string | null;
  dose: string | null;
};

export async function getNewEnrollmentPatientOptions(): Promise<NewEnrollmentOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("patients")
    .select("id, name")
    .eq("status", "Enrollment Submitted")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []).map((p) => ({ id: p.id, name: p.name ?? `${p.id}` }));
}

export async function getPatientEnrollmentData(
  patientId: string,
): Promise<PatientEnrollmentData | null> {
  const supabase = await createClient();
  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select(
      "id, first_name, last_name, date_of_birth, phone, email, address, insurance_provider, member_id, group_number, provider_name, clinic_name, provider_npi, provider_phone, hipaa_consent, enrollment_confirmed",
    )
    .eq("id", patientId)
    .single();

  if (patientError || !patient) return null;

  const { data: prescription } = await supabase
    .from("prescriptions")
    .select("medication_name, diagnosis, icd10_code, dose")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const dob = patient.date_of_birth;
  return {
    id: patient.id,
    first_name: patient.first_name ?? "",
    last_name: patient.last_name ?? "",
    date_of_birth: dob ? (typeof dob === "string" ? dob : dob.toISOString().slice(0, 10)) : "",
    phone: patient.phone ?? "",
    email: patient.email ?? "",
    address: patient.address ?? "",
    insurance_provider: patient.insurance_provider ?? "",
    member_id: patient.member_id ?? "",
    group_number: patient.group_number ?? "",
    provider_name: patient.provider_name ?? "",
    clinic_name: patient.clinic_name ?? "",
    provider_npi: patient.provider_npi ?? "",
    provider_phone: patient.provider_phone ?? "",
    hipaa_consent: patient.hipaa_consent ?? false,
    enrollment_confirmed: patient.enrollment_confirmed ?? false,
    medication_name: prescription?.medication_name ?? "",
    diagnosis: prescription?.diagnosis ?? "",
    icd10_code: prescription?.icd10_code ?? "",
    dose: prescription?.dose ?? "",
  };
}

export type PatientFormState = {
  message: string;
  fieldErrors: Record<string, string>;
  values: Record<string, string>;
  checks: Record<string, boolean>;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getCheckbox(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

function isValidNpi(npi: string) {
  return /^\d{10}$/.test(npi);
}

function isValidIcd10(code: string) {
  return /^[A-TV-Z][0-9][0-9A-Z](\.[0-9A-Z]{1,4})?$/.test(code);
}

function buildPatientValues(formData: FormData) {
  return {
    first_name: getString(formData, "first_name"),
    last_name: getString(formData, "last_name"),
    date_of_birth: getString(formData, "date_of_birth"),
    phone: getString(formData, "phone"),
    email: getString(formData, "email"),
    address: getString(formData, "address"),
    insurance_provider: getString(formData, "insurance_provider"),
    member_id: getString(formData, "member_id"),
    group_number: getString(formData, "group_number"),
    provider_name: getString(formData, "provider_name"),
    clinic_name: getString(formData, "clinic_name"),
    provider_npi: getString(formData, "provider_npi"),
    provider_phone: getString(formData, "provider_phone"),
    medication_name: getString(formData, "medication_name"),
    diagnosis: getString(formData, "diagnosis"),
    icd10_code: getString(formData, "icd10_code").toUpperCase(),
    dose: getString(formData, "dose"),
  };
}

function validatePatientValues(
  values: ReturnType<typeof buildPatientValues>,
  checks: Record<string, boolean>,
) {
  const fieldErrors: Record<string, string> = {};

  if (!values.first_name) fieldErrors.first_name = "First name is required.";
  if (!values.last_name) fieldErrors.last_name = "Last name is required.";
  if (!values.date_of_birth) fieldErrors.date_of_birth = "Date of birth is required.";
  if (!values.phone) fieldErrors.phone = "Phone number is required.";
  if (values.phone && !isValidPhone(values.phone)) fieldErrors.phone = "Enter a valid phone number.";
  if (!values.email) fieldErrors.email = "Email is required.";
  if (values.email && !isValidEmail(values.email)) fieldErrors.email = "Enter a valid email address.";
  if (!values.address) fieldErrors.address = "Address is required.";
  if (!values.insurance_provider) fieldErrors.insurance_provider = "Insurance provider is required.";
  if (!values.member_id) fieldErrors.member_id = "Member ID is required.";
  if (!values.group_number) fieldErrors.group_number = "Group number is required.";
  if (!values.provider_name) fieldErrors.provider_name = "Provider name is required.";
  if (!values.clinic_name) fieldErrors.clinic_name = "Clinic name is required.";
  if (!values.provider_npi) fieldErrors.provider_npi = "Provider NPI is required.";
  if (values.provider_npi && !isValidNpi(values.provider_npi)) fieldErrors.provider_npi = "NPI must be 10 digits.";
  if (!values.provider_phone) fieldErrors.provider_phone = "Provider phone is required.";
  if (values.provider_phone && !isValidPhone(values.provider_phone)) fieldErrors.provider_phone = "Enter a valid provider phone number.";
  if (!values.medication_name) fieldErrors.medication_name = "Medication name is required.";
  if (!values.diagnosis) fieldErrors.diagnosis = "Diagnosis is required.";
  if (!values.icd10_code) fieldErrors.icd10_code = "ICD10 code is required.";
  if (values.icd10_code && !isValidIcd10(values.icd10_code)) fieldErrors.icd10_code = "Enter a valid ICD10 code.";
  if (!values.dose) fieldErrors.dose = "Dose is required.";
  if (!checks.hipaa_consent) fieldErrors.hipaa_consent = "HIPAA consent is required.";
  if (!checks.enrollment_confirmed) fieldErrors.enrollment_confirmed = "Enrollment confirmation is required.";

  return fieldErrors;
}

export async function createPatientEnrollment(
  _prevState: PatientFormState,
  formData: FormData,
) {
  const existingPatientId = getString(formData, "patient_id");
  if (existingPatientId) {
    return updatePatientEnrollment(existingPatientId, formData);
  }

  const values = buildPatientValues(formData);
  const checks = {
    hipaa_consent: getCheckbox(formData, "hipaa_consent"),
    enrollment_confirmed: getCheckbox(formData, "enrollment_confirmed"),
  };
  const fieldErrors = validatePatientValues(values, checks);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "Review the highlighted fields and try again.",
      fieldErrors,
      values,
      checks,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_patient_workflow_enrollment", {
    address_input: values.address,
    clinic_name_input: values.clinic_name,
    date_of_birth_input: values.date_of_birth,
    diagnosis_input: values.diagnosis,
    dose_input: values.dose,
    email_input: values.email,
    enrollment_confirmed_input: checks.enrollment_confirmed,
    first_name_input: values.first_name,
    group_number_input: values.group_number,
    hipaa_consent_input: checks.hipaa_consent,
    icd10_code_input: values.icd10_code,
    initial_message_input: "Your enrollment has been created in RxConnect. A pharmacy operations team member will continue processing.",
    insurance_provider_input: values.insurance_provider,
    last_name_input: values.last_name,
    medication_name_input: values.medication_name,
    member_id_input: values.member_id,
    phone_input: values.phone,
    provider_name_input: values.provider_name,
    provider_npi_input: values.provider_npi,
    provider_phone_input: values.provider_phone,
    status_input: "Enrollment Submitted",
  });

  if (error || !data) {
    return {
      message: error?.message ?? "Unable to save the patient enrollment right now.",
      fieldErrors: {},
      values,
      checks,
    };
  }

  revalidatePath("/patients");
  revalidatePath("/dashboard");
  redirect(`/patients/${data}?type=success&message=Patient%20enrollment%20saved.`);
}

export async function updatePatientEnrollment(
  patientId: string,
  formData: FormData,
): Promise<PatientFormState> {
  const values = buildPatientValues(formData);
  const checks = {
    hipaa_consent: getCheckbox(formData, "hipaa_consent"),
    enrollment_confirmed: getCheckbox(formData, "enrollment_confirmed"),
  };
  const fieldErrors = validatePatientValues(values, checks);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "Review the highlighted fields and try again.",
      fieldErrors,
      values,
      checks,
    };
  }

  const supabase = await createClient();
  const name = [values.first_name, values.last_name].filter(Boolean).join(" ") || "Patient";
  const { error: patientError } = await supabase
    .from("patients")
    .update({
      name,
      first_name: values.first_name,
      last_name: values.last_name,
      date_of_birth: values.date_of_birth || null,
      phone: values.phone,
      email: values.email,
      address: values.address,
      insurance_provider: values.insurance_provider,
      member_id: values.member_id,
      group_number: values.group_number,
      provider_name: values.provider_name,
      clinic_name: values.clinic_name,
      provider_npi: values.provider_npi,
      provider_phone: values.provider_phone,
      hipaa_consent: checks.hipaa_consent,
      enrollment_confirmed: checks.enrollment_confirmed,
    })
    .eq("id", patientId);

  if (patientError) {
    return {
      message: patientError.message,
      fieldErrors: {},
      values,
      checks,
    };
  }

  const { data: existingRx } = await supabase
    .from("prescriptions")
    .select("id")
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingRx?.id) {
    await supabase
      .from("prescriptions")
      .update({
        medication_name: values.medication_name,
        diagnosis: values.diagnosis,
        icd10_code: values.icd10_code,
        dose: values.dose,
        provider_name: values.provider_name,
      })
      .eq("id", existingRx.id);
  } else {
    await supabase.from("prescriptions").insert({
      created_by: null,
      patient_id: patientId,
      medication_name: values.medication_name,
      diagnosis: values.diagnosis,
      icd10_code: values.icd10_code,
      dose: values.dose,
      provider_name: values.provider_name,
      status: "pending_review",
    });
  }

  revalidatePath("/patients");
  revalidatePath("/dashboard");
  revalidatePath(`/patients/${patientId}`);
  redirect(`/patients/${patientId}?type=success&message=Enrollment%20updated%20and%20saved%20for%20further%20processing.`);
}

function buildPrescriptionValues(formData: FormData) {
  return {
    medication_name: getString(formData, "medication_name"),
    diagnosis: getString(formData, "diagnosis"),
    icd10_code: getString(formData, "icd10_code").toUpperCase(),
    dose: getString(formData, "dose"),
    provider_name: getString(formData, "provider_name"),
  };
}

export async function createPrescriptionForPatient(
  patientId: string,
  _prevState: PatientFormState,
  formData: FormData,
) {
  const values = buildPrescriptionValues(formData);
  const fieldErrors: Record<string, string> = {};

  if (!values.medication_name) fieldErrors.medication_name = "Medication name is required.";
  if (!values.diagnosis) fieldErrors.diagnosis = "Diagnosis is required.";
  if (!values.icd10_code) fieldErrors.icd10_code = "ICD10 code is required.";
  if (values.icd10_code && !isValidIcd10(values.icd10_code)) fieldErrors.icd10_code = "Enter a valid ICD10 code.";
  if (!values.dose) fieldErrors.dose = "Dose is required.";
  if (!values.provider_name) fieldErrors.provider_name = "Provider name is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "Review the prescription fields and try again.",
      fieldErrors,
      values,
      checks: {},
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("prescriptions").insert({
    patient_id: patientId,
    medication_name: values.medication_name,
    diagnosis: values.diagnosis,
    icd10_code: values.icd10_code,
    dose: values.dose,
    provider_name: values.provider_name,
  });

  if (error) {
    return {
      message: error.message,
      fieldErrors: {},
      values,
      checks: {},
    };
  }

  revalidatePath(`/patients/${patientId}`);
  revalidatePath("/patients");
  redirect(`/patients/${patientId}?type=success&message=Prescription%20added%20successfully.`);
}
