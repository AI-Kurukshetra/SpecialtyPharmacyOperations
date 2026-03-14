import { ResourcePlaceholder } from "@/components/dashboard/resource-placeholder";

export default function PriorAuthorizationsPage() {
  return (
    <ResourcePlaceholder
      buttonLabel="New Authorization"
      columns={["Prescription", "Payer", "Submitted", "Status"]}
      description="Prior authorizations will capture payer submission status, review dates, and approval outcomes."
      rows={[
        ["Skyrizi - Maria Lopez", "Blue Shield", "03/12/2026", "Submitted"],
        ["Dupixent - David Kim", "Aetna", "03/11/2026", "Pending Docs"],
        ["Humira - Alicia Brown", "Cigna", "03/10/2026", "Approved"],
      ]}
      title="Prior Authorizations"
    />
  );
}
