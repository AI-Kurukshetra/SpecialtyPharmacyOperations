import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "subtle";
  loading?: boolean;
  children: ReactNode;
};

const variants = {
  primary:
    "bg-ink text-white shadow-soft hover:bg-[#0B2545] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 dark:bg-accent dark:text-[#0f172a] dark:hover:bg-[#5eead4] dark:focus-visible:ring-[var(--rx-focus)]",
  secondary:
    "bg-brand text-white shadow-soft hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 dark:bg-accent dark:text-[#0f172a] dark:hover:bg-[#5eead4] dark:focus-visible:ring-[var(--rx-focus)]",
  ghost:
    "bg-white/90 text-ink ring-1 ring-inset ring-border hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 dark:bg-white/10 dark:text-[#f1f5f9] dark:ring-white/20 dark:hover:bg-white/[0.15] dark:focus-visible:ring-[var(--rx-focus)]",
  subtle:
    "bg-slate-100 text-ink hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 dark:bg-white/10 dark:text-[#f1f5f9] dark:hover:bg-white/[0.15] dark:focus-visible:ring-[var(--rx-focus)]",
};

export function Button({
  className,
  type = "button",
  variant = "primary",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      disabled={loading || props.disabled}
      type={type}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : null}
      {children}
    </button>
  );
}
