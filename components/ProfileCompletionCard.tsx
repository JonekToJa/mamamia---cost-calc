import { PRZYKLAD } from "@/lib/dane-przykladowe";
import { Check, Phone, ChevronRight } from "./icons";

const SECTIONS = [
  { name: "Assistive devices", done: true },
  { name: "Tasks & activities", done: true },
  { name: "Caregiver accommodation", done: false },
  { name: "Caregiver preferences", done: false },
  { name: "Additional notes", done: false },
];

// The platform's MAIN card: a quote builder to finish.
export function ProfileCompletionCard() {
  const p = PRZYKLAD;
  return (
    <div className="card border-accent-200 bg-accent-50/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">
            Finish your care profile
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            The more detail you add, the better the caregiver match.
          </p>
        </div>
        <span className="pill shrink-0 border border-accent-200 bg-white text-accent-700">
          quote builder
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">Completed</span>
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

      {/* Remaining sections */}
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

      {/* Two paths */}
      <div className="mt-4 flex flex-col gap-2.5">
        <button type="button" className="btn-primary">
          Finish it yourself (5 min)
        </button>
        <button type="button" className="btn-secondary">
          <Phone className="h-4 w-4" />
          or an advisor completes it with you by phone
        </button>
      </div>
    </div>
  );
}
