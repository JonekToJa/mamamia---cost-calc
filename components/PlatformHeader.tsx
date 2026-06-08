import { PRZYKLAD } from "@/lib/dane-przykladowe";

export function PlatformHeader() {
  const p = PRZYKLAD;
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        Welcome back, {p.imie}
      </h1>
      <p className="mt-1 text-sm text-ink-soft">
        Here&apos;s an overview of your care setup.
      </p>
    </div>
  );
}
