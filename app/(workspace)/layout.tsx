import { redirect } from "next/navigation";
import { type ReactNode } from "react";

import { WorkspaceShell } from "@/components/dashboard/workspace-shell";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <WorkspaceShell email={user.email ?? "staff@rxconnect.com"}>
      {children}
    </WorkspaceShell>
  );
}
