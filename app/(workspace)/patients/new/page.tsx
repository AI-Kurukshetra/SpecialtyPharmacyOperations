import { PatientIntakeForm } from "@/components/patients/patient-intake-form";
import {
  getNewEnrollmentPatientOptions,
  getPatientEnrollmentData,
} from "@/app/actions/patients";

export default async function NewPatientPage({
  searchParams,
}: {
  searchParams: Promise<{ load?: string }>;
}) {
  const params = await searchParams;
  const loadId = params.load;

  const [newEnrollmentOptions, initialData] = await Promise.all([
    getNewEnrollmentPatientOptions(),
    loadId ? getPatientEnrollmentData(loadId) : Promise.resolve(null),
  ]);

  return (
    <PatientIntakeForm
      initialData={initialData ?? undefined}
      loadedPatientId={loadId && initialData ? loadId : undefined}
      newEnrollmentOptions={newEnrollmentOptions}
    />
  );
}
