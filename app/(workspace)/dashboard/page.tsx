import { StaffDashboardOverview } from "@/components/dashboard/staff-dashboard-overview";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const [
    { count: enrollmentCount },
    { count: priorAuthCount },
    { count: activePrescriptionCount },
    { count: taskCount },
    { data: recentPatients },
  ] = await Promise.all([
    supabase
      .from("patients")
      .select("*", { count: "exact", head: true })
      .eq("status", "Enrollment Submitted"),
    supabase
      .from("prior_authorizations")
      .select("*", { count: "exact", head: true })
      .in("status", ["submitted", "pending_docs"]),
    supabase
      .from("prescriptions")
      .select("*", { count: "exact", head: true })
      .in("status", ["pending_review", "benefits_verification", "approved"]),
    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .neq("status", "completed"),
    supabase
      .from("patients")
      .select("name, status, insurance_provider")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const patientNames = (recentPatients ?? []).map((patient) => patient.name);
  const { data: recentPrescriptions } = patientNames.length
    ? await supabase
        .from("prescriptions")
        .select("patient_id, medication_name, created_at")
        .order("created_at", { ascending: false })
        .limit(20)
    : { data: [] };

  return (
    <StaffDashboardOverview
      activePrescriptionCount={activePrescriptionCount ?? 0}
      enrollmentCount={enrollmentCount ?? 0}
      priorAuthCount={priorAuthCount ?? 0}
      recentEnrollments={(recentPatients ?? []).map((patient, index) => ({
        name: patient.name,
        medication: recentPrescriptions?.[index]?.medication_name ?? "Pending medication review",
        insurance: patient.insurance_provider ?? "Pending insurance",
        status: patient.status,
      }))}
      taskCount={taskCount ?? 0}
    />
  );
}
