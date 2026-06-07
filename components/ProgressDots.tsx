export function ProgressDots({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-ink-soft">
        Pytanie {current} z {total}
      </span>
      <div className="flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i < current ? "w-5 bg-accent-500" : "w-2 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
