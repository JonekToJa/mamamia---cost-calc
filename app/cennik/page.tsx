import Link from "next/link";
import { AppFrame } from "@/components/AppFrame";
import { TrustBand } from "@/components/TrustBand";
import { AntiFrictionBadge } from "@/components/AntiFrictionBadge";
import { ChevronRight, Heart } from "@/components/icons";

const STEPS = [
  {
    n: 1,
    t: "Answer 5 questions",
    d: "Care level, region, mobility, nights, dementia. Two minutes, no sign-up.",
  },
  {
    n: 2,
    t: "See the real cost",
    d: "A from–to range after subsidies — not a single inflated number.",
  },
  {
    n: 3,
    t: "Meet caregivers",
    d: "We show availability in your area and the estimated start time.",
  },
];

export default function CennikPage() {
  return (
    <AppFrame width="wide">
      {/* Hero — warm, not transactional */}
      <section className="pt-4">
        <span className="pill bg-accent-100 text-accent-800">
          <Heart className="h-3.5 w-3.5" fill="currentColor" stroke="none" />
          Care you can afford
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          What does round-the-clock care for your mum really cost —{" "}
          <span className="text-accent-700">after subsidies?</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Work out your real monthly out-of-pocket cost in two minutes. No
          sign-up, no personal details — just the figure you&apos;ll actually pay.
        </p>

        <div className="mt-7">
          <Link href="/kalkulator" className="btn-primary">
            Calculate the cost
            <ChevronRight className="h-5 w-5" />
          </Link>
          <div className="mt-3">
            <AntiFrictionBadge
              items={["Free", "Anonymous", "No sign-up", "2 minutes"]}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <TrustBand />
        </div>
      </section>

      {/* How it works — 3 steps */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight text-ink">
          How it works
        </h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {STEPS.map((k) => (
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
            Start — calculate the cost
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </AppFrame>
  );
}
