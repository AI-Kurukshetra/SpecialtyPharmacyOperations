import Link from "next/link";

import { Logo } from "@/components/logo";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Workflow", href: "#workflow" },
  ],
  access: [
    { label: "Patient Login", href: "/patient/login" },
    { label: "Staff Portal", href: "/portal/login" },
    { label: "Enroll", href: "/enroll" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-slate-200 bg-slate-50/80"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo href="/" className="inline-block" />
            <p className="mt-4 max-w-sm text-sm text-slate-700">
              Specialty pharmacy operations platform. Coordinate treatment from enrollment to medication delivery.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a
                    className="text-sm text-slate-700 transition hover:text-ink"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Access
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.access.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-slate-700 transition hover:text-ink"
                    href={link.href as "/patient/login" | "/portal/login" | "/enroll"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    className="text-sm text-slate-700 transition hover:text-ink"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-600">
            © {currentYear} RxConnect. Specialty pharmacy operations intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
