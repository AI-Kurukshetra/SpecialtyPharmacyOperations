import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function RootLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <LoadingSkeleton className="h-4 w-28" />
        <LoadingSkeleton className="mt-4 h-10 w-3/4" />
        <LoadingSkeleton className="mt-3 h-4 w-full" />
        <LoadingSkeleton className="mt-2 h-4 w-5/6" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <LoadingSkeleton className="h-24 w-full" />
          <LoadingSkeleton className="h-24 w-full" />
        </div>
      </Card>
    </main>
  );
}
