"use client";

import { useState } from "react";
import { AppFrame } from "@/components/AppFrame";
import { PlatformHeader } from "@/components/PlatformHeader";
import { EstimateSummaryCard } from "@/components/EstimateSummaryCard";
import { ProfileCompletionCard } from "@/components/ProfileCompletionCard";
import { PatientList, type Patient } from "@/components/PatientList";
import { AddPatientButton } from "@/components/AddPatientButton";
import { PRZYKLAD } from "@/lib/dane-przykladowe";

const PIERWSZA_OSOBA: Patient = {
  label: "Osoba 1 — podopieczny",
  meta: `Stopień ${PRZYKLAD.stopienOpieki} · mobilność ograniczona · bez demencji`,
};

export default function PlatformaPage() {
  // Lokalna lista osób — „Dodaj kolejną osobę” dopisuje wiersz (bez logiki pary).
  const [osoby, setOsoby] = useState<Patient[]>([PIERWSZA_OSOBA]);

  function dodajOsobe() {
    setOsoby((prev) => [
      ...prev,
      {
        label: `Osoba ${prev.length + 1} — podopieczny`,
        meta: "Szczegóły uzupełnisz z doradcą (wspólna wycena).",
      },
    ]);
  }

  return (
    <AppFrame width="wide">
      <div className="flex flex-col gap-6 pt-2">
        <PlatformHeader />

        {/* Karta szacunku */}
        <EstimateSummaryCard />

        {/* GŁÓWNA karta — oferto-kalkulator do dokończenia */}
        <ProfileCompletionCard />

        {/* Osoby pod opieką */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Osoby pod opieką
            </h2>
            <span className="tnum text-sm text-ink-faint">{osoby.length}</span>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <PatientList patients={osoby} />
            <AddPatientButton onClick={dodajOsobe} />
            <p className="text-center text-sm text-ink-faint">
              Druga osoba pod opieką? Doradca przygotuje wspólną wycenę.
            </p>
          </div>
        </section>
      </div>
    </AppFrame>
  );
}
