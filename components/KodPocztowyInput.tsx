"use client";

export function KodPocztowyInput({
  value,
  onChange,
  placeholder = "e.g. 60",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor="postcode" className="sr-only">
        Postcode
      </label>
      <input
        id="postcode"
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
