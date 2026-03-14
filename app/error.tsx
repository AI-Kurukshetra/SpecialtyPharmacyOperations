"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="max-w-lg p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark">
          Application Error
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">
          Something interrupted the RxConnect experience.
        </h1>
        <p className="mt-3 text-sm text-slate">
          Try again to reload the current view. If the issue persists, check your
          Supabase configuration and session state.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={reset} variant="secondary">
            Try again
          </Button>
        </div>
      </Card>
    </main>
  );
}
