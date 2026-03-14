import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

function formatStatus(status: string): string {
  const map: Record<string, string> = {
    pending_review: "Pending Review",
    benefits_verification: "Benefits Verification",
    approved: "Approved",
  };
  return map[status] ?? status;
}

function toneForStatus(status: string): "success" | "warning" | "info" | "default" {
  const normalized = status.toLowerCase();
  if (normalized.includes("approved")) return "success";
  if (normalized.includes("pending") || normalized.includes("review")) return "warning";
  if (normalized.includes("verification") || normalized.includes("benefits")) return "info";
  return "default";
}

export type PrescriptionRow = {
  patientId: string;
  patientName: string;
  medicationName: string;
  providerName: string | null;
  status: string;
};

export function PrescriptionsTable({ rows }: { rows: PrescriptionRow[] }) {
  if (rows.length === 0) {
    return (
      <Card className="p-8">
        <h3 className="text-lg font-semibold text-ink dark:text-[#f1f5f9]">No prescriptions yet</h3>
        <p className="mt-2 max-w-xl text-sm text-slate dark:text-[#cbd5e1]">
          Prescriptions will appear here once patients are enrolled and medication is recorded. Open a patient profile to add prescriptions and approve them.
        </p>
      </Card>
    );
  }

  const columns = ["Medication", "Patient", "Provider", "Status"];

  return (
    <div className="space-y-3">
      <div className="space-y-3 sm:hidden">
        {rows.map((row, index) => (
          <Link href={`/patients/${row.patientId}`} key={`${row.patientId}-${row.medicationName}-${index}`}>
            <Card className="p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/60" tone="muted">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Medication</span>
                  <span className="text-right text-sm font-medium text-ink dark:text-[#f1f5f9]">{row.medicationName}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Patient</span>
                  <span className="text-right text-sm text-brand dark:text-accent">{row.patientName}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Provider</span>
                  <span className="text-right text-sm text-ink dark:text-[#f1f5f9]">{row.providerName ?? "—"}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted dark:text-[#94a3b8]">Status</span>
                  <Badge tone={toneForStatus(row.status)}>{formatStatus(row.status)}</Badge>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <Card className="hidden overflow-hidden sm:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/80">
              <tr>
                {columns.map((column) => (
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate dark:text-[#94a3b8]"
                    key={column}
                    scope="col"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-white/[0.12]">
              {rows.map((row, index) => (
                <tr
                  className="bg-white/70 transition-colors hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-700/60"
                  key={`${row.patientId}-${row.medicationName}-${index}`}
                >
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-ink dark:text-[#f1f5f9]">
                    {row.medicationName}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm">
                    <Link
                      className="font-medium text-brand hover:underline dark:text-accent"
                      href={`/patients/${row.patientId}`}
                    >
                      {row.patientName}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-ink dark:text-[#f1f5f9]">
                    {row.providerName ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-sm">
                    <Badge tone={toneForStatus(row.status)}>{formatStatus(row.status)}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
