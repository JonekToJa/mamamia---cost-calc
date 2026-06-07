import { PRZYKLAD, eur } from "@/lib/dane-przykladowe";
import { Users, Clock } from "./icons";

// Ekran wyniku — NETTO = bohater. Hierarchia: netto → rozbicie → wyżywienie osobno → teaser dostępności.
export function ResultCard() {
  const p = PRZYKLAD;
  return (
    <div className="card">
      <p className="text-sm font-medium text-ink-soft">
        Twój szacowany koszt opieki
      </p>

      {/* 1. Netto — bohater */}
      <div className="mt-2">
        <p className="text-sm text-ink-soft">realnie płacisz</p>
        <p className="tnum mt-1 text-4xl font-bold leading-none tracking-tight text-accent-700">
          {eur(p.nettoMin)} – {eur(p.nettoMax)}
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          miesięcznie, po odliczeniu dofinansowania
        </p>
      </div>

      {/* 2. Rozbicie: brutto − dofinansowanie */}
      <div className="tnum mt-4 rounded-xl bg-canvas px-4 py-3 text-sm text-ink-soft">
        Koszt{" "}
        <span className="font-medium text-ink">
          {eur(p.bruttoMin)}–{eur(p.bruttoMax)}
        </span>{" "}
        − dofinansowanie{" "}
        <span className="font-medium text-ink">~{eur(p.dofinansowanie)}</span>
      </div>

      {/* 3. Wyżywienie / media — ZAWSZE osobno */}
      <p className="tnum mt-3 text-sm text-ink-faint">
        + wyżywienie i media opiekuna ~{eur(p.wyzywienieMin)}–
        {eur(p.wyzywienieMax)} / mies.
      </p>

      {/* 4. Teaser dostępności */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-line pt-4 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-accent-600" />≈ {p.liczbaOpiekunow}{" "}
          opiekunów w Twoim regionie
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-accent-600" />
          start {p.startDni}
        </span>
      </div>
    </div>
  );
}
