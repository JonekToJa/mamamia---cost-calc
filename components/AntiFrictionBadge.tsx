export function AntiFrictionBadge({
  items = ["Bezpłatnie", "anonimowo", "bez rejestracji"],
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-faint ${className}`}
    >
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className="text-line">
              ·
            </span>
          )}
          {it}
        </span>
      ))}
    </p>
  );
}
