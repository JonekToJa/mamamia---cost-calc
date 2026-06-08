import Link from "next/link";
import { PRZYKLAD } from "@/lib/dane-przykladowe";
import {
  Grid,
  Shield,
  Users,
  MessageCircle,
  FileText,
  Cog,
  LogOut,
  Heart,
} from "./icons";

const NAV = [
  { label: "Dashboard", Icon: Grid, active: true },
  { label: "Care profile", Icon: Shield, active: false },
  { label: "Caregivers", Icon: Users, active: false },
  { label: "Messages", Icon: MessageCircle, active: false },
  { label: "Documents", Icon: FileText, active: false },
  { label: "Settings", Icon: Cog, active: false },
];

function maskKontakt(k: string) {
  if (k.includes("@")) {
    const [local, domain] = k.split("@");
    return `${local.slice(0, 2)}•••@${domain}`;
  }
  const digits = k.replace(/\s+/g, "");
  return `${digits.slice(0, 3)}•••${digits.slice(-2)}`;
}

// App shell for the mock platform: a left nav bar + a content area that keeps
// the same warm, card-based look as the calculator, so the experience feels continuous.
export function PlatformShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const p = PRZYKLAD;
  return (
    <div className="flex min-h-dvh bg-canvas">
      {/* Left nav bar */}
      <aside className="sticky top-0 flex h-dvh w-16 shrink-0 flex-col border-r border-line bg-white md:w-60">
        <div className="flex h-14 items-center px-3 md:px-5">
          <Link
            href="/cennik"
            aria-label="mamamia home"
            className="flex items-center gap-2"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-600 text-white">
              <Heart className="h-4 w-4" fill="currentColor" stroke="none" />
            </span>
            <span className="hidden text-lg font-semibold tracking-tight text-ink md:inline">
              mamamia
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-3 md:px-3">
          {NAV.map(({ label, Icon, active }) => (
            <a
              key={label}
              href="#"
              aria-current={active ? "page" : undefined}
              title={label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent-50 text-accent-700"
                  : "text-ink-soft hover:bg-canvas hover:text-ink"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden md:inline">{label}</span>
            </a>
          ))}
        </nav>

        <div className="border-t border-line p-2 md:p-3">
          <a
            href="#"
            title="Sign out"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className="hidden md:inline">Sign out</span>
          </a>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-line bg-canvas/85 px-5 backdrop-blur">
          <h2 className="text-base font-semibold text-ink">{title}</h2>
          <div className="flex items-center gap-2.5">
            <span className="hidden text-sm text-ink-faint sm:inline">
              {maskKontakt(p.kontakt)}
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-100 text-sm font-semibold text-accent-700">
              {p.imie.charAt(0)}
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-screenpad px-5 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
