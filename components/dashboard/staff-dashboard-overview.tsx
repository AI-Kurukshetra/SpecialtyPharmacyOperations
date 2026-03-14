import Link from "next/link";

import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

type StaffDashboardOverviewProps = {
  enrollmentCount: number;
  priorAuthCount: number;
  activePrescriptionCount: number;
  taskCount: number;
  recentEnrollments: Array<{
    name: string;
    medication: string;
    status: string;
    insurance: string;
  }>;
};

export function StaffDashboardOverview({
  enrollmentCount,
  priorAuthCount,
  activePrescriptionCount,
  taskCount,
  recentEnrollments,
}: StaffDashboardOverviewProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
            Staff Portal
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink dark:text-[#f8fafc]">
            Specialty pharmacy operations dashboard
          </h1>
          <p className="mt-3 text-sm text-slate dark:text-[#cbd5e1]">
            Review new patient enrollments, process payer work, manage prescriptions, and coordinate follow-up tasks from one workspace.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/patients/new">
            <Button variant="secondary">New staff intake</Button>
          </Link>
          <Link href="/patients">
            <Button variant="ghost">Open patient queue</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <StatCard detail="Public patient submissions awaiting review." label="New Patient Enrollments" trend="Queue" value={String(enrollmentCount).padStart(2, "0")} />
        <StatCard detail="Prior authorizations currently in motion." label="Pending Prior Authorizations" trend="PA Work" value={String(priorAuthCount).padStart(2, "0")} />
        <StatCard detail="Active or in-progress therapy records." label="Active Prescriptions" trend="Therapy" value={String(activePrescriptionCount).padStart(2, "0")} />
        <StatCard detail="Operational tasks assigned to the pharmacy team." label="Operational Tasks" trend="Ops" value={String(taskCount).padStart(2, "0")} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_360px]">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-ink dark:text-[#f8fafc]">Newest patient enrollments</h2>
              <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
                Patients most recently submitted through the intake workflow.
              </p>
            </div>
            <Link className="text-sm font-medium text-brand hover:text-brandDark dark:text-accent" href="/patients">
              View all patients
            </Link>
          </div>
          <div className="mt-5">
            <DataTable
              columns={["Patient", "Medication", "Insurance", "Status"]}
              emptyDescription="New public enrollments will appear here after a patient submits the intake form."
              emptyTitle="No enrollments yet"
              rows={recentEnrollments.map((enrollment) => [
                enrollment.name,
                enrollment.medication,
                enrollment.insurance,
                enrollment.status,
              ])}
            />
          </div>
        </Card>
        <div className="space-y-4">
          <Card className="p-5" tone="accent">
            <h2 className="text-lg font-semibold text-ink dark:text-[#f8fafc]">Workflow focus</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate dark:text-[#cbd5e1]">
              <li>Review public submissions and move patients into insurance verification.</li>
              <li>Create prescriptions and submit prior authorizations from the patient record.</li>
              <li>Keep patients informed through status updates and staff messages.</li>
            </ul>
          </Card>
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-ink dark:text-[#f8fafc]">Demo flow</h2>
            <ol className="mt-4 space-y-3 text-sm text-slate dark:text-[#cbd5e1]">
              <li>1. Patient enrolls from the public website.</li>
              <li>2. Staff reviews the intake and updates the workflow status.</li>
              <li>3. Patient checks the portal to see progress and messages.</li>
            </ol>
          </Card>
        </div>
      </div>
    </section>
  );
}
