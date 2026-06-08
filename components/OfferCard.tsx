import { PRZYKLAD, eur } from "@/lib/dane-przykladowe";
import { wycena, dostepnosc, type CalcInput, type Stopien } from "@/lib/pricing";
import { Users, Clock, Check, ChevronRight, Phone } from "./icons";

// Dashboard: estimate + "finish your offer" merged into one section.
const input: CalcInput = {
  stopienOpieki: PRZYKLAD.stopienOpieki as Stopien,
  mobilnosc: PRZYKLAD.mobilnosc,
  demencja: PRZYKLAD.demencja,
  noce: PRZYKLAD.noce,
  regionRzadki: false,
};

const SECTIONS = [
  { name: "Assistive devices", done: true },
  { name: "Tasks & activities", done: true },
  { name: "Caregiver accommodation", done: false },
  { name: "Caregiver preferences", done: false },
  { name: "Additional notes", done: false },
];

export function OfferCard() {
  const w = wycena(input);
  const d = dostepnosc(input);
  return (
    <div className="card">
      {/* Your estimate */}
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
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4 text-accent-600" />≈ {d.liczbaOpiekunow}{" "}
          caregivers
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-accent-600" />
          starts in {d.startDni}
        </span>
      </div>

      <hr className="my-5 border-line" />

      {/* Finish your offer */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">Finish your offer</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Complete the details so we can post your request and caregivers can
            send you offers.
          </p>
        </div>
        <span className="pill shrink-0 border border-accent-200 bg-white text-accent-700">
          offer
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">Completed</span>
          <span className="tnum font-semibold text-accent-700">
            {PRZYKLAD.postepProfilu}%
          </span>
        </div>
        <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-canvas">
          <div
            className="h-full rounded-full bg-accent-500 transition-all"
            style={{ width: `${PRZYKLAD.postepProfilu}%` }}
          />
        </div>
      </div>

      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
        {SECTIONS.map((s) => (
          <li
            key={s.name}
            className="flex items-center justify-between px-4 py-3 text-sm"
          >
            <span
              className={`inline-flex items-center gap-2.5 ${
                s.done ? "text-ink-faint" : "text-ink"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  s.done
                    ? "bg-accent-500 text-white"
                    : "border border-line bg-white"
                }`}
              >
                {s.done && <Check className="h-3 w-3" />}
              </span>
              <span className={s.done ? "line-through" : ""}>{s.name}</span>
            </span>
            {!s.done && <ChevronRight className="h-4 w-4 text-ink-faint" />}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2.5">
        <button type="button" className="btn-primary">
          Finish it yourself (5 min)
        </button>
        <button type="button" className="btn-secondary">
          <Phone className="h-4 w-4" />I need help
        </button>
      </div>
    </div>
  );
}
