import { PRZYKLAD, eur } from "@/lib/dane-przykladowe";
import { wycena, dostepnosc, type CalcInput, type Stopien } from "@/lib/pricing";
import { Users, Clock } from "./icons";

// "Your estimate" card on the platform — computed from the stored selection,
// same model and same visual language as the calculator.
const input: CalcInput = {
  stopienOpieki: PRZYKLAD.stopienOpieki as Stopien,
  mobilnosc: PRZYKLAD.mobilnosc,
  demencja: PRZYKLAD.demencja,
  noce: PRZYKLAD.noce,
  regionRzadki: false,
};

export function EstimateSummaryCard() {
  const w = wycena(input);
  const d = dostepnosc(input);
  return (
    <div className="card">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-ink">Your estimate</h2>
        <span className="pill bg-accent-100 text-accent-800">estimate</span>
      </div>
      <p className="tnum mt-2 text-2xl font-bold text-accent-700">
        {eur(w.nettoMin)} – {eur(w.nettoMax)}
        <span className="text-sm font-normal text-ink-soft"> / mo net</span>
      </p>
      <p className="tnum mt-1 text-sm text-ink-faint">
        Cost {eur(w.bruttoMin)}–{eur(w.bruttoMax)} − subsidies ~
        {eur(w.dofinansowanie)}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line pt-3 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-accent-600" />≈ {d.liczbaOpiekunow}{" "}
          caregivers
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-accent-600" />
          starts in {d.startDni}
        </span>
      </div>
    </div>
  );
}
