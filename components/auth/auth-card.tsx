import type { Route } from "next";
import Link from "next/link";
import { type ReactNode } from "react";

import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description: string;
  footerText: string;
  footerHref: Route;
  footerLinkLabel: string;
  children: ReactNode;
};

export function AuthCard({
  title,
  description,
  footerText,
  footerHref,
  footerLinkLabel,
  children,
}: AuthCardProps) {
  return (
    <div className="grid w-full max-w-[1100px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/40 shadow-panel backdrop-blur lg:grid-cols-[1.02fr_0.98fr] dark:border-white/10 dark:bg-[#0b1220]/40">
      <div
        aria-label="Platform overview"
        className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#0f766e,#13857a_50%,#0f9384)] p-10 text-white lg:block"
        role="complementary"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_28%)]" />
        <div className="absolute inset-6 rounded-[1.75rem] border border-white/[0.15] bg-white/[0.06] backdrop-blur-[10px]" />
        <div className="relative flex h-full flex-col">
          <Logo onDarkBackground />
          <div className="mt-auto max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/95">
              Healthcare SaaS
            </p>
            <h2 className="mt-4 max-w-sm text-4xl font-semibold leading-tight text-white">
              Operations clarity for specialty pharmacy teams.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/90">
              Centralize patient intake, prescription workflows, prior authorizations,
              and team tasks in a secure workspace.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div
                aria-label="New referrals in review: 18"
                className="rounded-[1.75rem] border border-slate-300 bg-white p-4 shadow-soft"
                role="group"
              >
                <p className="text-2xl font-semibold" style={{ color: "#0f172a" }}>
                  18
                </p>
                <p className="mt-2 text-sm font-medium" style={{ color: "#334155" }}>
                  New referrals in review
                </p>
              </div>
              <div
                aria-label="Prior auths awaiting action: 7"
                className="rounded-[1.75rem] border border-slate-300 bg-white p-4 shadow-soft"
                role="group"
              >
                <p className="text-2xl font-semibold" style={{ color: "#0f172a" }}>
                  7
                </p>
                <p className="mt-2 text-sm font-medium" style={{ color: "#334155" }}>
                  Prior auths awaiting action
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50/[0.85] p-4 sm:p-6 dark:bg-[#0b1220]/[0.55]">
        <Card className="mx-auto flex h-full max-w-[460px] flex-col p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10 dark:bg-[#111827]">
          <div className="mb-8">
            <Logo />
          </div>
          <div className="mb-7">
            <h1 className="text-3xl font-semibold text-ink dark:text-[#f8fafc]">{title}</h1>
            <p className="mt-3 text-sm leading-6 text-slate dark:text-[#94a3b8]">{description}</p>
          </div>
          <div className="flex-1">{children}</div>
          <p className="mt-7 text-center text-sm text-slate dark:text-[#94a3b8]">
            {footerText}{" "}
            <Link
              className="font-semibold text-brand underline decoration-2 underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 focus-visible:rounded dark:text-accent"
              href={footerHref}
            >
              {footerLinkLabel}
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
