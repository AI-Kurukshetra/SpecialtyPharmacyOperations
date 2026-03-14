"use client";

import { type ReactNode } from "react";

import { MobileBottomNav } from "@/components/dashboard/mobile-bottom-nav";
import { useNavigationFeedback } from "@/components/dashboard/navigation-context";
import { NavigationProgress } from "@/components/dashboard/navigation-progress";
import { NavigationProvider } from "@/components/dashboard/navigation-context";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

type WorkspaceShellProps = {
  email: string;
  children: ReactNode;
};

function WorkspaceContent({ children }: { children: ReactNode }) {
  const { isNavigating } = useNavigationFeedback();

  return (
    <main
      className="min-w-0 flex-1 bg-soft-grid bg-[size:36px_36px] pb-24 dark:bg-[#0f1726] sm:pb-6"
      id="main-content"
      role="main"
    >
      <div className="min-h-[calc(100vh-8.5rem)] rounded-[2rem] border border-slate-200/90 bg-white/95 p-4 shadow-soft transition-colors dark:border-slate-600/80 dark:bg-slate-800/95 dark:backdrop-blur-xl sm:p-6 lg:p-7">
        {isNavigating ? <NavigationProgress /> : children}
      </div>
    </main>
  );
}

export function WorkspaceShell({ email, children }: WorkspaceShellProps) {
  return (
    <NavigationProvider>
      <div className="min-h-screen px-3 py-3 sm:px-4 sm:py-4 xl:px-5 xl:py-5">
        <div className="grid min-h-[calc(100vh-1.5rem)] gap-4 xl:grid-cols-[310px_minmax(0,1fr)]">
          <aside className="hidden xl:sticky xl:top-5 xl:block xl:h-[calc(100vh-2.5rem)]">
            <Sidebar />
          </aside>
          <div className="flex min-w-0 flex-col gap-4">
            <Topbar email={email} />
            <WorkspaceContent>{children}</WorkspaceContent>
          </div>
        </div>
        <MobileBottomNav />
      </div>
    </NavigationProvider>
  );
}
