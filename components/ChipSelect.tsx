"use client";

import { Check } from "./icons";

export type ChipOption = { value: string; label: string };

export function ChipSelect({
  options,
  value,
  onChange,
  columns = 1,
  ariaLabel,
}: {
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
  ariaLabel?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`grid gap-2.5 ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            type="button"
            key={o.value}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 text-left text-base transition-colors ${
              selected
                ? "border-accent-500 bg-accent-50 text-ink ring-1 ring-accent-500"
                : "border-line bg-white text-ink-soft hover:border-accent-200 hover:bg-accent-50/40"
            }`}
          >
            <span className="font-medium">{o.label}</span>
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                selected
                  ? "border-accent-500 bg-accent-500 text-white"
                  : "border-line"
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
