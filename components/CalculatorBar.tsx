"use client";

import { PRZYKLAD, eur } from "@/lib/dane-przykladowe";
import { ChevronLeft, ChevronRight } from "./icons";

// Sticky bottom navigation for the calculator:
// left = live estimate + all the info, right = Back + Next.
export function CalculatorBar({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel: string;
}) {
  const p = PRZYKLAD;
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-screenpad items-center gap-3 px-5 py-3">
        {/* Left — estimate */}
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
            You really pay
          </p>
          <p className="tnum text-lg font-bold leading-tight text-accent-700">
            {eur(p.nettoMin)}–{eur(p.nettoMax)}
            <span className="text-xs font-normal text-ink-soft"> / mo</span>
          </p>
          <p className="tnum mt-0.5 hidden truncate text-xs text-ink-faint sm:block">
            Cost {eur(p.bruttoMin)}–{eur(p.bruttoMax)} − subsidies ~
            {eur(p.dofinansowanie)}
          </p>
        </div>

        {/* Right — Back + Next */}
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={onBack} className="btn-ghost px-3">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
          >
            {nextLabel}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
