"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/lib/next-themes";
import { cn } from "@/lib/utils";

const options = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] as const;

type ThemeSwitcherProps = {
  compact?: boolean;
};

export function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-11 rounded-2xl border border-border/80 bg-white/80 px-4 dark:border-slate-600 dark:bg-slate-800",
          compact ? "w-full" : "hidden md:block md:w-[180px]",
        )}
      />
    );
  }

  const selected = options.find((option) => option.value === theme) ?? options[2];

  return (
    <div
      className={cn(
        "relative",
        compact ? "w-full" : "hidden md:block",
      )}
    >
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Theme preference"
        className={cn(
          "flex min-h-[44px] w-full items-center justify-between rounded-2xl border-2 border-border bg-white/90 px-4 py-3 text-left shadow-soft transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus-visible:ring-[var(--rx-focus)]",
          compact ? "w-full" : "min-w-[180px]",
        )}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-brandDark dark:bg-white/[0.15] dark:text-accent">
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 3V5.5M12 18.5V21M4.93 4.93L6.7 6.7M17.3 17.3L19.07 19.07M3 12H5.5M18.5 12H21M4.93 19.07L6.7 17.3M17.3 6.7L19.07 4.93M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted dark:text-[#94A3B8]">
              Theme
            </span>
            <span className="block text-sm font-medium text-ink dark:text-[#f1f5f9]">
              {selected.label}
            </span>
          </span>
        </span>
        <svg
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-muted transition-transform dark:text-[#94A3B8]",
            open ? "rotate-180" : "",
          )}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      </button>

      {open ? (
        <div
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-full overflow-hidden rounded-[1.35rem] border border-border/80 bg-white/[0.92] p-2 shadow-panel dark:border-slate-600 dark:bg-slate-800 dark:shadow-xl"
        >
          <div className="space-y-1">
            {options.map((option) => {
              const active = theme === option.value;

              return (
                <button
                  className={cn(
                    "flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-inset",
                    active
                      ? "bg-slate-100 text-ink dark:bg-white/[0.15] dark:text-[#f1f5f9]"
                      : "text-slate hover:bg-slate-50 hover:text-ink dark:text-[#cbd5e1] dark:hover:bg-white/[0.15] dark:hover:text-[#f1f5f9]",
                  )}
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setOpen(false);
                  }}
                  type="button"
                >
                  <span>{option.label}</span>
                  {active ? (
                    <span className="text-brandDark dark:text-accent" aria-hidden="true">
                      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <path d="M5.5 12.5L9.5 16.5L18.5 7.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                      </svg>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
