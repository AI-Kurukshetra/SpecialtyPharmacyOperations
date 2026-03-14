"use client";

import { usePathname } from "next/navigation";

import { NavLink } from "@/components/dashboard/nav-link";
import { navLinks } from "@/components/dashboard/nav-links";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-3 bottom-3 z-40 rounded-[1.6rem] border-2 border-border bg-white/95 p-2 shadow-panel backdrop-blur dark:border-slate-600 dark:bg-slate-800 md:hidden">
      <ul className="grid grid-cols-5 gap-1" role="list">
        {navLinks.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <NavLink
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2.5 text-[11px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2",
                  active
                    ? "bg-ink text-white dark:bg-accent dark:text-[#0f172a]"
                    : "text-slate hover:bg-slate-100 hover:text-ink dark:text-[#cbd5e1] dark:hover:bg-white/[0.15] dark:hover:text-[#f1f5f9]",
                )}
                href={item.href}
              >
                <span className="truncate">{item.shortLabel}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
