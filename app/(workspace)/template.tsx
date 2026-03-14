"use client";

import { type ReactNode } from "react";

export default function WorkspaceTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="animate-[fade-in_240ms_ease-out]">
      {children}
    </div>
  );
}
