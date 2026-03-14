"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: "light" | "dark";
  resolvedTheme: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  storageKey?: string;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light" as const;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  storageKey = "theme",
  attribute = "class",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = storedTheme ?? defaultTheme;
    const nextSystemTheme = getSystemTheme();

    setThemeState(initialTheme);
    setSystemTheme(nextSystemTheme);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (!enableSystem) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(getSystemTheme());

    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [enableSystem]);

  useEffect(() => {
    const root = document.documentElement;
    const resolvedTheme = theme === "system" ? systemTheme : theme;

    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute(attribute, resolvedTheme);
    }
  }, [attribute, systemTheme, theme]);

  const value = useMemo<ThemeContextValue>(() => {
    const resolvedTheme = theme === "system" ? systemTheme : theme;

    return {
      theme,
      systemTheme,
      resolvedTheme,
      setTheme: (nextTheme) => {
        setThemeState(nextTheme);
        window.localStorage.setItem(storageKey, nextTheme);
      },
    };
  }, [storageKey, systemTheme, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
}
