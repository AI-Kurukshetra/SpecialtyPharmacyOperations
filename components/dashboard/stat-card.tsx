import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  trend?: string;
};

export function StatCard({ label, value, detail, trend }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate dark:text-[#cbd5e1]">{label}</p>
        {trend ? <Badge tone="info">{trend}</Badge> : null}
      </div>
      <p className="mt-4 text-3xl font-semibold text-ink dark:text-[#f1f5f9]">{value}</p>
      <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">{detail}</p>
    </Card>
  );
}
