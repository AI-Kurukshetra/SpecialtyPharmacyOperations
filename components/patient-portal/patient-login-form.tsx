"use client";

import Link from "next/link";
import { useActionState } from "react";

import { patientLogin } from "@/app/actions/workflow";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { initialWorkflowFormState } from "@/lib/form-states";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-error dark:text-rose-300">{message}</p>;
}

export function PatientLoginForm({
  message,
  messageType,
}: {
  message?: string;
  messageType?: "success" | "error";
}) {
  const [state, formAction] = useActionState(patientLogin, initialWorkflowFormState);
  const safeState = state ?? initialWorkflowFormState;
  const values = safeState.values ?? {};
  const errors = safeState.fieldErrors ?? {};

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-10 sm:px-6">
      <Card className="w-full p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
          Patient Portal
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink dark:text-[#f8fafc]">Sign in to view your treatment journey</h1>
        <p className="mt-3 text-sm text-slate dark:text-[#cbd5e1]">
          Use the same email and date of birth you entered during enrollment.
        </p>

        {message ? (
          <div
            className={
              messageType === "error"
                ? "mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
                : "mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300"
            }
          >
            {message}
          </div>
        ) : null}
        {safeState.message ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
            {safeState.message}
          </div>
        ) : null}

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="email">Email</label>
            <Input defaultValue={values.email} id="email" name="email" required type="email" />
            <FieldError message={errors.email} />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="date_of_birth">Date of birth</label>
            <Input defaultValue={values.date_of_birth} id="date_of_birth" name="date_of_birth" required type="date" />
            <FieldError message={errors.date_of_birth} />
          </div>
          <SubmitButton idleText="Open patient dashboard" pendingText="Signing in..." />
        </form>

        <div className="mt-6 flex justify-between gap-4 text-sm">
          <Link className="text-brand hover:text-brandDark dark:text-accent" href="/enroll">Need to enroll?</Link>
          <Link className="text-slate hover:text-ink dark:text-[#cbd5e1] dark:hover:text-[#f8fafc]" href="/">Back to RxConnect</Link>
        </div>
      </Card>
    </div>
  );
}
