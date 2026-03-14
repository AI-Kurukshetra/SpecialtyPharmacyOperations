"use client";

import { useNavigationFeedback } from "@/components/dashboard/navigation-context";
import { PageTransitionSkeleton } from "@/components/dashboard/page-transition-skeleton";

export function NavigationProgress() {
  const { isNavigating } = useNavigationFeedback();

  if (!isNavigating) {
    return null;
  }

  return (
    <div aria-live="polite">
      <span className="sr-only">Loading next page</span>
      <PageTransitionSkeleton />
    </div>
  );
}
