import { signup } from "@/app/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; type?: "success" | "error" }>;
}) {
  const params = await searchParams;

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6"
      id="main-content"
      role="main"
    >
      <AuthCard
        description="Create a pharmacy staff account for the RxConnect MVP workspace."
        footerHref="/login"
        footerLinkLabel="Sign in"
        footerText="Already have an account?"
        title="Set up your workspace access"
      >
        <AuthForm
          action={signup}
          message={params.message}
          messageType={params.type}
          pendingText="Creating account..."
          submitText="Create account"
        />
      </AuthCard>
    </main>
  );
}
