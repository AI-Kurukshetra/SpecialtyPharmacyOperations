"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#workflow", label: "Workflow" },
];

type LandingHeaderProps = {
  /** Show theme switcher (hidden on landing page by default) */
  showThemeSwitcher?: boolean;
};

export function LandingHeader({ showThemeSwitcher = false }: LandingHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md"
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo href="/" className="shrink-0" />
        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100 hover:text-ink"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {showThemeSwitcher ? <ThemeSwitcher /> : null}
          <Link
            className="hidden rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-slate-50 sm:inline-block"
            href="/patient/login"
          >
            Patient Login
          </Link>
          <Link
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2"
            href={"/portal/login"}
          >
            Staff Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
