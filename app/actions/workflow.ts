"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clearPatientSessionId, setPatientSessionId } from "@/lib/patient-session";
import { createClient } from "@/lib/supabase/server";
import type { ActionFormState } from "@/lib/form-states";

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
  return phone.replace(/\D/g, "").length >= 10;
}

function isValidIcd10(code: string) {
  return /^[A-TV-Z][0-9][0-9A-Z](\.[0-9A-Z]{1,4})?$/.test(code);
}

function buildPublicEnrollmentValues(formData: FormData) {
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
    provider_phone: getString(formData, "provider_phone"),
    medication_name: getString(formData, "medication_name"),
    diagnosis: getString(formData, "diagnosis"),
    icd10_code: getString(formData, "icd10_code").toUpperCase(),
  };
}

export async function submitPublicEnrollment(
  _prevState: ActionFormState,
  formData: FormData,
) {
  const values = buildPublicEnrollmentValues(formData);
  const checks = {
    hipaa_consent: getCheckbox(formData, "hipaa_consent"),
    enrollment_confirmed: getCheckbox(formData, "enrollment_confirmed"),
  };
  const fieldErrors: Record<string, string> = {};

  if (!values.first_name) fieldErrors.first_name = "First name is required.";
  if (!values.last_name) fieldErrors.last_name = "Last name is required.";
  if (!values.date_of_birth) fieldErrors.date_of_birth = "Date of birth is required.";
  if (!values.phone || !isValidPhone(values.phone)) fieldErrors.phone = "Enter a valid phone number.";
  if (!values.email || !isValidEmail(values.email)) fieldErrors.email = "Enter a valid email address.";
  if (!values.address) fieldErrors.address = "Address is required.";
  if (!values.insurance_provider) fieldErrors.insurance_provider = "Insurance provider is required.";
  if (!values.member_id) fieldErrors.member_id = "Member ID is required.";
  if (!values.group_number) fieldErrors.group_number = "Group number is required.";
  if (!values.provider_name) fieldErrors.provider_name = "Prescribing doctor is required.";
  if (!values.clinic_name) fieldErrors.clinic_name = "Clinic name is required.";
  if (!values.provider_phone || !isValidPhone(values.provider_phone)) fieldErrors.provider_phone = "Enter a valid provider phone number.";
  if (!values.medication_name) fieldErrors.medication_name = "Medication name is required.";
  if (!values.diagnosis) fieldErrors.diagnosis = "Diagnosis is required.";
  if (!values.icd10_code || !isValidIcd10(values.icd10_code)) fieldErrors.icd10_code = "Enter a valid ICD10 code.";
  if (!checks.hipaa_consent) fieldErrors.hipaa_consent = "HIPAA consent is required.";
  if (!checks.enrollment_confirmed) fieldErrors.enrollment_confirmed = "Enrollment confirmation is required.";

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
    dose_input: "",
    email_input: values.email,
    enrollment_confirmed_input: checks.enrollment_confirmed,
    first_name_input: values.first_name,
    group_number_input: values.group_number,
    hipaa_consent_input: checks.hipaa_consent,
    icd10_code_input: values.icd10_code,
    initial_message_input: "Your enrollment has been received. A pharmacy team member will review your case shortly.",
    insurance_provider_input: values.insurance_provider,
    last_name_input: values.last_name,
    medication_name_input: values.medication_name,
    member_id_input: values.member_id,
    phone_input: values.phone,
    provider_name_input: values.provider_name,
    provider_npi_input: "",
    provider_phone_input: values.provider_phone,
    status_input: "Enrollment Submitted",
  });

  if (error || !data) {
    return {
      message: error?.message ?? "Unable to submit enrollment right now.",
      fieldErrors: {},
      values,
      checks,
    };
  }

  await setPatientSessionId(data);
  revalidatePath("/dashboard");
  revalidatePath("/patients");
  redirect("/patient/dashboard?type=success&message=Enrollment%20submitted%20successfully.");
}

export async function patientLogin(
  _prevState: ActionFormState,
  formData: FormData,
) {
  const email = getString(formData, "email");
  const dateOfBirth = getString(formData, "date_of_birth");
  const values = { email, date_of_birth: dateOfBirth };
  const fieldErrors: Record<string, string> = {};

  if (!email || !isValidEmail(email)) fieldErrors.email = "Enter a valid email address.";
  if (!dateOfBirth) fieldErrors.date_of_birth = "Date of birth is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "Enter the same email and date of birth used during enrollment.",
      fieldErrors,
      values,
      checks: {},
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("patients")
    .select("id")
    .eq("email", email)
    .eq("date_of_birth", dateOfBirth)
    .maybeSingle();

  if (error || !data) {
    return {
      message: "No patient enrollment matched those credentials.",
      fieldErrors: {},
      values,
      checks: {},
    };
  }

  await setPatientSessionId(data.id);
  redirect("/patient/dashboard");
}

export async function patientLogout() {
  await clearPatientSessionId();
  redirect("/?type=success&message=Signed%20out%20successfully.");
}

function nextStepMessage(status: string) {
  switch (status) {
    case "Insurance Verification":
      return "Your enrollment has been reviewed. Our team is verifying benefits and coverage.";
    case "Prior Authorization Pending":
      return "Your prior authorization has been submitted to the payer.";
    case "Pending Docs":
      return "Additional documentation is needed before the payer can continue review.";
    case "Approved":
      return "Coverage has been approved and the pharmacy team is preparing next steps.";
    case "Rejected":
      return "The payer has rejected the request. Our team will review available options.";
    case "Ready for Delivery":
      return "Your medication is ready and our team will coordinate delivery.";
    default:
      return "Your enrollment has been received. A pharmacy team member will review your case shortly.";
  }
}

export async function updatePatientWorkflowStatus(patientId: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("patients")
    .update({ status })
    .eq("id", patientId);

  if (error) {
    redirect(`/patients/${patientId}?type=error&message=${encodeURIComponent(error.message)}`);
  }

  await supabase.from("messages").insert({
    created_by: null,
    patient_id: patientId,
    sender_role: "staff",
    content: nextStepMessage(status),
  });

  revalidatePath(`/patients/${patientId}`);
  revalidatePath("/patient/dashboard");
  revalidatePath("/dashboard");
  redirect(`/patients/${patientId}?type=success&message=${encodeURIComponent(`Patient status updated to ${status}.`)}`);
}

export async function submitPriorAuthorization(patientId: string) {
  const supabase = await createClient();
  const [{ data: patient }, { data: prescription, error: prescriptionError }] = await Promise.all([
    supabase.from("patients").select("insurance_provider").eq("id", patientId).single(),
    supabase
      .from("prescriptions")
      .select("id")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (prescriptionError || !prescription) {
    redirect(`/patients/${patientId}?type=error&message=Add%20a%20prescription%20before%20submitting%20prior%20authorization.`);
  }

  const { error } = await supabase.from("prior_authorizations").insert({
    created_by: null,
    prescription_id: prescription.id,
    payer: patient?.insurance_provider ?? "Unknown payer",
    status: "submitted",
    submitted_at: new Date().toISOString(),
  });

  if (error) {
    redirect(`/patients/${patientId}?type=error&message=${encodeURIComponent(error.message)}`);
  }

  await supabase.from("patients").update({ status: "Prior Authorization Pending" }).eq("id", patientId);
  await supabase.from("messages").insert({
    created_by: null,
    patient_id: patientId,
    sender_role: "staff",
    content: nextStepMessage("Prior Authorization Pending"),
  });

  revalidatePath(`/patients/${patientId}`);
  revalidatePath("/patient/dashboard");
  revalidatePath("/dashboard");
  redirect(`/patients/${patientId}?type=success&message=Prior%20authorization%20submitted.`);
}

export async function assignOperationalTask(patientId: string, formData: FormData) {
  const title = getString(formData, "title");
  const assignedTo = getString(formData, "assigned_to");
  const dueDate = getString(formData, "due_date");

  if (!title || !assignedTo || !dueDate) {
    redirect(`/patients/${patientId}?type=error&message=Task%20title,%20owner,%20and%20due%20date%20are%20required.`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("tasks").insert({
    patient_id: patientId,
    title,
    assigned_to: assignedTo,
    due_date: dueDate,
    status: "open",
  });

  if (error) {
    redirect(`/patients/${patientId}?type=error&message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/patients/${patientId}`);
  revalidatePath("/tasks");
  revalidatePath("/dashboard");
  redirect(`/patients/${patientId}?type=success&message=Operational%20task%20assigned.`);
}

export async function sendPatientMessage(patientId: string, formData: FormData) {
  const content = getString(formData, "content");

  if (!content) {
    redirect(`/patients/${patientId}?type=error&message=Message%20content%20is%20required.`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("messages").insert({
    created_by: null,
    patient_id: patientId,
    sender_role: "staff",
    content,
  });

  if (error) {
    redirect(`/patients/${patientId}?type=error&message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/patients/${patientId}`);
  revalidatePath("/patient/dashboard");
  redirect(`/patients/${patientId}?type=success&message=Patient%20message%20sent.`);
}
