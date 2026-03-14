import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoProps = {
  /** Use when the logo is on a dark/teal background (e.g. auth left panel) for proper contrast */
  onDarkBackground?: boolean;
  /** Override logo link (e.g. "/" for landing, "/dashboard" default) */
  href?: string;
  className?: string;
};

export function Logo({ onDarkBackground = false, href = "/dashboard", className }: LogoProps) {
  return (
    <Link
      className={cn(
        "flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 focus-visible:rounded-lg",
        className,
      )}
      href={href as "/" | "/dashboard"}
    >
      <span
        className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#0d5c55,#0f766e)] shadow-panel ring-2 ring-white/25 ring-inset"
        aria-hidden="true"
      >
        <svg
          aria-hidden="true"
          className="relative h-6 w-6 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M6.5 7.25H11.5C14.1234 7.25 16.25 9.37665 16.25 12C16.25 14.6234 14.1234 16.75 11.5 16.75H10V20H6.5V7.25Z"
            fill="white"
          />
          <path
            d="M15.25 4H17.75V6.5H20.25V9H17.75V11.5H15.25V9H12.75V6.5H15.25V4Z"
            fill="white"
          />
        </svg>
      </span>
      <span>
        <span
          className={
            onDarkBackground
              ? "block text-[0.7rem] font-semibold uppercase tracking-[0.32em]"
              : "block text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-brandDark dark:text-sky-300"
          }
          style={
            onDarkBackground
              ? { color: "rgba(255,255,255,0.95)" }
              : undefined
          }
        >
          RxConnect
        </span>
        <span
          className={
            onDarkBackground
              ? "block text-sm font-semibold"
              : "block text-sm font-semibold text-ink dark:text-[#f1f5f9]"
          }
          style={
            onDarkBackground
              ? { color: "#ffffff" }
              : undefined
          }
        >
          Specialty Ops Suite
        </span>
      </span>
    </Link>
  );
}
