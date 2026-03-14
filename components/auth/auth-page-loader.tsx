import { Card } from "@/components/ui/card";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export function AuthPageLoader({
  eyebrow,
  titleWidth = "w-40",
}: {
  eyebrow: string;
  titleWidth?: string;
}) {
  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6"
      id="main-content"
      role="main"
    >
      <div className="grid w-full max-w-[1100px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/40 shadow-panel backdrop-blur lg:grid-cols-[1.02fr_0.98fr] dark:border-white/10 dark:bg-[#0b1220]/40">
        <div className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#0f766e,#13857a_50%,#0f9384)] p-10 text-white lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.10),transparent_28%)]" />
          <div className="absolute inset-6 rounded-[1.75rem] border border-white/[0.15] bg-white/[0.06] backdrop-blur-[10px]" />
          <div className="relative flex h-full flex-col">
            <LoadingSkeleton className="h-11 w-48 bg-white/20" />
            <div className="mt-auto max-w-md">
              <LoadingSkeleton className="h-4 w-24 bg-white/20" />
              <LoadingSkeleton className="mt-5 h-11 w-full bg-white/20" />
              <LoadingSkeleton className="mt-3 h-4 w-5/6 bg-white/20" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <LoadingSkeleton className="h-24 w-full rounded-[1.5rem] bg-white/20" />
                <LoadingSkeleton className="h-24 w-full rounded-[1.5rem] bg-white/20" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50/[0.85] p-4 sm:p-6 dark:bg-[#0b1220]/[0.55]">
          <Card className="mx-auto flex h-full max-w-[460px] flex-col p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10 dark:bg-[#111827]">
            <LoadingSkeleton className="h-11 w-44" />
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark dark:text-accent">
                {eyebrow}
              </p>
              <LoadingSkeleton className={`mt-4 h-10 ${titleWidth}`} />
              <LoadingSkeleton className="mt-3 h-4 w-full" />
            </div>
            <div className="mt-8 space-y-5">
              <div>
                <LoadingSkeleton className="h-4 w-24" />
                <LoadingSkeleton className="mt-3 h-12 w-full rounded-2xl" />
              </div>
              <div>
                <LoadingSkeleton className="h-4 w-28" />
                <LoadingSkeleton className="mt-3 h-12 w-full rounded-2xl" />
              </div>
              <LoadingSkeleton className="h-12 w-full rounded-2xl" />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
