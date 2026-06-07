import { PRZYKLAD, eur } from "@/lib/dane-przykladowe";
import { Users, Clock } from "./icons";

// Karta „Twój szacunek” na platformie — kompaktowa wersja wyniku.
export function EstimateSummaryCard() {
  const p = PRZYKLAD;
  return (
    <div className="card">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-ink">Twój szacunek</h2>
        <span className="pill bg-accent-100 text-accent-800">orientacyjnie</span>
      </div>
      <p className="tnum mt-2 text-2xl font-bold text-accent-700">
        {eur(p.nettoMin)} – {eur(p.nettoMax)}
        <span className="text-sm font-normal text-ink-soft"> / mies. netto</span>
      </p>
      <p className="tnum mt-1 text-sm text-ink-faint">
        Koszt {eur(p.bruttoMin)}–{eur(p.bruttoMax)} − dofinansowanie ~
        {eur(p.dofinansowanie)}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line pt-3 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-accent-600" />≈ {p.liczbaOpiekunow}{" "}
          opiekunów
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-accent-600" />
          start {p.startDni}
        </span>
      </div>
    </div>
  );
}
