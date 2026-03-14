import Link from "next/link";

import { PrescriptionsTable, type PrescriptionRow } from "@/components/prescriptions/prescriptions-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PrescriptionsPage() {
  const supabase = await createClient();
  const { data: prescriptions } = await supabase
    .from("prescriptions")
    .select("id, patient_id, medication_name, provider_name, status")
    .order("created_at", { ascending: false });

  const patientIds = [...new Set((prescriptions ?? []).map((p) => p.patient_id))];
  const { data: patients } = patientIds.length
    ? await supabase.from("patients").select("id, name").in("id", patientIds)
    : { data: [] };

  const patientMap = new Map((patients ?? []).map((p) => [p.id, p.name ?? "Unknown"]));

  const rows: PrescriptionRow[] = (prescriptions ?? []).map((p) => ({
    patientId: p.patient_id,
    patientName: patientMap.get(p.patient_id) ?? "Unknown",
    medicationName: p.medication_name,
    providerName: p.provider_name,
    status: p.status,
  }));

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
            Workspace
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink dark:text-[#f1f5f9]">Prescriptions</h2>
          <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
            Prescription intake tracks medication, prescriber, and current fulfillment stage. Click a patient to open their profile and approve or update status.
          </p>
        </div>
        <Link href="/patients">
          <Button variant="secondary">Open patient queue</Button>
        </Link>
      </div>

      <PrescriptionsTable rows={rows} />

      <Card className="p-5 sm:p-6" tone="muted">
        <p className="text-sm font-semibold text-ink dark:text-[#f1f5f9]">How to approve a prescription</p>
        <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">
          Click the <strong>patient name</strong> in the table above to open their profile. On the patient profile, use the <strong>Workflow actions</strong> section to move the case forward: <strong>Review enrollment</strong>, <strong>Approved</strong>, <strong>Ready for Delivery</strong>, or other status updates. The patient portal is updated automatically when you change status.
        </p>
      </Card>
    </section>
  );
}
