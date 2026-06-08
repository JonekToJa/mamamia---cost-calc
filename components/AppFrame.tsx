import Link from "next/link";
import { Brand } from "./Brand";

// True site header: logo on the left, nav links on its right.
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
  activeTab = "calculator",
}: {
  children: React.ReactNode;
  width?: "narrow" | "wide";
  activeTab?: string;
}) {
  const w = width === "wide" ? "max-w-2xl" : "max-w-screenpad";
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-5">
          {/* Logo — top left */}
          <Link href="/cennik" aria-label="mamamia home">
            <Brand />
          </Link>

          {/* Nav links — to the right of the logo */}
          <nav aria-label="Primary" className="flex items-center gap-1">
            <div className="hidden items-center gap-1 md:flex">
              {TABS.map((t) => {
                const active = t.id === activeTab;
                const cls = `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent-50 text-accent-700"
                    : "text-ink-soft hover:bg-line/40 hover:text-ink"
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
            <a
              href="#"
              className="ml-1 rounded-lg px-3 py-2 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
            >
              Sign in
            </a>
          </nav>
        </div>
      </header>

      <main className={`mx-auto px-5 pb-20 pt-6 ${w}`}>{children}</main>
    </div>
  );
}
