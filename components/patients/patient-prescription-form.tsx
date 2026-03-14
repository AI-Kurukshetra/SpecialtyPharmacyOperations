"use client";

import { useActionState } from "react";

import { createPrescriptionForPatient } from "@/app/actions/patients";
import { initialPatientFormState } from "@/lib/form-states";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-error dark:text-rose-300">{message}</p>;
}

export function PatientPrescriptionForm({
  patientId,
  providerName,
}: {
  patientId: string;
  providerName?: string | null;
}) {
  const boundAction = createPrescriptionForPatient.bind(null, patientId);
  const [state, formAction] = useActionState(boundAction, initialPatientFormState);
  const safeState = state ?? initialPatientFormState;
  const values = safeState.values ?? {};
  const errors = safeState.fieldErrors ?? {};

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Add prescription</h2>
        <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
          Create another prescription record for this patient without leaving the detail page.
        </p>
      </div>

      <form action={formAction} className="space-y-4">
        {safeState.message ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
            role="alert"
          >
            {safeState.message}
          </div>
        ) : null}

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
        <div className="grid gap-4 sm:grid-cols-2">
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
        <div>
          <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="provider_name">
            Provider name
          </label>
          <Input defaultValue={values.provider_name ?? providerName ?? ""} id="provider_name" name="provider_name" required />
          <FieldError message={errors.provider_name} />
        </div>

        <SubmitButton idleText="Add prescription" pendingText="Adding prescription..." />
      </form>
    </Card>
  );
}
