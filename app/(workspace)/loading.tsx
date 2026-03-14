import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { TableSkeleton } from "@/components/ui/table-skeleton";

export default function WorkspaceLoading() {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <LoadingSkeleton className="h-4 w-32" />
        <LoadingSkeleton className="mt-4 h-10 w-1/2" />
        <LoadingSkeleton className="mt-3 h-4 w-2/3" />
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="p-5" key={index}>
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="mt-5 h-9 w-16" />
            <LoadingSkeleton className="mt-3 h-4 w-full" />
          </Card>
        ))}
      </div>
      <TableSkeleton />
    </div>
  );
}
