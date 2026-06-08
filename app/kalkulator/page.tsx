"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppFrame } from "@/components/AppFrame";
import { ProgressDots } from "@/components/ProgressDots";
import { QuestionStep } from "@/components/QuestionStep";
import { ChipSelect } from "@/components/ChipSelect";
import { KodPocztowyInput } from "@/components/KodPocztowyInput";
import { ResultCard } from "@/components/ResultCard";
import { CoupleCareNote } from "@/components/CoupleCareNote";
import { AntiFrictionBadge } from "@/components/AntiFrictionBadge";
import { CalculatorBar } from "@/components/CalculatorBar";
import { ChevronLeft, ChevronRight, Info } from "@/components/icons";
import { PRZYKLAD } from "@/lib/dane-przykladowe";
import {
  wycena,
  dostepnosc,
  regionRzadki,
  type CalcInput,
  type Stopien,
  type Mobilnosc,
  type Noce,
  type TakNie,
} from "@/lib/pricing";

const TOTAL = 5;

export default function KalkulatorPage() {
  const router = useRouter();
  // Local state only — step number + selected chips (for the feel). It doesn't compute anything.
  const [step, setStep] = useState(0);
  const [stopien, setStopien] = useState<string>(String(PRZYKLAD.stopienOpieki));
  const [region, setRegion] = useState<string>(PRZYKLAD.region);
  const [mobilnosc, setMobilnosc] = useState<string>(PRZYKLAD.mobilnosc);
  const [noce, setNoce] = useState<string>(PRZYKLAD.noce);
  const [demencja, setDemencja] = useState<string>(PRZYKLAD.demencja);

  // Live pricing — recomputed from the current selection on every render (pricing model).
  // "Not sure" maps to care level 3 as a proxy (the result screen flags it as orientational).
  const input: CalcInput = {
    stopienOpieki: stopien === "nie_wiem" ? 3 : (Number(stopien) as Stopien),
    mobilnosc: mobilnosc as Mobilnosc,
    demencja: demencja as TakNie,
    noce: noce as Noce,
    regionRzadki: regionRzadki(region),
  };
  const wyc = wycena(input);
  const dost = dostepnosc(input);

  const isResult = step >= TOTAL;

  // ----- Result screen -----
  if (isResult) {
    return (
      <AppFrame>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setStep(TOTAL - 1)}
            className="btn-ghost -ml-3"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
          Done — here&apos;s your estimate
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          A rough range based on your answers.
        </p>

        {stopien === "nie_wiem" && (
          <p className="mt-3 flex gap-2.5 rounded-xl bg-accent-50 px-3.5 py-3 text-sm text-accent-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
            <span>
              You chose &lsquo;Not sure&rsquo; — this is a rough estimate. An
              advisor will help determine the exact care level.
            </span>
          </p>
        )}

        <div className="mt-5">
          <ResultCard wyc={wyc} dost={dost} />
        </div>

        {/* Couple-care note — right before the CTA */}
        <div className="mt-4">
          <CoupleCareNote />
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link href="/rejestracja" className="btn-primary">
            Create offer
            <ChevronRight className="h-5 w-5" />
          </Link>
          <p className="mt-3 text-center text-sm text-ink-faint sm:text-left">
            Free · no commitment
          </p>
        </div>
      </AppFrame>
    );
  }

  // ----- Question screens -----
  return (
    <AppFrame>
      <div className="flex flex-col gap-6 pb-28">
        <div className="flex justify-center">
          <AntiFrictionBadge />
        </div>

        <ProgressDots current={step + 1} total={TOTAL} />

        <div>
          {step === 0 && (
            <QuestionStep
              title="What level of care does the person need?"
              helper="Not sure? Pick 'Not sure' and we'll show a rough estimate — an advisor will help confirm."
            >
              <ChipSelect
                ariaLabel="Care level"
                value={stopien}
                onChange={setStopien}
                options={[
                  {
                    value: "2",
                    label: "Some support",
                    description: "Help with a few daily tasks · Level 2",
                  },
                  {
                    value: "3",
                    label: "Regular support",
                    description: "Help with most daily tasks · Level 3",
                  },
                  {
                    value: "4",
                    label: "Extensive care",
                    description: "Help with nearly all tasks · Level 4",
                  },
                  {
                    value: "5",
                    label: "Around-the-clock care",
                    description: "Full dependence, day and night · Level 5",
                  },
                  {
                    value: "nie_wiem",
                    label: "Not sure",
                    description: "We'll show a rough estimate; an advisor confirms",
                  },
                ]}
              />
            </QuestionStep>
          )}

          {step === 1 && (
            <QuestionStep
              title="Which area needs care?"
              helper="The first 2–3 digits of the postcode are enough."
            >
              <KodPocztowyInput value={region} onChange={setRegion} />
            </QuestionStep>
          )}

          {step === 2 && (
            <QuestionStep title="How mobile is the person?">
              <ChipSelect
                ariaLabel="Mobility"
                value={mobilnosc}
                onChange={setMobilnosc}
                options={[
                  { value: "pelna", label: "Fully mobile" },
                  { value: "ograniczona", label: "Limited mobility" },
                  { value: "lezacy", label: "Bedridden (transfer needed)" },
                ]}
              />
            </QuestionStep>
          )}

          {step === 3 && (
            <QuestionStep
              title="Is night-time care needed?"
              helper="Round-the-clock night care changes the care model and its cost."
              why
            >
              <ChipSelect
                ariaLabel="Night care"
                value={noce}
                onChange={setNoce}
                options={[
                  { value: "brak", label: "No" },
                  { value: "sporadyczne", label: "Occasionally" },
                  { value: "regularne", label: "Regularly" },
                ]}
              />
            </QuestionStep>
          )}

          {step === 4 && (
            <QuestionStep
              title="Does the person have dementia or need constant supervision?"
              helper="We ask to match a caregiver with the right experience."
              why
            >
              <ChipSelect
                ariaLabel="Dementia"
                value={demencja}
                onChange={setDemencja}
                columns={2}
                options={[
                  { value: "nie", label: "No" },
                  { value: "tak", label: "Yes" },
                ]}
              />
            </QuestionStep>
          )}
        </div>
      </div>

      {/* Bottom nav: estimate on the left, Back + Next on the right */}
      <CalculatorBar
        wyc={wyc}
        nextLabel={step === TOTAL - 1 ? "See estimate" : "Next"}
        onBack={() => (step === 0 ? router.push("/cennik") : setStep((s) => s - 1))}
        onNext={() => setStep((s) => s + 1)}
      />
    </AppFrame>
  );
}
