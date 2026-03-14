import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "w-full rounded-2xl border-2 border-border bg-white px-4 py-3.5 text-sm text-ink shadow-sm outline-none transition duration-200 placeholder:text-muted focus:border-brand focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-0 dark:border-white/[0.15] dark:bg-[#0f172a] dark:text-[#f8fafc] dark:placeholder:text-[#94a3b8] dark:focus:border-accent dark:focus-visible:ring-[var(--rx-focus)]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
