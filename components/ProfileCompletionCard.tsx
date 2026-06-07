import { PRZYKLAD } from "@/lib/dane-przykladowe";
import { Check, Phone, ChevronRight } from "./icons";

const SEKCJE = [
  { nazwa: "Środki pomocnicze", gotowe: true },
  { nazwa: "Zadania i czynności", gotowe: true },
  { nazwa: "Zakwaterowanie opiekuna", gotowe: false },
  { nazwa: "Preferencje wobec opiekuna", gotowe: false },
  { nazwa: "Uwagi dodatkowe", gotowe: false },
];

// GŁÓWNA karta platformy: oferto-kalkulator do dokończenia.
export function ProfileCompletionCard() {
  const p = PRZYKLAD;
  return (
    <div className="card border-accent-200 bg-accent-50/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Dokończ profil opieki
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Im więcej szczegółów, tym trafniejsza oferta opiekuna.
          </p>
        </div>
        <span className="pill shrink-0 border border-accent-200 bg-white text-accent-700">
          oferto-kalkulator
        </span>
      </div>

      {/* Pasek postępu */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">Uzupełnione</span>
          <span className="tnum font-semibold text-accent-700">
            {p.postepProfilu}%
          </span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-accent-500 transition-all"
            style={{ width: `${p.postepProfilu}%` }}
          />
        </div>
      </div>

      {/* Lista pozostałych sekcji */}
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {SEKCJE.map((s) => (
          <li
            key={s.nazwa}
            className="flex items-center justify-between px-4 py-3 text-sm"
          >
            <span
              className={`inline-flex items-center gap-2.5 ${
                s.gotowe ? "text-ink-faint" : "text-ink"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  s.gotowe
                    ? "bg-accent-500 text-white"
                    : "border border-line bg-white"
                }`}
              >
                {s.gotowe && <Check className="h-3 w-3" />}
              </span>
              <span className={s.gotowe ? "line-through" : ""}>{s.nazwa}</span>
            </span>
            {!s.gotowe && <ChevronRight className="h-4 w-4 text-ink-faint" />}
          </li>
        ))}
      </ul>

      {/* Dwie ścieżki */}
      <div className="mt-4 flex flex-col gap-2.5">
        <button type="button" className="btn-primary">
          Dokończ sam (5 min)
        </button>
        <button type="button" className="btn-secondary">
          <Phone className="h-4 w-4" />
          albo doradca uzupełni z Tobą przez telefon
        </button>
      </div>
    </div>
  );
}
