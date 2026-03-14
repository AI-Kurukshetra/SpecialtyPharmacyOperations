import { cn } from "@/lib/utils";

type BadgeProps = {
  children: string;
  tone?: "default" | "success" | "warning" | "info";
};

const tones = {
  default: "bg-slate-200 text-ink dark:bg-white/[0.15] dark:text-[#f1f5f9]",
  success: "bg-emerald-200 text-emerald-900 dark:bg-emerald-500/30 dark:text-emerald-100",
  warning: "bg-amber-200 text-amber-900 dark:bg-amber-500/30 dark:text-amber-100",
  info: "bg-teal-200 text-teal-900 dark:bg-teal-400/30 dark:text-teal-100",
};

export function Badge({ children, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.12em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
