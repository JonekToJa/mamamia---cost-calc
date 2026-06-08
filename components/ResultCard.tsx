import { eur } from "@/lib/dane-przykladowe";
import type { Wycena, Dostepnosc } from "@/lib/pricing";
import { Users, Clock, Info } from "./icons";

// Result screen — NET = the hero. Hierarchy: net → breakdown → food shown separately → availability (prominent).
export function ResultCard({
  wyc,
  dost,
}: {
  wyc: Wycena;
  dost: Dostepnosc;
}) {
  return (
    <div className="card">
      <p className="text-sm font-medium text-ink-soft">
        Your estimated cost of care
      </p>

      {/* 1. Net — the hero */}
      <div className="mt-2">
        <p className="text-sm text-ink-soft">you really pay</p>
        <p className="tnum mt-1 text-4xl font-bold leading-none tracking-tight text-accent-700">
          {eur(wyc.nettoMin)} – {eur(wyc.nettoMax)}
        </p>
        <p className="mt-2 text-sm text-ink-soft">per month, after subsidies</p>
      </div>

      {/* 2. Breakdown: gross − subsidies */}
      <div className="tnum mt-4 rounded-xl bg-canvas px-4 py-3 text-sm text-ink-soft">
        Cost{" "}
        <span className="font-medium text-ink">
          {eur(wyc.bruttoMin)}–{eur(wyc.bruttoMax)}
        </span>{" "}
        − subsidies{" "}
        <span className="font-medium text-ink">~{eur(wyc.dofinansowanie)}</span>
      </div>

      {/* Night care fork — regular nights need a separate quote */}
      {wyc.nocyInfo && (
        <div className="mt-3 flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-sm text-amber-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <span>
            <span className="font-medium">Regular night care</span> needs a
            custom quote — an advisor picks the right model (two-shift or
            ambulatory support) and confirms the exact cost. The range above does
            not include nights.
          </span>
        </div>
      )}

      {/* 3. Food / utilities — ALWAYS shown separately */}
      <p className="tnum mt-3 text-sm text-ink-faint">
        + caregiver&apos;s food &amp; utilities ~
        {eur(wyc.kosztWyzywieniaOsobno[0])}–{eur(wyc.kosztWyzywieniaOsobno[1])} /
        mo
      </p>

      {/* 4. Availability — prominent */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-accent-200 bg-accent-50 p-3 text-center">
          <Users className="mx-auto h-5 w-5 text-accent-600" />
          <p className="tnum mt-1 text-xl font-bold text-accent-700">
            ≈ {dost.liczbaOpiekunow}
          </p>
          <p className="text-xs text-ink-soft">caregivers in your area</p>
        </div>
        <div className="rounded-xl border border-accent-200 bg-accent-50 p-3 text-center">
          <Clock className="mx-auto h-5 w-5 text-accent-600" />
          <p className="mt-1 text-xl font-bold text-accent-700">
            {dost.startDni}
          </p>
          <p className="text-xs text-ink-soft">estimated start</p>
        </div>
      </div>
    </div>
  );
}
