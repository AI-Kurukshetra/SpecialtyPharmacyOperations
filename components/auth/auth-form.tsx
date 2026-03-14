import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

type AuthFormProps = {
  action: (formData: FormData) => Promise<void>;
  submitText: string;
  pendingText: string;
  message?: string;
  messageType?: "success" | "error";
  next?: string;
};

export function AuthForm({
  action,
  submitText,
  pendingText,
  message,
  messageType = "error",
  next,
}: AuthFormProps) {
  return (
    <form action={action} className="space-y-5 transition-all duration-200">
      {next ? <input name="next" type="hidden" value={next} /> : null}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="email">
          Work email
        </label>
        <Input
          autoComplete="email"
          aria-describedby="email-help"
          id="email"
          name="email"
          placeholder="pharmacy.team@rxconnect.com"
          required
          type="email"
        />
        <p className="text-xs text-muted dark:text-[#94a3b8]" id="email-help">
          Use your pharmacy staff email to access the workspace.
        </p>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink dark:text-[#f8fafc]" htmlFor="password">
          Password
        </label>
        <Input
          autoComplete="current-password"
          aria-describedby="password-help"
          id="password"
          minLength={6}
          name="password"
          placeholder="Enter your password"
          required
          type="password"
        />
        <p className="text-xs text-muted dark:text-[#94a3b8]" id="password-help">
          Password must contain at least 6 characters.
        </p>
      </div>
      {message ? (
        <p
          className={
            messageType === "success"
              ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300"
              : "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300"
          }
          role={messageType === "success" ? "status" : "alert"}
        >
          {message}
        </p>
      ) : null}
      <SubmitButton idleText={submitText} pendingText={pendingText} />
      <p className="text-center text-xs leading-5 text-muted dark:text-[#94a3b8]">
        Protected by Supabase authentication. Use pharmacy staff email/password credentials.
      </p>
    </form>
  );
}
