"use client";

import { Plus } from "./icons";

export function AddPatientButton({
  onClick,
  label = "Add another person",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-accent-300 bg-accent-50/40 px-4 py-3.5 text-base font-medium text-accent-700 transition-colors hover:border-accent-400 hover:bg-accent-50"
    >
      <Plus className="h-5 w-5" />
      {label}
    </button>
  );
}
