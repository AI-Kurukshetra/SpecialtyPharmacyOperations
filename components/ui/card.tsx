import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "muted" | "accent";
};

const tones = {
  default:
    "border-white/80 bg-white/[0.96] shadow-panel dark:border-slate-600/80 dark:bg-slate-800 dark:shadow-none",
  muted:
    "border-border/90 bg-white/[0.88] shadow-soft dark:border-slate-600/60 dark:bg-slate-800/90 dark:shadow-none",
  accent:
    "border-[#CDEEE8] bg-[linear-gradient(145deg,rgba(15,118,110,0.12),rgba(255,255,255,0.98))] shadow-panel dark:border-teal-500/40 dark:bg-slate-800 dark:shadow-none",
};

export function Card({
  className,
  tone = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border backdrop-blur",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
