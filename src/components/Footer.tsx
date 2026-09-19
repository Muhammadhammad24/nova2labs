import { Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import { SERVICES } from "@/lib/services-data";
import { CONTACT_EMAIL, LOCATION, SOCIAL } from "@/lib/site";

function Logo() {
  return (
    <svg
      viewBox="0 0 452 140"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label="nova2labs"
      className="h-8 w-auto text-foreground"
    >
      <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26,110 L26,72 A14 14 0 0 1 54,72 L54,110" />
        <path d="M54,110 C60,108 62,93 66,85" />
        <circle cx="92" cy="84" r="26" />
        <path d="M118,84 C123,78 125,66 128,58" />
        <path d="M128,58 L146,110 L164,58" />
        <path d="M164,58 C168,66 168,80 170,86" />
        <circle cx="192" cy="88" r="22" />
        <path d="M214,58 L214,110" />
        <path d="M214,110 L226,110" />
        <path d="M263,110 L272,110" />
        <path d="M272,30 L272,110" />
        <path d="M272,110 C282,111 286,99 290,88" />
        <circle cx="312" cy="88" r="22" />
        <path d="M334,58 L334,110" />
        <path d="M334,110 L348,110" />
        <path d="M348,30 L348,110" />
        <circle cx="368" cy="88" r="22" />
        <path d="M390,88 C396,80 402,74 407,69" />
        <path d="M431,67 C431,54 410,53 408,68 C406,80 431,80 429,95 C427,110 406,110 404,98" />
        <path d="M18,110 L26,110" />
      </g>
      <path
        d="M227,60 C227,42 258,40 259,61 C260,76 242,87 230,99 L226,110 L263,110"
        stroke="#15C0E0"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="110" r="6.5" fill="#15C0E0" />
    </svg>
  );
}

const serviceLinks = SERVICES.map((s) => ({ label: s.title, slug: s.slug }));

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* Pre-footer CTA banner */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-primary">
        <div className="absolute inset-0 grid-bg opacity-15" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <p className="mb-2 text-sm font-medium text-primary-foreground/80">
              Ready to ship something great?
            </p>
            <h3 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
              Let's build your next project together.
            </h3>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-primary-foreground px-7 py-4 text-sm font-bold text-primary shadow-elegant transition-all hover:scale-[1.03]"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <Logo />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A senior-led engineering studio building production AI systems, software platforms
                and cloud infrastructure — fixed scope, documented, and fully yours on handover.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {CONTACT_EMAIL}
                </a>
                {Object.entries(SOCIAL)
                  .filter(([, href]) => href)
                  .map(([key, href]) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
                    >
                      {key === "github" ? (
                        <Github className="h-4 w-4" />
                      ) : key === "linkedin" ? (
                        <Linkedin className="h-4 w-4" />
                      ) : (
                        <Twitter className="h-4 w-4" />
                      )}
                    </a>
                  ))}
              </div>
            </div>

            <div className="hidden md:col-span-1 md:block" />

            {/* Company links */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold text-foreground mb-5">Company</h4>
              <ul className="space-y-3.5 text-sm">
                {[
                  { to: "/", label: "Home" },
                  { to: "/services", label: "Services" },
                  { to: "/work", label: "Work" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to as "/"}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold text-foreground mb-5">Services</h4>
              <ul className="space-y-3.5 text-sm">
                {serviceLinks.map(({ label, slug }) => (
                  <li key={slug}>
                    <Link
                      to="/services/$slug"
                      params={{ slug }}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold text-foreground mb-5">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="break-all">{CONTACT_EMAIL}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  Remote · {LOCATION.serves}
                </li>
              </ul>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/8 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/15"
              >
                Free estimate <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} nova2labs. All rights reserved.</span>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono">Accepting new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
