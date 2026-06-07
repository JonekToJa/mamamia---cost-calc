"use client";

import { useState } from "react";
import Link from "next/link";
import { AppFrame } from "@/components/AppFrame";
import { ProgressDots } from "@/components/ProgressDots";
import { QuestionStep } from "@/components/QuestionStep";
import { ChipSelect } from "@/components/ChipSelect";
import { KodPocztowyInput } from "@/components/KodPocztowyInput";
import { EstimatePanel } from "@/components/EstimatePanel";
import { ResultCard } from "@/components/ResultCard";
import { CoupleCareNote } from "@/components/CoupleCareNote";
import { AntiFrictionBadge } from "@/components/AntiFrictionBadge";
import { ChevronLeft, ChevronRight, Info } from "@/components/icons";
import { PRZYKLAD } from "@/lib/dane-przykladowe";

const TOTAL = 5;

export default function KalkulatorPage() {
  // Tylko lokalny stan — numer kroku + zaznaczone chipy (dla „feelu”). W przelocie nic nie liczy.
  const [step, setStep] = useState(0);
  const [stopien, setStopien] = useState<string>(String(PRZYKLAD.stopienOpieki));
  const [region, setRegion] = useState<string>(PRZYKLAD.region);
  const [mobilnosc, setMobilnosc] = useState<string>(PRZYKLAD.mobilnosc);
  const [noce, setNoce] = useState<string>(PRZYKLAD.noce);
  const [demencja, setDemencja] = useState<string>(PRZYKLAD.demencja);

  const isResult = step >= TOTAL;

  // ----- Ekran wyniku -----
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
            Wstecz
          </button>
        </div>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
          Gotowe — oto Twój szacunek
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Orientacyjne widełki na podstawie Twoich odpowiedzi.
        </p>

        {stopien === "nie_wiem" && (
          <p className="mt-3 flex gap-2.5 rounded-xl bg-accent-50 px-3.5 py-3 text-sm text-accent-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
            <span>
              Wybrałeś „nie wiem” — to szacunek orientacyjny. Doradca pomoże
              ustalić dokładny stopień opieki.
            </span>
          </p>
        )}

        <div className="mt-5">
          <ResultCard />
        </div>

        {/* Notka couple-care — tuż przed CTA */}
        <div className="mt-4">
          <CoupleCareNote />
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link href="/rejestracja" className="btn-primary">
            Zobacz dostępnych opiekunów
            <ChevronRight className="h-5 w-5" />
          </Link>
          <p className="mt-3 text-center text-sm text-ink-faint sm:text-left">
            Bezpłatnie · bez zobowiązań
          </p>
        </div>
      </AppFrame>
    );
  }

  // ----- Ekrany pytań -----
  return (
    <AppFrame>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <AntiFrictionBadge />
        </div>

        <ProgressDots current={step + 1} total={TOTAL} />

        {/* Panel estymaty — pojawia się od 2. ekranu */}
        {step >= 1 && <EstimatePanel />}

        <div>
          {step === 0 && (
            <QuestionStep
              title="Jaki stopień opieki ma osoba?"
              helper="Nie znasz? Wybierz „nie wiem” — pokażemy szacunek orientacyjny, a doradca pomoże ustalić."
            >
              <ChipSelect
                ariaLabel="Stopień opieki"
                value={stopien}
                onChange={setStopien}
                options={[
                  { value: "2", label: "Stopień 2" },
                  { value: "3", label: "Stopień 3" },
                  { value: "4", label: "Stopień 4" },
                  { value: "5", label: "Stopień 5" },
                  { value: "nie_wiem", label: "Nie wiem" },
                ]}
              />
            </QuestionStep>
          )}

          {step === 1 && (
            <QuestionStep
              title="W jakim regionie potrzebna jest opieka?"
              helper="Wystarczą 2–3 pierwsze cyfry kodu pocztowego."
            >
              <KodPocztowyInput value={region} onChange={setRegion} />
            </QuestionStep>
          )}

          {step === 2 && (
            <QuestionStep title="Jak mobilna jest osoba?">
              <ChipSelect
                ariaLabel="Mobilność"
                value={mobilnosc}
                onChange={setMobilnosc}
                options={[
                  { value: "pelna", label: "W pełni mobilna" },
                  { value: "ograniczona", label: "Ograniczona" },
                  { value: "lezacy", label: "Leżąca (konieczny transfer)" },
                ]}
              />
            </QuestionStep>
          )}

          {step === 3 && (
            <QuestionStep
              title="Czy potrzebna jest opieka w nocy?"
              helper="Stała opieka nocna zmienia model opieki i jej koszt."
              why
            >
              <ChipSelect
                ariaLabel="Opieka nocna"
                value={noce}
                onChange={setNoce}
                options={[
                  { value: "brak", label: "Nie" },
                  { value: "sporadyczne", label: "Sporadycznie" },
                  { value: "regularne", label: "Regularnie" },
                ]}
              />
            </QuestionStep>
          )}

          {step === 4 && (
            <QuestionStep
              title="Czy osoba ma demencję lub wymaga stałego nadzoru?"
              helper="Pytamy, by dobrać opiekuna z właściwym doświadczeniem."
              why
            >
              <ChipSelect
                ariaLabel="Demencja"
                value={demencja}
                onChange={setDemencja}
                columns={2}
                options={[
                  { value: "nie", label: "Nie" },
                  { value: "tak", label: "Tak" },
                ]}
              />
            </QuestionStep>
          )}
        </div>

        {/* Nawigacja */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step === 0 ? (
            <Link href="/cennik" className="btn-ghost -ml-3">
              <ChevronLeft className="h-4 w-4" />
              Wstecz
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-ghost -ml-3"
            >
              <ChevronLeft className="h-4 w-4" />
              Wstecz
            </button>
          )}

          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-accent-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
          >
            {step === TOTAL - 1 ? "Zobacz wynik" : "Dalej"}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </AppFrame>
  );
}
