"use client";

import { type ReactNode } from "react";

import { ThemeProvider as NextThemesProvider } from "@/lib/next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
      storageKey="rxconnect-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
