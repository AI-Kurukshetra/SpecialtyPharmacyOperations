import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { login } from "@/app/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; next?: string; type?: "success" | "error" }>;
}) {
  const params = await searchParams;

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6"
      id="main-content"
      role="main"
    >
      <AuthCard
        description="Sign in to manage specialty pharmacy workflows, prior authorizations, and patient coordination."
        footerHref="/signup"
        footerLinkLabel="Create an account"
        footerText="Need access?"
        title="Welcome back"
      >
        <AuthForm
          action={login}
          message={params.message}
          messageType={params.type}
          next={params.next}
          pendingText="Signing in..."
          submitText="Sign in"
        />
      </AuthCard>
    </main>
  );
}
