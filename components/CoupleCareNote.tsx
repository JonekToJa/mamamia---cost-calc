import { Users } from "./icons";

// Notka couple-care — drugorzędna, info-tinted, pojawia się tuż przed CTA wyniku.
export function CoupleCareNote() {
  return (
    <div className="flex gap-3 rounded-xl border border-info-100 bg-info-50 p-4 text-sm text-info-700">
      <Users className="mt-0.5 h-5 w-5 shrink-0 text-info-600" />
      <p>
        <span className="font-medium">
          Opiekujesz się więcej niż jedną osobą?
        </span>{" "}
        Kolejne osoby dodasz po rejestracji — doradca przygotuje wspólną wycenę.
      </p>
    </div>
  );
}
