import { NavLink } from "@/components/dashboard/nav-link";
import { navLinks } from "@/components/dashboard/nav-links";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/dashboard/user-menu";
import { Card } from "@/components/ui/card";

type TopbarProps = {
  email: string;
};

export function Topbar({ email }: TopbarProps) {
  return (
    <Card className="sticky top-3 z-30 px-4 py-4 sm:px-6">
      <header className="flex flex-col gap-4" role="banner">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-[#2dd4bf]">
                Pharmacy Operations
              </p>
              <Badge tone="info">MVP</Badge>
            </div>
            <h1 className="mt-2 text-xl font-semibold text-ink dark:text-[#f1f5f9] sm:text-2xl">
              RxConnect Workspace
            </h1>
            <p className="mt-1 text-sm text-slate dark:text-[#cbd5e1]">
              Coordinate specialty patients, prescriptions, authorizations, and tasks.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <MobileSidebar />
            <UserMenu email={email} />
          </div>
        </div>
        <nav aria-label="Quick navigation" className="-mx-1 hidden gap-2 overflow-x-auto px-1 md:flex xl:hidden">
          {navLinks.map((item) => (
            <NavLink
              className="min-h-[44px] rounded-full bg-shell px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2 dark:bg-[#1e293b] dark:text-[#f1f5f9] dark:hover:bg-[#334155]"
              href={item.href}
              key={item.href}
            >
              {item.shortLabel}
            </NavLink>
          ))}
        </nav>
      </header>
    </Card>
  );
}
