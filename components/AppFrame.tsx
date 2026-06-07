import Link from "next/link";
import { Brand } from "./Brand";

export function AppFrame({
  children,
  width = "narrow",
  topRight,
}: {
  children: React.ReactNode;
  width?: "narrow" | "wide";
  topRight?: React.ReactNode;
}) {
  const w = width === "wide" ? "max-w-2xl" : "max-w-screenpad";
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-10 border-b border-line/70 bg-canvas/85 backdrop-blur">
        <div className={`mx-auto flex h-14 items-center justify-between px-5 ${w}`}>
          <Link href="/cennik" aria-label="mamamia — strona główna">
            <Brand />
          </Link>
          {topRight}
        </div>
      </header>
      <main className={`mx-auto px-5 pb-20 pt-6 ${w}`}>{children}</main>
    </div>
  );
}
