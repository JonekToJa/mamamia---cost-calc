import Link from "next/link";
import { AppFrame } from "@/components/AppFrame";
import { TrustBand } from "@/components/TrustBand";
import { AntiFrictionBadge } from "@/components/AntiFrictionBadge";
import { ChevronRight, Heart } from "@/components/icons";

const KROKI = [
  {
    n: 1,
    t: "Odpowiadasz na 5 pytań",
    d: "Stopień opieki, region, mobilność, noce, demencja. Dwie minuty, bez rejestracji.",
  },
  {
    n: 2,
    t: "Widzisz realny koszt",
    d: "Widełki „od–do” po odliczeniu dofinansowania — nie jedną zawyżoną liczbę.",
  },
  {
    n: 3,
    t: "Poznajesz opiekunów",
    d: "Pokazujemy dostępność w Twoim regionie i szacowany czas startu opieki.",
  },
];

export default function CennikPage() {
  return (
    <AppFrame width="wide">
      {/* Hero — ciepły, nie transakcyjny */}
      <section className="pt-4">
        <span className="pill bg-accent-100 text-accent-800">
          <Heart className="h-3.5 w-3.5" fill="currentColor" stroke="none" />
          Opieka, na którą Cię stać
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          Ile kosztuje całodobowa opieka dla Twojej mamy —{" "}
          <span className="text-accent-700">po odliczeniu dofinansowania?</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Policz realny, miesięczny wkład własny w dwie minuty. Bez rejestracji,
          bez podawania danych — zobacz kwotę, którą faktycznie zapłacisz.
        </p>

        <div className="mt-7">
          <Link href="/kalkulator" className="btn-primary">
            Policz koszt opieki
            <ChevronRight className="h-5 w-5" />
          </Link>
          <div className="mt-3">
            <AntiFrictionBadge
              items={["Bezpłatnie", "Anonimowo", "Bez rejestracji", "2 minuty"]}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <TrustBand />
        </div>
      </section>

      {/* Jak to działa — 3 kroki */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          Jak to działa
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {KROKI.map((k) => (
            <li key={k.n} className="card">
              <span className="tnum grid h-9 w-9 place-items-center rounded-full bg-accent-600 text-base font-semibold text-white">
                {k.n}
              </span>
              <h3 className="mt-3 font-semibold text-ink">{k.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {k.d}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <Link href="/kalkulator" className="btn-primary">
            Zacznij — policz koszt
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </AppFrame>
  );
}
