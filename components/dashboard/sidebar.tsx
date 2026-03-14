"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavLink } from "@/components/dashboard/nav-link";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { navLinks } from "@/components/dashboard/nav-links";

type SidebarProps = {
  onNavigate?: () => void;
};

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const icons = {
    grid: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H20V20H14V14Z" fill="currentColor" />
      </svg>
    ),
    users: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M9 11C10.6569 11 12 9.65685 12 8C12 6.34315 10.6569 5 9 5C7.34315 5 6 6.34315 6 8C6 9.65685 7.34315 11 9 11Z" fill="currentColor" />
        <path d="M15.5 12C16.8807 12 18 10.8807 18 9.5C18 8.11929 16.8807 7 15.5 7C14.1193 7 13 8.11929 13 9.5C13 10.8807 14.1193 12 15.5 12Z" fill="currentColor" opacity=".72" />
        <path d="M3.5 18.5C3.5 16.567 5.067 15 7 15H11C12.933 15 14.5 16.567 14.5 18.5V19H3.5V18.5Z" fill="currentColor" />
        <path d="M14 19C14 17.3431 15.3431 16 17 16H17.5C19.433 16 21 17.567 21 19H14Z" fill="currentColor" opacity=".72" />
      </svg>
    ),
    clipboard: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M9 4.5H15C15 5.32843 14.3284 6 13.5 6H10.5C9.67157 6 9 5.32843 9 4.5Z" fill="currentColor" />
        <path d="M7 5H17C18.1046 5 19 5.89543 19 7V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V7C5 5.89543 5.89543 5 7 5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 10H15.5M8.5 13.5H15.5M8.5 17H12.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    ),
    shield: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M12 3L19 6V11C19 15.4183 16.0817 19.4183 12 21C7.91827 19.4183 5 15.4183 5 11V6L12 3Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 12L11 13.5L14.5 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    ),
    check: (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M9.5 16.5L5.5 12.5L7 11L9.5 13.5L17 6L18.5 7.5L9.5 16.5Z" fill="currentColor" />
      </svg>
    ),
  };

  return (
    <Card className="relative flex h-full flex-col p-5 xl:p-6 dark:before:pointer-events-none dark:before:absolute dark:before:inset-x-6 dark:before:top-0 dark:before:h-px dark:before:bg-white/10 dark:before:content-['']">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="mb-5 px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted dark:text-[#94a3b8]" id="sidebar-nav-label">
          Navigation
        </p>
      </div>
      <nav aria-labelledby="sidebar-nav-label" className="space-y-2">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <NavLink
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-[44px] items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2",
                isActive
                  ? "bg-brand text-white shadow-soft dark:bg-accent/25 dark:text-[#0f172a] dark:ring-1 dark:ring-accent/50"
                  : "text-slate hover:bg-slate-100 hover:text-ink dark:text-[#cbd5e1] dark:hover:bg-white/[0.15] dark:hover:text-[#f1f5f9]",
              )}
              href={item.href}
              key={item.href}
              onClick={onNavigate}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl",
                  isActive
                    ? "bg-white/[0.16] dark:bg-accent/20"
                    : "bg-white text-brandDark ring-1 ring-border/70 dark:bg-white/[0.08] dark:text-accent dark:ring-white/10",
                )}
              >
                {icons[item.icon]}
              </span>
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <Card className="mt-auto p-4" tone="accent">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink dark:text-slate-100">Operational pulse</p>
          <Badge tone="info">Live</Badge>
        </div>
        <p className="mt-2 text-sm text-slate dark:text-slate-300">
          Keep active cases, payer follow-ups, and staff tasks in one view.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-semibold text-ink dark:text-slate-100">23</p>
            <p className="text-xs uppercase tracking-[0.16em] text-muted dark:text-slate-400">Open Tasks</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-ink dark:text-slate-100">7</p>
            <p className="text-xs uppercase tracking-[0.16em] text-muted dark:text-slate-400">Pending PAs</p>
          </div>
        </div>
        <Button className="mt-4 w-full" variant="secondary">
          Create Follow-up
        </Button>
      </Card>
    </Card>
  );
}
