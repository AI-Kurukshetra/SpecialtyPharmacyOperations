"use client";

import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type ToastProps = {
  title: string;
  description: string;
  tone?: "success" | "warning" | "info";
  onClose?: () => void;
};

export function Toast({
  title,
  description,
  tone = "info",
  onClose,
}: ToastProps) {
  useEffect(() => {
    if (!onClose) {
      return;
    }

    const timeout = window.setTimeout(() => {
      onClose();
    }, 3200);

    return () => window.clearTimeout(timeout);
  }, [onClose]);

  return (
    <Card className="w-full max-w-sm animate-[fade-in_220ms_ease-out] p-4" tone="default">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink dark:text-[#f1f5f9]">{title}</p>
          <p className="mt-1 text-sm text-slate dark:text-[#cbd5e1]">{description}</p>
        </div>
        <div className="flex items-start gap-2">
          <Badge tone={tone}>
            {tone === "info" ? "Notice" : tone === "success" ? "Saved" : "Alert"}
          </Badge>
          {onClose ? (
            <button
              aria-label="Dismiss notification"
              className="min-h-[44px] min-w-[44px] rounded-full p-2 text-muted transition hover:bg-slate-100 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 dark:text-[#94a3b8] dark:hover:bg-white/[0.15] dark:hover:text-[#f1f5f9]"
              onClick={onClose}
              type="button"
            >
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                <path d="M7 7L17 17M17 7L7 17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            </button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
