import { patientLogout } from "@/app/actions/workflow";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FormActionButton } from "@/components/ui/form-action-button";

const steps = [
  "Enrollment Submitted",
  "Insurance Verification",
  "Prior Authorization Pending",
  "Approved",
  "Ready for Delivery",
] as const;

function stepState(currentStatus: string, step: string) {
  const currentIndex = steps.indexOf(
    currentStatus === "Pending Docs" || currentStatus === "Rejected"
      ? "Prior Authorization Pending"
      : (currentStatus as (typeof steps)[number]),
  );
  const stepIndex = steps.indexOf(step as (typeof steps)[number]);

  if (currentStatus === "Rejected" && step === "Prior Authorization Pending") {
    return "current";
  }

  if (currentIndex > stepIndex) return "complete";
  if (currentIndex === stepIndex) return "current";
  return "upcoming";
}

function nextStepText(status: string) {
  switch (status) {
    case "Enrollment Submitted":
      return "Your enrollment has been received. The pharmacy team will verify your insurance next.";
    case "Insurance Verification":
      return "We are checking benefits and eligibility with your insurance provider.";
    case "Prior Authorization Pending":
      return "Your prior authorization has been submitted and is awaiting payer review.";
    case "Pending Docs":
      return "Additional documents are needed. Watch for messages from the pharmacy team.";
    case "Approved":
      return "Your treatment has been approved and is moving toward fulfillment.";
    case "Rejected":
      return "The payer has rejected the request. The pharmacy team will contact you with options.";
    case "Ready for Delivery":
      return "Your medication is ready. Expect outreach to coordinate shipment or pickup.";
    default:
      return "Your care journey is in progress.";
  }
}

export function PatientDashboardView({
  patient,
  prescriptions,
  messages,
}: {
  patient: {
    first_name: string | null;
    last_name: string | null;
    medication_name?: string;
    status: string;
  };
  prescriptions: Array<{
    id: string;
    medication_name: string;
    diagnosis: string | null;
    dose: string | null;
    status: string;
  }>;
  messages: Array<{
    id: string;
    sender_role: string;
    content: string;
    created_at: string;
  }>;
}) {
  const patientName = [patient.first_name, patient.last_name].filter(Boolean).join(" ");
  const currentPrescription = prescriptions[0];

  return (
    <div className="mx-auto max-w-[1200px] space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
            Patient Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-ink dark:text-[#f8fafc]">
            Welcome{patientName ? `, ${patientName}` : ""}
          </h1>
          <p className="mt-3 text-base text-slate dark:text-[#cbd5e1]">
            Track your specialty treatment progress and stay informed about the next steps from the pharmacy team.
          </p>
        </div>
        <form action={patientLogout}>
          <FormActionButton idleText="Sign out" pendingText="Signing out..." variant="ghost" />
        </form>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Treatment journey</h2>
            <Badge tone="info">{patient.status}</Badge>
          </div>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => {
              const state = stepState(patient.status, step);

              return (
                <div className="flex gap-4" key={step}>
                  <div className="flex flex-col items-center">
                    <div
                      className={
                        state === "complete"
                          ? "flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white dark:bg-accent dark:text-[#0f172a]"
                          : state === "current"
                            ? "flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-sm font-semibold text-brand dark:border-accent dark:text-accent"
                            : "flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm font-semibold text-muted dark:border-white/[0.12] dark:text-[#94a3b8]"
                      }
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 ? (
                      <div className="mt-2 h-10 w-px bg-border dark:bg-white/[0.12]" />
                    ) : null}
                  </div>
                  <div className="pt-1">
                    <p className="text-base font-semibold text-ink dark:text-[#f8fafc]">{step}</p>
                    <p className="mt-1 text-sm text-slate dark:text-[#cbd5e1]">
                      {state === "complete" ? "Completed" : state === "current" ? "Current step" : "Upcoming"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5" tone="accent">
            <h2 className="text-lg font-semibold text-ink dark:text-[#f8fafc]">Next steps</h2>
            <p className="mt-3 text-sm text-slate dark:text-[#cbd5e1]">{nextStepText(patient.status)}</p>
          </Card>
          <Card className="p-5" tone="muted">
            <h2 className="text-lg font-semibold text-ink dark:text-[#f8fafc]">Current prescription</h2>
            {currentPrescription ? (
              <div className="mt-3 space-y-2 text-sm text-slate dark:text-[#cbd5e1]">
                <p><span className="font-medium text-ink dark:text-[#f8fafc]">Medication:</span> {currentPrescription.medication_name}</p>
                <p><span className="font-medium text-ink dark:text-[#f8fafc]">Diagnosis:</span> {currentPrescription.diagnosis ?? "Pending"}</p>
                <p><span className="font-medium text-ink dark:text-[#f8fafc]">Dose:</span> {currentPrescription.dose ?? "Pending confirmation"}</p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate dark:text-[#cbd5e1]">No prescription has been added yet.</p>
            )}
          </Card>
        </div>
      </div>

      <Card className="p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Messages from your pharmacy team</h2>
        <div className="mt-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-sm text-slate dark:text-[#cbd5e1]">No messages yet.</p>
          ) : (
            messages.map((message) => (
              <div className="rounded-2xl border border-border/80 p-4 dark:border-white/[0.10]" key={message.id}>
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="info">{message.sender_role}</Badge>
                  <span className="text-xs text-muted dark:text-[#94a3b8]">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(message.created_at))}
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink dark:text-[#f8fafc]">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
