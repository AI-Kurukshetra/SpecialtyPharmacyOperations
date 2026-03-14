import { ResourcePlaceholder } from "@/components/dashboard/resource-placeholder";

export default function TasksPage() {
  return (
    <ResourcePlaceholder
      buttonLabel="New Task"
      columns={["Task", "Owner", "Due Date", "Status"]}
      description="Operational tasks will help staff coordinate payer follow-ups, missing documents, and patient outreach."
      rows={[
        ["Call payer for case update", "Alex", "03/14/2026", "Open"],
        ["Request chart notes", "Jordan", "03/15/2026", "Pending"],
        ["Schedule consult", "Sam", "03/16/2026", "In Progress"],
      ]}
      title="Tasks"
    />
  );
}
