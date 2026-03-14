import { PatientsDirectory } from "@/components/patients/patients-directory";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PatientsPage() {
  const supabase = await createClient();
  const { data: patients, error } = await supabase
    .from("patients")
    .select("id, name, first_name, last_name, date_of_birth, insurance_provider, enrollment_confirmed, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <PatientsDirectory patients={patients ?? []} />
  );
}
