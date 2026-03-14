"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const STORAGE_KEY = "rxconnect-theme";

function getResolvedTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as "light" | "dark" | "system" | null;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = stored === "system" ? (systemDark ? "dark" : "light") : (stored ?? "light");
  return resolved;
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

/**
 * When on the landing page (/), force light mode so the class="dark" is not applied.
 * Restores the user's stored theme when they navigate away.
 */
export function ForceLandingLight() {
  const pathname = usePathname();
  const savedThemeRef = useRef<"light" | "dark" | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    savedThemeRef.current = getResolvedTheme();
    applyTheme("light");

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      if (root.classList.contains("dark")) {
        applyTheme("light");
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      if (savedThemeRef.current) {
        applyTheme(savedThemeRef.current);
      }
      savedThemeRef.current = null;
    };
  }, [pathname]);

  return null;
}
