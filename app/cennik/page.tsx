import { AppFrame } from "@/components/AppFrame";
import { TrustBand } from "@/components/TrustBand";
import { AntiFrictionBadge } from "@/components/AntiFrictionBadge";
import { StartEstimateForm } from "@/components/StartEstimateForm";
import { ChevronRight, Heart } from "@/components/icons";

const STEPS = [
  {
    n: 1,
    t: "Answer 5 quick questions",
    d: "Just the few things that move the price the most — care level, mobility, nights and dementia. Two minutes, no sign-up.",
  },
  {
    n: 2,
    t: "See your real cost",
    d: "A clear from–to estimate after subsidies — what you'll actually pay each month, not an inflated headline number.",
  },
  {
    n: 3,
    t: "Request care & get matched",
    d: "Happy with the estimate? Post your care request and an advisor lines up available caregivers near you, with a clear start time.",
  },
];

export default function CennikPage() {
  return (
    <AppFrame width="wide">
      {/* Heading section */}
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
          Get a free, no-obligation estimate of what you&apos;ll really pay each
          month — then request care and we&apos;ll line up available caregivers
          near you. No sign-up to see your numbers.
        </p>

        <div className="mt-7">
          <a href="#start" className="btn-primary">
            Get your estimate
            <ChevronRight className="h-5 w-5" />
          </a>
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

      {/* How it works */}
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
      </section>

      {/* Starter form — continue into the whole calculator */}
      <section id="start" className="mt-12 scroll-mt-28">
        <StartEstimateForm />
      </section>
    </AppFrame>
  );
}
