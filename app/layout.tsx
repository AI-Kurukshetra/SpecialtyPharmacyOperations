import type { Metadata } from "next";
import Script from "next/script";
import { type ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "RxConnect",
  description: "Specialty pharmacy operations intelligence platform.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Script id="rxconnect-theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var stored = localStorage.getItem('rxconnect-theme') || 'system';
                var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var resolved = stored === 'system' ? (systemDark ? 'dark' : 'light') : stored;
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(resolved);
              } catch (e) {}
            })();
          `}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
