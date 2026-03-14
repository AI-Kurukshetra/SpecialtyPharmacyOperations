import { login } from "@/app/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";

export const dynamic = "force-dynamic";

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ message?: string; next?: string; type?: "success" | "error" }>;
}) {
  const params = (await searchParams) ?? {};

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6"
      id="main-content"
      role="main"
    >
      <AuthCard
        description="Sign in to the pharmacy operations workspace for patient intake, prior authorizations, and fulfillment coordination."
        footerHref="/signup"
        footerLinkLabel="Create staff access"
        footerText="Need staff access?"
        title="Staff portal sign in"
      >
        <AuthForm
          action={login}
          message={params.message}
          messageType={params.type}
          next={params.next ?? "/dashboard"}
          pendingText="Opening portal..."
          submitText="Open staff portal"
        />
      </AuthCard>
    </main>
  );
}
