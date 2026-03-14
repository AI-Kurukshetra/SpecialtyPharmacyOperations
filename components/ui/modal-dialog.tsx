"use client";

import { type ReactNode, useEffect } from "react";

import { Button } from "@/components/ui/button";

type ModalDialogProps = {
  open: boolean;
  title: string;
  description: string;
  children?: ReactNode;
  onClose: () => void;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  primaryActionLoading?: boolean;
};

export function ModalDialog({
  open,
  title,
  description,
  children,
  onClose,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionLoading = false,
}: ModalDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby="modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end bg-ink/45 p-4 dark:bg-black/55 sm:items-center sm:justify-center"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="w-full max-w-lg animate-[fade-in_220ms_ease-out] rounded-[1.75rem] border-2 border-border bg-white p-6 shadow-panel dark:border-slate-600 dark:bg-slate-800"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand dark:text-accent">
              Quick Action
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-ink dark:text-[#f1f5f9]" id="modal-title">
              {title}
            </h3>
            <p className="mt-2 text-sm text-slate dark:text-[#cbd5e1]">{description}</p>
          </div>
          <Button aria-label="Close dialog" onClick={onClose} variant="ghost">
            Close
          </Button>
        </div>
        {children ? <div className="mt-6">{children}</div> : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          {primaryActionLabel && onPrimaryAction ? (
            <Button
              loading={primaryActionLoading}
              onClick={onPrimaryAction}
              variant="secondary"
            >
              {primaryActionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
