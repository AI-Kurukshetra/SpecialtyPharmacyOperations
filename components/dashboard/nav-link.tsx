"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { type ComponentProps } from "react";

import { useNavigationFeedback } from "@/components/dashboard/navigation-context";

type NavLinkProps = ComponentProps<typeof Link>;

export function NavLink({ href, onClick, onMouseEnter, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { startNavigation } = useNavigationFeedback();
  const hrefValue = typeof href === "string" ? href : href.toString();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);

        if (
          !event.defaultPrevented &&
          pathname !== hrefValue &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          startNavigation(hrefValue);
        }
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        router.prefetch(hrefValue as Route);
      }}
      prefetch
      {...props}
    />
  );
}
