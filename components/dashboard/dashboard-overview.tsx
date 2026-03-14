"use client";

import { startTransition, useState } from "react";

import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { ModalDialog } from "@/components/ui/modal-dialog";
import { Toast } from "@/components/ui/toast";

const stats = [
  {
    label: "New Prescriptions",
    value: "18",
    detail: "Cases awaiting intake review this morning.",
    trend: "+12%",
  },
  {
    label: "Pending Prior Auths",
    value: "07",
    detail: "Requests requiring payer follow-up or documents.",
    trend: "2 urgent",
  },
  {
    label: "Patient Consults",
    value: "05",
    detail: "Scheduled onboarding and clinical check-ins today.",
    trend: "Today",
  },
  {
    label: "Open Tasks",
    value: "23",
    detail: "Operational tasks assigned across the pharmacy team.",
    trend: "4 overdue",
  },
] as const;

export function DashboardOverview() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
              Dashboard
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink dark:text-[#f1f5f9]">
              Specialty pharmacy command center
            </h2>
            <p className="mt-3 text-sm text-slate dark:text-[#cbd5e1]">
              A polished operations view for active cases, payer work, and staff coordination.
              The cards and tables below are structured for later Supabase data wiring.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setOpen(true)} variant="secondary">
              New intake
            </Button>
            <Button onClick={() => setShowToast(true)} variant="ghost">
              Show notification
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              detail={stat.detail}
              key={stat.label}
              label={stat.label}
              trend={stat.trend}
              value={stat.value}
            />
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_360px]">
          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-ink dark:text-[#f1f5f9]">Active case queue</h3>
                <p className="mt-1 text-sm text-slate dark:text-[#cbd5e1]">
                  High-priority cases surfaced for the pharmacy team.
                </p>
              </div>
              <Input className="sm:max-w-[240px]" placeholder="Filter active cases" />
            </div>
            <div className="mt-5">
              <DataTable
                columns={["Patient", "Medication", "Payer", "Status"]}
                rows={[
                  ["Maria Lopez", "Skyrizi", "Blue Shield", "Submitted"],
                  ["David Kim", "Dupixent", "Aetna", "Pending Docs"],
                  ["Alicia Brown", "Humira", "Cigna", "Approved"],
                ]}
              />
            </div>
          </Card>
          <div className="space-y-4">
            <Card className="p-5" tone="accent">
              <h3 className="text-lg font-semibold text-ink dark:text-[#f1f5f9]">Today&apos;s priorities</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate dark:text-[#cbd5e1]">
                <li>Complete intake review for two oncology referrals.</li>
                <li>Submit pending prior authorization attachments.</li>
                <li>Confirm benefits with the payer for urgent starts.</li>
              </ul>
            </Card>
            <Card className="p-5">
              <h3 className="text-lg font-semibold text-ink dark:text-[#f1f5f9]">Recent activity</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate dark:text-[#cbd5e1]">
                <li>Patient intake record created for Maria Lopez.</li>
                <li>Prescription approval posted for adalimumab.</li>
                <li>Task assigned to follow up with Blue Shield.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <ModalDialog
        description="Use this MVP modal pattern for intake forms, quick create flows, and lightweight confirmations."
        onClose={() => setOpen(false)}
        onPrimaryAction={() => {
          setIsSaving(true);
          startTransition(() => {
            setOpen(false);
            setShowToast(true);
            setIsSaving(false);
          });
        }}
        open={open}
        primaryActionLoading={isSaving}
        primaryActionLabel="Save Draft"
        title="Create patient intake"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="Patient name" />
          <Input placeholder="Date of birth" />
          <Input placeholder="Insurance provider" />
          <Input placeholder="Prescribing provider" />
        </div>
      </ModalDialog>

      {showToast ? (
        <div className="fixed bottom-20 right-4 z-40 sm:bottom-4">
          <Toast
            description="A draft intake was prepared for the staff workflow queue."
            onClose={() => setShowToast(false)}
            title="Patient intake saved"
            tone="success"
          />
        </div>
      ) : null}
    </>
  );
}
