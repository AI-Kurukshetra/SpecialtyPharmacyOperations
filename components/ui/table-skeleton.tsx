import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
};

export function TableSkeleton({
  rows = 4,
  columns = 4,
}: TableSkeletonProps) {
  return (
    <Card className="overflow-hidden">
      <div className="hidden p-5 sm:block">
        <div className="grid gap-4">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <LoadingSkeleton className="h-4 w-24" key={index} />
            ))}
          </div>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              className="grid gap-4"
              key={rowIndex}
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: columns }).map((__, cellIndex) => (
                <LoadingSkeleton className="h-5 w-full" key={cellIndex} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 p-4 sm:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card className="p-4" key={index} tone="muted">
            <LoadingSkeleton className="h-5 w-2/3" />
            <LoadingSkeleton className="mt-3 h-4 w-full" />
            <LoadingSkeleton className="mt-2 h-4 w-5/6" />
          </Card>
        ))}
      </div>
    </Card>
  );
}
