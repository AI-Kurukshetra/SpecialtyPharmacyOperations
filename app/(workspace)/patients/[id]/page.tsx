import { PatientDetailClient } from "@/components/patients/patient-detail-client";

export default async function PatientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string; type?: "success" | "error" }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);

  return (
    <PatientDetailClient
      message={query.message}
      messageType={query.type}
      patientId={id}
    />
  );
}
