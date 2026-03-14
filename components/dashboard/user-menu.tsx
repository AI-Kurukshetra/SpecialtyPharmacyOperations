import { logout } from "@/app/actions/auth";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FormActionButton } from "@/components/ui/form-action-button";

type UserMenuProps = {
  email: string;
};

export function UserMenu({ email }: UserMenuProps) {
  return (
    <Card className="flex items-center gap-3 px-3 py-2 shadow-soft">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-brandDark dark:bg-white/[0.15] dark:text-accent" aria-hidden="true">
        RX
      </div>
      <div className="hidden text-left sm:block">
        <p className="text-sm font-medium text-ink dark:text-[#f1f5f9]">{email}</p>
        <div className="mt-1 flex items-center gap-2">
          <Badge tone="success">Staff</Badge>
          <span className="text-xs text-muted dark:text-[#94a3b8]">Secure session</span>
        </div>
      </div>
      <form action={logout}>
        <FormActionButton
          idleText="Sign out"
          pendingText="Signing out..."
          variant="ghost"
        />
      </form>
    </Card>
  );
}
