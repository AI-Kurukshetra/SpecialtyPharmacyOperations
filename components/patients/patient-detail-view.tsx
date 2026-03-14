import Link from "next/link";

import {
  assignOperationalTask,
  sendPatientMessage,
  submitPriorAuthorization,
  updatePatientWorkflowStatus,
} from "@/app/actions/workflow";
import { PatientPrescriptionForm } from "@/components/patients/patient-prescription-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { FormActionButton } from "@/components/ui/form-action-button";
import { Input } from "@/components/ui/input";

type PatientDetail = {
  id: string;
  name: string;
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
  status: string;
  created_at: string;
};

type PrescriptionDetail = {
  id: string;
  medication_name: string;
  diagnosis: string | null;
  icd10_code: string | null;
  dose: string | null;
  provider_name: string | null;
  status: string;
  created_at: string;
};

type MessageDetail = {
  id: string;
  sender_role: string;
  content: string;
  created_at: string;
};

type TaskDetail = {
  id: string;
  title: string;
  assigned_to: string | null;
  due_date: string | null;
  status: string;
  created_at: string;
};

function formatDate(value: string | null) {
  if (!value) return "Not provided";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export function PatientDetailView({
  patient,
  prescriptions,
  messages,
  tasks,
  message,
  messageType,
}: {
  patient: PatientDetail;
  prescriptions: PrescriptionDetail[];
  messages: MessageDetail[];
  tasks: TaskDetail[];
  message?: string;
  messageType?: "success" | "error";
}) {
  const patientName =
    patient.first_name && patient.last_name
      ? `${patient.first_name} ${patient.last_name}`
      : patient.name;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
            Patient Profile
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold text-ink dark:text-[#f8fafc]">{patientName}</h1>
            <Badge tone={patient.enrollment_confirmed ? "success" : "warning"}>
              {patient.enrollment_confirmed ? "Enrollment confirmed" : "Pending confirmation"}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
            Review patient intake details, insurance coverage, provider information, and the current prescription list.
          </p>
        </div>
        <Link
          className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-border/80 px-5 py-3 text-sm font-medium text-ink transition hover:bg-slate-50 dark:border-white/[0.10] dark:text-[#f8fafc] dark:hover:bg-white/[0.05]"
          href="/patients"
        >
          Back to patients
        </Link>
      </div>

      {message ? (
        <div
          className={
            messageType === "error"
              ? "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
              : "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300"
          }
          role={messageType === "error" ? "alert" : "status"}
        >
          {message}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
        <div className="space-y-4">
          <Card className="p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Enrollment summary</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Date of birth</p>
                <p className="mt-2 text-sm text-ink dark:text-[#f8fafc]">{formatDate(patient.date_of_birth)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Phone</p>
                <p className="mt-2 text-sm text-ink dark:text-[#f8fafc]">{patient.phone ?? "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Email</p>
                <p className="mt-2 text-sm text-ink dark:text-[#f8fafc]">{patient.email ?? "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Insurance</p>
                <p className="mt-2 text-sm text-ink dark:text-[#f8fafc]">{patient.insurance_provider ?? "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Member ID</p>
                <p className="mt-2 text-sm text-ink dark:text-[#f8fafc]">{patient.member_id ?? "Not provided"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Group number</p>
                <p className="mt-2 text-sm text-ink dark:text-[#f8fafc]">{patient.group_number ?? "Not provided"}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Address</p>
                <p className="mt-2 text-sm text-ink dark:text-[#f8fafc]">{patient.address ?? "Not provided"}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Prescriptions</h2>
                <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
                  Current medications linked to this patient enrollment.
                </p>
              </div>
              <Badge tone="info">{`${prescriptions.length} record${prescriptions.length === 1 ? "" : "s"}`}</Badge>
            </div>
            <div className="mt-5">
              <DataTable
                columns={["Medication", "Diagnosis", "Dose", "Status"]}
                emptyDescription="Add a prescription from the right-side form to begin tracking therapy for this patient."
                emptyTitle="No prescriptions yet"
                rows={prescriptions.map((prescription) => [
                  prescription.medication_name,
                  `${prescription.diagnosis ?? "Diagnosis pending"}${prescription.icd10_code ? ` (${prescription.icd10_code})` : ""}`,
                  prescription.dose ?? "Dose pending",
                  prescription.status.replaceAll("_", " "),
                ])}
              />
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5" tone="muted">
            <h2 className="text-lg font-semibold text-ink dark:text-[#f8fafc]">Prescribing provider</h2>
            <div className="mt-4 space-y-3 text-sm text-slate dark:text-[#cbd5e1]">
              <p><span className="font-medium text-ink dark:text-[#f8fafc]">Provider:</span> {patient.provider_name ?? "Not provided"}</p>
              <p><span className="font-medium text-ink dark:text-[#f8fafc]">Clinic:</span> {patient.clinic_name ?? "Not provided"}</p>
              <p><span className="font-medium text-ink dark:text-[#f8fafc]">NPI:</span> {patient.provider_npi ?? "Not provided"}</p>
              <p><span className="font-medium text-ink dark:text-[#f8fafc]">Phone:</span> {patient.provider_phone ?? "Not provided"}</p>
              <p><span className="font-medium text-ink dark:text-[#f8fafc]">HIPAA:</span> {patient.hipaa_consent ? "Confirmed" : "Missing"}</p>
            </div>
          </Card>
          <Card className="p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Workflow actions</h2>
            <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
              Move this patient through the specialty pharmacy process and keep the patient portal updated.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <form action={updatePatientWorkflowStatus.bind(null, patient.id, "Insurance Verification")}>
                <FormActionButton idleText="Review enrollment" pendingText="Updating..." variant="secondary" />
              </form>
              <form action={submitPriorAuthorization.bind(null, patient.id)}>
                <FormActionButton idleText="Submit prior auth" pendingText="Submitting..." variant="ghost" />
              </form>
              {["Pending Docs", "Approved", "Rejected", "Ready for Delivery"].map((status) => (
                <form action={updatePatientWorkflowStatus.bind(null, patient.id, status)} key={status}>
                  <FormActionButton idleText={status} pendingText="Updating..." variant="subtle" />
                </form>
              ))}
            </div>
          </Card>
          <PatientPrescriptionForm patientId={patient.id} providerName={patient.provider_name} />
          <Card className="p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Assign operational task</h2>
            <form action={assignOperationalTask.bind(null, patient.id)} className="mt-4 space-y-4">
              <Input name="title" placeholder="Follow up with payer" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="assigned_to" placeholder="Assigned staff member" required />
                <Input name="due_date" required type="date" />
              </div>
              <FormActionButton idleText="Assign task" pendingText="Assigning..." variant="secondary" />
            </form>
          </Card>
          <Card className="p-5 sm:p-6">
            <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Message patient</h2>
            <form action={sendPatientMessage.bind(null, patient.id)} className="mt-4 space-y-4">
              <Input name="content" placeholder="Your prior authorization has been submitted and is under review." required />
              <FormActionButton idleText="Send message" pendingText="Sending..." variant="secondary" />
            </form>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Patient messages</h2>
          <div className="mt-4 space-y-3">
            {messages.length === 0 ? (
              <p className="text-sm text-slate dark:text-[#cbd5e1]">No messages yet.</p>
            ) : (
              messages.map((entry) => (
                <div className="rounded-2xl border border-border/80 p-4 dark:border-white/[0.10]" key={entry.id}>
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone="info">{entry.sender_role}</Badge>
                    <span className="text-xs text-muted dark:text-[#94a3b8]">{formatDate(entry.created_at)}</span>
                  </div>
                  <p className="mt-3 text-sm text-ink dark:text-[#f8fafc]">{entry.content}</p>
                </div>
              ))
            )}
          </div>
        </Card>
        <Card className="p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Operational tasks</h2>
          <div className="mt-4 space-y-3">
            {tasks.length === 0 ? (
              <p className="text-sm text-slate dark:text-[#cbd5e1]">No tasks assigned yet.</p>
            ) : (
              tasks.map((task) => (
                <div className="rounded-2xl border border-border/80 p-4 dark:border-white/[0.10]" key={task.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink dark:text-[#f8fafc]">{task.title}</p>
                    <Badge tone={task.status === "completed" ? "success" : "warning"}>{task.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
                    Owner: {task.assigned_to ?? "Unassigned"} | Due: {formatDate(task.due_date)}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
