"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WorkspaceError({
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
    <Card className="p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark">
        Workspace Error
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-ink">
        We couldn&apos;t load this workspace view.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-slate">
        Refresh the section to retry loading patients, prescriptions, authorizations,
        or tasks.
      </p>
      <div className="mt-5">
        <Button onClick={reset} variant="secondary">
          Reload section
        </Button>
      </div>
    </Card>
  );
}
