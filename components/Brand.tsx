import { Heart } from "./icons";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-ink ${className}`}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-600 text-white">
        <Heart className="h-4 w-4" fill="currentColor" stroke="none" />
      </span>
      mamamia
    </span>
  );
}
