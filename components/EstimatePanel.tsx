import { PRZYKLAD, eur } from "@/lib/dane-przykladowe";

// Panel estymaty „na żywo”. W przelocie NIE liczy — pokazuje stałe widełki z PRZYKLAD.
export function EstimatePanel() {
  const p = PRZYKLAD;
  return (
    <div className="rounded-2xl border border-accent-200 bg-accent-50/70 p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="pill bg-accent-100 text-accent-800">Szacunek na żywo</span>
        <span className="text-xs text-accent-700/80">
          zacieśnia się z każdą odpowiedzią
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm text-ink-soft">realnie</span>
        <span className="tnum text-2xl font-bold text-accent-700">
          {eur(p.nettoMin)}–{eur(p.nettoMax)}
        </span>
        <span className="text-sm text-ink-soft">/ mies.</span>
      </div>
      <p className="tnum mt-1 text-sm text-ink-faint">
        Koszt {eur(p.bruttoMin)}–{eur(p.bruttoMax)} − dofinansowanie ~
        {eur(p.dofinansowanie)}
      </p>
    </div>
  );
}
