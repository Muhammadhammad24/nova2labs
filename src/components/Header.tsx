import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "motion/react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 452 140"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      role="img"
      aria-label="nova2labs"
      className={className}
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-border/80 bg-background/80 backdrop-blur-2xl shadow-elegant"
            : "border-b border-transparent bg-background/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="group flex items-center" aria-label="nova2labs home">
            <Logo className="h-7 w-auto text-foreground transition-opacity group-hover:opacity-80 md:h-[52px]" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-foreground bg-secondary" }}
                inactiveProps={{
                  className: "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
                }}
                className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              to="/contact"
              className="hidden items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.03] md:inline-flex"
            >
              Start a project
            </Link>
            {/* Mobile burger */}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:bg-secondary md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5"
              aria-label="Mobile navigation"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "text-foreground bg-secondary" }}
                    inactiveProps={{ className: "text-muted-foreground" }}
                    className="flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: nav.length * 0.05 }}
                className="mt-3 pt-3 border-t border-border"
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
                >
                  Start a project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
