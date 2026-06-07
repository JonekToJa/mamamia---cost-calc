import { Info } from "./icons";

export function QuestionStep({
  title,
  helper,
  why = false,
  children,
}: {
  title: string;
  helper?: string;
  why?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-semibold leading-snug tracking-tight text-ink">
        {title}
      </h1>
      {helper && (
        <p className="mt-3 flex gap-2.5 rounded-xl bg-accent-50 px-3.5 py-3 text-sm text-accent-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
          <span>
            {why && <span className="font-medium">Dlaczego pytamy? </span>}
            {helper}
          </span>
        </p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}
