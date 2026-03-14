import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-2xl border-2 border-border bg-white px-4 py-3.5 text-sm text-ink shadow-sm outline-none transition duration-200 placeholder:text-muted focus:border-brand focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-0 dark:border-white/[0.15] dark:bg-[#0f172a] dark:text-[#f8fafc] dark:placeholder:text-[#94a3b8] dark:focus:border-accent dark:focus-visible:ring-[var(--rx-focus)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
