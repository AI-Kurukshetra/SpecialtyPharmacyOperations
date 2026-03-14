import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export function PageTransitionSkeleton() {
  return (
    <div className="space-y-5">
      <div
        aria-hidden="true"
        className="h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10"
      >
        <div className="h-full w-1/3 animate-[shimmer_1.1s_linear_infinite] bg-[linear-gradient(90deg,transparent,var(--rx-primary),transparent)] bg-[length:200%_100%]" />
      </div>
      <Card className="p-6">
        <LoadingSkeleton className="h-4 w-28" />
        <LoadingSkeleton className="mt-4 h-9 w-1/3" />
        <LoadingSkeleton className="mt-3 h-4 w-2/3" />
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="p-5" key={index}>
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="mt-5 h-8 w-16" />
            <LoadingSkeleton className="mt-3 h-4 w-full" />
          </Card>
        ))}
      </div>
      <TableSkeleton columns={4} rows={4} />
    </div>
  );
}
