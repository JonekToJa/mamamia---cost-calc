import { Heart } from "./icons";

export type Patient = { label: string; meta: string };

export function PatientList({ patients }: { patients: Patient[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {patients.map((p, i) => (
        <li
          key={i}
          className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-700">
            <Heart className="h-4 w-4" fill="currentColor" stroke="none" />
          </span>
          <div className="min-w-0">
            <p className="font-medium text-ink">{p.label}</p>
            <p className="truncate text-sm text-ink-faint">{p.meta}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
