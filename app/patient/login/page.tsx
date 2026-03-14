import { PatientLoginForm } from "@/components/patient-portal/patient-login-form";

export const dynamic = "force-dynamic";

export default async function PatientLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ message?: string; type?: "success" | "error" }>;
}) {
  const query = (await searchParams) ?? {};

  return <PatientLoginForm message={query.message} messageType={query.type} />;
}
