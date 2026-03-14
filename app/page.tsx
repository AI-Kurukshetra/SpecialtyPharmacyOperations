import Image from "next/image";
import Link from "next/link";

import { ForceLandingLight } from "@/components/landing/force-landing-light";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ message?: string; type?: "success" | "error" }>;
}) {
  const query = (await searchParams) ?? {};

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ForceLandingLight />
      <LandingHeader />

      <main id="main-content">
        {query.message ? (
          <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
            <div
              className={
                query.type === "error"
                  ? "rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900"
                  : "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
              }
              role={query.type === "error" ? "alert" : "status"}
            >
              {query.message}
            </div>
          </div>
        ) : null}
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200/80">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-24 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brandDark">
                Specialty Pharmacy Workflow
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
                Coordinate treatment from enrollment to medication delivery.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-slate">
                RxConnect helps patients and pharmacy operations teams stay aligned through insurance verification, prior authorization, approval, and therapy readiness.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2"
                  href="/enroll"
                >
                  Start Treatment
                </Link>
                <Link
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
                  href="/patient/login"
                >
                  Patient Login
                </Link>
                <Link
                  className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
                  href="/portal/login"
                >
                  Staff Portal
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-100">
              <Image
                alt="Healthcare professional reviewing patient information and medication"
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-b border-slate-200/80"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 id="features-heading" className="text-center text-3xl font-semibold text-ink sm:text-4xl">
              Built for patients and pharmacy teams
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate">
              One platform for enrollment, verification, prior auth, and delivery readiness.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card className="p-6">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    alt="Patient filling forms and enrollment"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">Faster onboarding</h3>
                <p className="mt-2 text-sm text-slate">
                  Collect enrollment, insurance, provider, and medication details in a single patient-friendly workflow.
                </p>
              </Card>
              <Card className="p-6">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    alt="Team collaboration and shared visibility"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">Shared visibility</h3>
                <p className="mt-2 text-sm text-slate">
                  Patients and pharmacy staff stay aligned through status updates and staff messages.
                </p>
              </Card>
              <Card className="p-6">
                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    alt="Pharmacy operations and workflow"
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">Operational clarity</h3>
                <p className="mt-2 text-sm text-slate">
                  Track prescription intake, prior authorization progress, and operational tasks from one workspace.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-b border-slate-200/80"
          aria-labelledby="how-heading"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-100">
                <Image
                  alt="Doctor and patient discussing treatment plan"
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
                />
              </div>
              <div>
                <h2 id="how-heading" className="text-3xl font-semibold text-ink sm:text-4xl">
                  How treatment moves forward
                </h2>
                <ol className="mt-6 space-y-5 text-slate">
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand">1</span>
                    <div>
                      <span className="font-medium text-ink">Enrollment:</span> Patient submits treatment and insurance details.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand">2</span>
                    <div>
                      <span className="font-medium text-ink">Verification:</span> Staff reviews intake and confirms benefits.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand">3</span>
                    <div>
                      <span className="font-medium text-ink">Prior authorization:</span> Pharmacy team submits payer approval requests.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand">4</span>
                    <div>
                      <span className="font-medium text-ink">Approval:</span> The team resolves payer decisions and documentation.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-sm font-bold text-brand">5</span>
                    <div>
                      <span className="font-medium text-ink">Ready:</span> Patient sees delivery readiness and next steps.
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow / Trust */}
        <section id="workflow" className="border-b border-slate-200/80" aria-labelledby="workflow-heading">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 id="workflow-heading" className="text-center text-3xl font-semibold text-ink sm:text-4xl">
              Streamlined from start to delivery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate">
              Reduce delays and keep everyone informed at every step.
            </p>
            <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-slate-200/80">
              <div className="relative aspect-[21/9] min-h-[200px] bg-slate-100">
                <Image
                  alt="Pharmacy and healthcare team at work"
                  className="object-cover"
                  fill
                  sizes="100vw"
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                  <p className="max-w-2xl text-lg font-medium sm:text-xl">
                    From intake to prior auth to approval—one workspace for pharmacy operations and patient visibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 id="cta-heading" className="text-3xl font-semibold text-ink sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-slate">
              Patients can enroll in treatment. Staff can sign in to the operations portal.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl bg-brand px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brandDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rx-focus)] focus-visible:ring-offset-2"
                href="/enroll"
              >
                Start Treatment
              </Link>
              <Link
                className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-slate-200 px-8 py-3 text-sm font-semibold text-ink transition hover:bg-slate-50"
                href="/portal/login"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
