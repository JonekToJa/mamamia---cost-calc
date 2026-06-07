"use client";

export function KodPocztowyInput({
  value,
  onChange,
  placeholder = "np. 60",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor="kod-pocztowy" className="sr-only">
        Kod pocztowy
      </label>
      <input
        id="kod-pocztowy"
        inputMode="numeric"
        autoComplete="postal-code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="tnum w-full rounded-2xl border border-line bg-white px-4 py-4 text-lg tracking-wide outline-none transition-colors placeholder:text-ink-faint focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
      />
    </div>
  );
}
