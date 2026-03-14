import { ResourcePlaceholder } from "@/components/dashboard/resource-placeholder";

export default function PrescriptionsPage() {
  return (
    <ResourcePlaceholder
      buttonLabel="New Prescription"
      columns={["Medication", "Patient", "Provider", "Status"]}
      description="Prescription intake will track medication, prescriber, and current fulfillment stage."
      rows={[
        ["Skyrizi", "Maria Lopez", "Dr. Patel", "Pending Review"],
        ["Dupixent", "David Kim", "Dr. Ng", "Benefits Verification"],
        ["Humira", "Alicia Brown", "Dr. Singh", "Approved"],
      ]}
      title="Prescriptions"
    />
  );
}
