import Link from "next/link";
import { Brand } from "./Brand";

// Mock top-bar tabs for the pre-register pages. "Calculator" is the real route;
// the rest are placeholders so the nav looks real.
const TABS = [
  { id: "calculator", label: "Calculator", href: "/kalkulator" },
  { id: "how", label: "How it works", href: "#" },
  { id: "costs", label: "Costs & funding", href: "#" },
  { id: "caregivers", label: "Caregivers", href: "#" },
  { id: "faq", label: "FAQ", href: "#" },
];

export function AppFrame({
  children,
  width = "narrow",
  topRight,
  activeTab = "calculator",
}: {
  children: React.ReactNode;
  width?: "narrow" | "wide";
  topRight?: React.ReactNode;
  activeTab?: string;
}) {
  const w = width === "wide" ? "max-w-2xl" : "max-w-screenpad";
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-10 bg-canvas/85 backdrop-blur">
        {/* Brand row */}
        <div
          className={`mx-auto flex h-14 items-center justify-between px-5 ${w}`}
        >
          <Link href="/cennik" aria-label="mamamia home">
            <Brand />
          </Link>
          <div className="flex items-center gap-4">
            {topRight}
            <a
              href="#"
              className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:inline"
            >
              Sign in
            </a>
          </div>
        </div>

        {/* Mock tab nav — Calculator tab is open */}
        <nav aria-label="Primary" className="border-b border-line">
          <div className={`mx-auto flex gap-1 overflow-x-auto px-3 ${w}`}>
            {TABS.map((t) => {
              const active = t.id === activeTab;
              const cls = `-mb-px whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-accent-600 text-accent-700"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`;
              return t.href.startsWith("/") ? (
                <Link
                  key={t.id}
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={cls}
                >
                  {t.label}
                </Link>
              ) : (
                <a
                  key={t.id}
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={cls}
                >
                  {t.label}
                </a>
              );
            })}
          </div>
        </nav>
      </header>

      <main className={`mx-auto px-5 pb-20 pt-6 ${w}`}>{children}</main>
    </div>
  );
}
