import { Users } from "./icons";

// Couple-care note — secondary, info-tinted, shown right before the result CTA.
export function CoupleCareNote() {
  return (
    <div className="flex gap-3 rounded-xl border border-info-100 bg-info-50 p-4 text-sm text-info-700">
      <Users className="mt-0.5 h-5 w-5 shrink-0 text-info-600" />
      <p>
        <span className="font-medium">Caring for more than one person?</span> You
        can add more people after signing up — your advisor will prepare a
        combined quote.
      </p>
    </div>
  );
}
