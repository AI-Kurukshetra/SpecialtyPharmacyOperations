"use client";

import Link from "next/link";
import { type ReactNode, useActionState } from "react";

import { createPatientEnrollment } from "@/app/actions/patients";
import { initialPatientFormState } from "@/lib/form-states";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-error dark:text-rose-300">{message}</p>;
}

function CheckboxField({
  name,
  label,
  description,
  error,
  defaultChecked,
}: {
  name: string;
  label: string;
  description: string;
  error?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-border/80 bg-slate-50/70 p-4 dark:border-white/[0.10] dark:bg-white/[0.04]">
      <input
        className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-[var(--rx-focus)]"
        defaultChecked={defaultChecked}
        name={name}
        type="checkbox"
      />
      <span>
        <span className="block text-sm font-medium text-ink dark:text-[#f8fafc]">{label}</span>
        <span className="mt-1 block text-sm text-slate dark:text-[#cbd5e1]">{description}</span>
        <FieldError message={error} />
      </span>
    </label>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">{title}</h2>
        <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">{description}</p>
      </div>
      {children}
    </Card>
  );
}

export function PatientIntakeForm() {
  const [state, formAction] = useActionState(
    createPatientEnrollment,
    initialPatientFormState,
  );
  const safeState = state ?? initialPatientFormState;
  const values = safeState.values ?? {};
  const checks = safeState.checks ?? {};
  const errors = safeState.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
            Patient Intake
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink dark:text-[#f8fafc]">
            Register a new patient enrollment
          </h1>
          <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
            Capture patient, insurance, provider, and initial medication details in a single workflow.
          </p>
        </div>
        <Link
          className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-border/80 px-5 py-3 text-sm font-medium text-ink transition hover:bg-slate-50 dark:border-white/[0.10] dark:text-[#f8fafc] dark:hover:bg-white/[0.05]"
          href="/patients"
        >
          Back to patients
        </Link>
      </div>

      {safeState.message ? (
        <div
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
          role="alert"
        >
          {safeState.message}
        </div>
      ) : null}

      <Section
        description="Basic demographics and contact details used for onboarding and care coordination."
        title="Patient Information"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="first_name">
              First name
            </label>
            <Input defaultValue={values.first_name} id="first_name" name="first_name" required />
            <FieldError message={errors.first_name} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="last_name">
              Last name
            </label>
            <Input defaultValue={values.last_name} id="last_name" name="last_name" required />
            <FieldError message={errors.last_name} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="date_of_birth">
              Date of birth
            </label>
            <Input defaultValue={values.date_of_birth} id="date_of_birth" name="date_of_birth" required type="date" />
            <FieldError message={errors.date_of_birth} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="phone">
              Phone
            </label>
            <Input defaultValue={values.phone} id="phone" name="phone" placeholder="(555) 123-4567" required />
            <FieldError message={errors.phone} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="email">
              Email
            </label>
            <Input defaultValue={values.email} id="email" name="email" placeholder="patient@example.com" required type="email" />
            <FieldError message={errors.email} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="address">
              Address
            </label>
            <Textarea defaultValue={values.address} id="address" name="address" placeholder="Street, city, state, ZIP" required />
            <FieldError message={errors.address} />
          </div>
        </div>
      </Section>

      <Section
        description="Coverage details needed to start benefits verification and prior authorization work."
        title="Insurance Information"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="insurance_provider">
              Insurance provider
            </label>
            <Input defaultValue={values.insurance_provider} id="insurance_provider" name="insurance_provider" required />
            <FieldError message={errors.insurance_provider} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="member_id">
              Member ID
            </label>
            <Input defaultValue={values.member_id} id="member_id" name="member_id" required />
            <FieldError message={errors.member_id} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="group_number">
              Group number
            </label>
            <Input defaultValue={values.group_number} id="group_number" name="group_number" required />
            <FieldError message={errors.group_number} />
          </div>
        </div>
      </Section>

      <Section
        description="Prescriber and clinic information used for follow-ups and enrollment communication."
        title="Prescribing Provider"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="provider_name">
              Provider name
            </label>
            <Input defaultValue={values.provider_name} id="provider_name" name="provider_name" required />
            <FieldError message={errors.provider_name} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="clinic_name">
              Clinic name
            </label>
            <Input defaultValue={values.clinic_name} id="clinic_name" name="clinic_name" required />
            <FieldError message={errors.clinic_name} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="provider_npi">
              Provider NPI
            </label>
            <Input defaultValue={values.provider_npi} id="provider_npi" inputMode="numeric" name="provider_npi" required />
            <FieldError message={errors.provider_npi} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="provider_phone">
              Provider phone
            </label>
            <Input defaultValue={values.provider_phone} id="provider_phone" name="provider_phone" placeholder="(555) 555-1212" required />
            <FieldError message={errors.provider_phone} />
          </div>
        </div>
      </Section>

      <Section
        description="Capture the first specialty medication enrollment so the patient detail page starts with a real prescription record."
        title="Medication Information"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="medication_name">
              Medication name
            </label>
            <Input defaultValue={values.medication_name} id="medication_name" name="medication_name" required />
            <FieldError message={errors.medication_name} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="diagnosis">
              Diagnosis
            </label>
            <Input defaultValue={values.diagnosis} id="diagnosis" name="diagnosis" required />
            <FieldError message={errors.diagnosis} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="icd10_code">
              ICD10 code
            </label>
            <Input defaultValue={values.icd10_code} id="icd10_code" name="icd10_code" required />
            <FieldError message={errors.icd10_code} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="dose">
              Dose
            </label>
            <Input defaultValue={values.dose} id="dose" name="dose" required />
            <FieldError message={errors.dose} />
          </div>
        </div>
      </Section>

      <Section
        description="Required confirmations before the enrollment can be submitted."
        title="Consent"
      >
        <div className="space-y-4">
          <CheckboxField
            defaultChecked={checks.hipaa_consent}
            description="I confirm the patient has provided HIPAA authorization for the pharmacy team to manage this enrollment."
            error={errors.hipaa_consent}
            label="HIPAA consent obtained"
            name="hipaa_consent"
          />
          <CheckboxField
            defaultChecked={checks.enrollment_confirmed}
            description="I confirm the patient enrollment information has been reviewed and is ready to be saved."
            error={errors.enrollment_confirmed}
            label="Patient enrollment confirmed"
            name="enrollment_confirmed"
          />
        </div>
      </Section>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-slate-100 px-5 py-3 text-sm font-medium text-ink transition hover:bg-slate-200 dark:bg-white/[0.10] dark:text-[#f8fafc] dark:hover:bg-white/[0.15]"
          href="/patients"
        >
          Cancel
        </Link>
        <div className="sm:min-w-[220px]">
          <SubmitButton idleText="Save patient enrollment" pendingText="Saving enrollment..." />
        </div>
      </div>
    </form>
  );
}
