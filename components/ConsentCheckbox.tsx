"use client";

import { Check } from "./icons";

export function ConsentCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="flex w-full items-start gap-3 text-left"
    >
      <span
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
          checked
            ? "border-accent-500 bg-accent-500 text-white"
            : "border-line bg-white"
        }`}
      >
        {checked && <Check className="h-4 w-4" />}
      </span>
      <span className="text-sm leading-relaxed text-ink-soft">{children}</span>
    </button>
  );
}
