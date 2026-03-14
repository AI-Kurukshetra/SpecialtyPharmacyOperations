import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type PatientListItem = {
  id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  insurance_provider: string | null;
  enrollment_confirmed: boolean;
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

export function PatientsDirectory({ patients }: { patients: PatientListItem[] }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
            Patients
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink dark:text-[#f8fafc]">
            Intake and enrollment
          </h1>
          <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
            Register new specialty patients, review enrollment status, and open each patient profile to manage prescriptions.
          </p>
        </div>
        <Link
          className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brandDark dark:bg-accent dark:text-[#0f172a] dark:hover:bg-[#5eead4]"
          href="/patients/new"
        >
          New patient enrollment
        </Link>
      </div>

      {patients.length === 0 ? (
        <Card className="p-8 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-brandDark dark:bg-white/[0.15] dark:text-accent">
            <svg aria-hidden="true" className="h-7 w-7" fill="none" viewBox="0 0 24 24">
              <path
                d="M6 7.5C6 6.67157 6.67157 6 7.5 6H16.5C17.3284 6 18 6.67157 18 7.5V16.5C18 17.3284 17.3284 18 16.5 18H7.5C6.67157 18 6 17.3284 6 16.5V7.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path d="M9 12H15M12 9V15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-semibold text-ink dark:text-[#f8fafc]">No patients enrolled yet</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate dark:text-[#cbd5e1]">
            Patient enrollment records created from the intake form will appear here for the signed-in pharmacy user.
          </p>
          <Link
            className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brandDark dark:bg-accent dark:text-[#0f172a] dark:hover:bg-[#5eead4]"
            href="/patients/new"
          >
            Start first enrollment
          </Link>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5" tone="muted">
              <p className="text-sm font-semibold text-ink dark:text-[#f8fafc]">Active patients</p>
              <p className="mt-3 text-3xl font-semibold text-ink dark:text-[#f8fafc]">{patients.length}</p>
              <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">Visible to the current signed-in user.</p>
            </Card>
            <Card className="p-5" tone="muted">
              <p className="text-sm font-semibold text-ink dark:text-[#f8fafc]">Confirmed enrollments</p>
              <p className="mt-3 text-3xl font-semibold text-ink dark:text-[#f8fafc]">
                {patients.filter((patient) => patient.enrollment_confirmed).length}
              </p>
              <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">Ready for downstream prescription work.</p>
            </Card>
            <Card className="p-5" tone="accent">
              <p className="text-sm font-semibold text-ink dark:text-[#f8fafc]">Newest intake</p>
              <p className="mt-3 text-lg font-semibold text-ink dark:text-[#f8fafc]">
                {patients[0]?.name ?? "No recent patient"}
              </p>
              <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">Keep intake momentum moving by opening the latest patient profile.</p>
            </Card>
          </div>

          <div className="space-y-3 sm:hidden">
            {patients.map((patient) => (
              <Card className="p-4" key={patient.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link className="text-base font-semibold text-ink hover:text-brand dark:text-[#f8fafc] dark:hover:text-accent" href={`/patients/${patient.id}`}>
                      {patient.first_name && patient.last_name ? `${patient.first_name} ${patient.last_name}` : patient.name}
                    </Link>
                    <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
                      DOB: {formatDate(patient.date_of_birth)}
                    </p>
                    <p className="mt-1 text-sm text-slate dark:text-[#cbd5e1]">
                      Insurance: {patient.insurance_provider ?? "Not provided"}
                    </p>
                  </div>
                  <Badge tone={patient.enrollment_confirmed ? "success" : "warning"}>
                    {patient.enrollment_confirmed ? "Confirmed" : "Pending"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          <Card className="hidden overflow-hidden sm:block">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50 dark:bg-white/[0.06]">
                  <tr>
                    {["Patient", "DOB", "Insurance", "Created", "Status"].map((column) => (
                      <th
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate dark:text-[#94a3b8]"
                        key={column}
                        scope="col"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-white/[0.12]">
                  {patients.map((patient) => (
                    <tr
                      className="bg-white/70 transition-colors hover:bg-slate-50 dark:bg-transparent dark:hover:bg-white/[0.10]"
                      key={patient.id}
                    >
                      <td className="px-5 py-4 text-sm text-ink dark:text-[#f8fafc]">
                        <Link className="font-medium hover:text-brand dark:hover:text-accent" href={`/patients/${patient.id}`}>
                          {patient.first_name && patient.last_name ? `${patient.first_name} ${patient.last_name}` : patient.name}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-sm text-ink dark:text-[#f8fafc]">{formatDate(patient.date_of_birth)}</td>
                      <td className="px-5 py-4 text-sm text-ink dark:text-[#f8fafc]">{patient.insurance_provider ?? "Not provided"}</td>
                      <td className="px-5 py-4 text-sm text-ink dark:text-[#f8fafc]">{formatDate(patient.created_at)}</td>
                      <td className="px-5 py-4 text-sm text-ink dark:text-[#f8fafc]">
                        <Badge tone={patient.enrollment_confirmed ? "success" : "warning"}>
                          {patient.enrollment_confirmed ? "Confirmed" : "Pending"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </section>
  );
}
