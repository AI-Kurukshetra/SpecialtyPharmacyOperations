"use client";

import Link from "next/link";
import { useActionState, useRef } from "react";

import { submitPublicEnrollment } from "@/app/actions/workflow";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import {
  fillDemoEnrollmentForm,
  getRandomDemoEnrollment,
} from "@/lib/demo-enrollment-data";
import { initialWorkflowFormState } from "@/lib/form-states";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-error dark:text-rose-300">{message}</p>;
}

export function PublicEnrollmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const lastDemoIdRef = useRef<string | undefined>(undefined);
  const [state, formAction] = useActionState(
    submitPublicEnrollment,
    initialWorkflowFormState,
  );
  const safeState = state ?? initialWorkflowFormState;
  const values = safeState.values;
  const checks = safeState.checks;
  const errors = safeState.fieldErrors;

  function fillDemoEnrollment() {
    const form = formRef.current;

    if (!form) return;

    const demoProfile = getRandomDemoEnrollment(lastDemoIdRef.current);

    fillDemoEnrollmentForm(form, demoProfile);
    lastDemoIdRef.current = demoProfile.id;
  }

  return (
    <div className="mx-auto max-w-[1100px] space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
          Patient Enrollment
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-ink dark:text-[#f8fafc]">
          Start your specialty treatment journey
        </h1>
        <p className="mt-4 text-base text-slate dark:text-[#cbd5e1]">
          Submit your treatment information securely so the pharmacy team can begin insurance verification, prior authorization, and medication onboarding.
        </p>
      </div>

      <form action={formAction} className="space-y-6" ref={formRef}>
        {safeState.message ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300" role="alert">
            {safeState.message}
          </div>
        ) : null}

        <Card className="p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Patient Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="first_name">First name</label><Input defaultValue={values.first_name} id="first_name" name="first_name" required /><FieldError message={errors.first_name} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="last_name">Last name</label><Input defaultValue={values.last_name} id="last_name" name="last_name" required /><FieldError message={errors.last_name} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="date_of_birth">Date of birth</label><Input defaultValue={values.date_of_birth} id="date_of_birth" name="date_of_birth" required type="date" /><FieldError message={errors.date_of_birth} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="phone">Phone</label><Input defaultValue={values.phone} id="phone" name="phone" required /><FieldError message={errors.phone} /></div>
            <div className="md:col-span-2"><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="email">Email</label><Input defaultValue={values.email} id="email" name="email" required type="email" /><FieldError message={errors.email} /></div>
            <div className="md:col-span-2"><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="address">Address</label><Textarea defaultValue={values.address} id="address" name="address" required /><FieldError message={errors.address} /></div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Insurance Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="insurance_provider">Insurance provider</label><Input defaultValue={values.insurance_provider} id="insurance_provider" name="insurance_provider" required /><FieldError message={errors.insurance_provider} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="member_id">Member ID</label><Input defaultValue={values.member_id} id="member_id" name="member_id" required /><FieldError message={errors.member_id} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="group_number">Group number</label><Input defaultValue={values.group_number} id="group_number" name="group_number" required /><FieldError message={errors.group_number} /></div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Provider Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="provider_name">Prescribing doctor</label><Input defaultValue={values.provider_name} id="provider_name" name="provider_name" required /><FieldError message={errors.provider_name} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="clinic_name">Clinic name</label><Input defaultValue={values.clinic_name} id="clinic_name" name="clinic_name" required /><FieldError message={errors.clinic_name} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="provider_phone">Provider phone</label><Input defaultValue={values.provider_phone} id="provider_phone" name="provider_phone" required /><FieldError message={errors.provider_phone} /></div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Medication Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="medication_name">Medication name</label><Input defaultValue={values.medication_name} id="medication_name" name="medication_name" required /><FieldError message={errors.medication_name} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="diagnosis">Diagnosis</label><Input defaultValue={values.diagnosis} id="diagnosis" name="diagnosis" required /><FieldError message={errors.diagnosis} /></div>
            <div><label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="icd10_code">ICD10 code</label><Input defaultValue={values.icd10_code} id="icd10_code" name="icd10_code" required /><FieldError message={errors.icd10_code} /></div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Consent</h2>
          <div className="mt-5 space-y-4">
            <label className="flex items-start gap-3 rounded-2xl border border-border/80 bg-slate-50/70 p-4 dark:border-white/[0.10] dark:bg-white/[0.04]">
              <input className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-[var(--rx-focus)]" defaultChecked={checks.hipaa_consent} name="hipaa_consent" type="checkbox" />
              <span>
                <span className="block text-sm font-medium text-ink dark:text-[#f8fafc]">HIPAA consent obtained</span>
                <span className="mt-1 block text-sm text-slate dark:text-[#cbd5e1]">I authorize the pharmacy team to process this treatment enrollment.</span>
                <FieldError message={errors.hipaa_consent} />
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-border/80 bg-slate-50/70 p-4 dark:border-white/[0.10] dark:bg-white/[0.04]">
              <input className="mt-1 h-4 w-4 rounded border-border text-brand focus:ring-[var(--rx-focus)]" defaultChecked={checks.enrollment_confirmed} name="enrollment_confirmed" type="checkbox" />
              <span>
                <span className="block text-sm font-medium text-ink dark:text-[#f8fafc]">Treatment enrollment confirmed</span>
                <span className="mt-1 block text-sm text-slate dark:text-[#cbd5e1]">I confirm the information above is correct and ready for review.</span>
                <FieldError message={errors.enrollment_confirmed} />
              </span>
            </label>
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-border/80 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-[#f8fafc] dark:hover:bg-white/[0.08]"
            onClick={fillDemoEnrollment}
            type="button"
          >
            Load random demo data
          </button>
          <Link className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-slate-100 px-5 py-3 text-sm font-medium text-ink transition hover:bg-slate-200 dark:bg-white/[0.10] dark:text-[#f8fafc] dark:hover:bg-white/[0.15]" href="/">
            Back
          </Link>
          <div className="sm:min-w-[220px]">
            <SubmitButton idleText="Submit enrollment" pendingText="Submitting..." />
          </div>
        </div>
      </form>
    </div>
  );
}
