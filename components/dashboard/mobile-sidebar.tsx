"use client";

import { useState } from "react";

import { Sidebar } from "@/components/dashboard/sidebar";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { Button } from "@/components/ui/button";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="xl:hidden" onClick={() => setOpen(true)} variant="ghost">
        Menu
      </Button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-ink/45 p-4 xl:hidden">
          <div className="ml-auto h-full max-w-sm animate-[fade-in_220ms_ease-out]">
            <Sidebar onNavigate={() => setOpen(false)} />
            <div className="mt-3">
              <ThemeSwitcher compact />
            </div>
            <Button
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
              variant="subtle"
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
