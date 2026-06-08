import { PRZYKLAD, eur } from "@/lib/dane-przykladowe";
import { Users, Clock } from "./icons";

// Result screen — NET = the hero. Hierarchy: net → breakdown → food shown separately → availability teaser.
export function ResultCard() {
  const p = PRZYKLAD;
  return (
    <div className="card">
      <p className="text-sm font-medium text-ink-soft">
        Your estimated cost of care
      </p>

      {/* 1. Net — the hero */}
      <div className="mt-2">
        <p className="text-sm text-ink-soft">you really pay</p>
        <p className="tnum mt-1 text-4xl font-bold leading-none tracking-tight text-accent-700">
          {eur(p.nettoMin)} – {eur(p.nettoMax)}
        </p>
        <p className="mt-2 text-sm text-ink-soft">per month, after subsidies</p>
      </div>

      {/* 2. Breakdown: gross − subsidies */}
      <div className="tnum mt-4 rounded-xl bg-canvas px-4 py-3 text-sm text-ink-soft">
        Cost{" "}
        <span className="font-medium text-ink">
          {eur(p.bruttoMin)}–{eur(p.bruttoMax)}
        </span>{" "}
        − subsidies{" "}
        <span className="font-medium text-ink">~{eur(p.dofinansowanie)}</span>
      </div>

      {/* 3. Food / utilities — ALWAYS shown separately */}
      <p className="tnum mt-3 text-sm text-ink-faint">
        + caregiver&apos;s food &amp; utilities ~{eur(p.wyzywienieMin)}–
        {eur(p.wyzywienieMax)} / mo
      </p>

      {/* 4. Availability teaser */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-line pt-4 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-accent-600" />≈ {p.liczbaOpiekunow}{" "}
          caregivers in your area
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-accent-600" />
          starts in {p.startDni}
        </span>
      </div>
    </div>
  );
}
