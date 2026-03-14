"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

type NavigationContextValue = {
  isNavigating: boolean;
  pendingHref: string | null;
  startNavigation: (href: string) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const value = useMemo(
    () => ({
      isNavigating: pendingHref !== null,
      pendingHref,
      startNavigation: (href: string) => {
        if (href !== pathname) {
          setPendingHref(href);
        }
      },
    }),
    [pathname, pendingHref],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationFeedback() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("useNavigationFeedback must be used within NavigationProvider.");
  }

  return context;
}
