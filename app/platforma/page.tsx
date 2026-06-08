"use client";

import { useState } from "react";
import { PlatformShell } from "@/components/PlatformShell";
import { PlatformHeader } from "@/components/PlatformHeader";
import { EstimateSummaryCard } from "@/components/EstimateSummaryCard";
import { ProfileCompletionCard } from "@/components/ProfileCompletionCard";
import { PatientList, type Patient } from "@/components/PatientList";
import { AddPatientButton } from "@/components/AddPatientButton";
import { PRZYKLAD } from "@/lib/dane-przykladowe";

const FIRST_PERSON: Patient = {
  label: "Person 1 — care recipient",
  meta: `Care level ${PRZYKLAD.stopienOpieki} · limited mobility · no dementia`,
};

export default function PlatformaPage() {
  // Local list of people — "Add another person" appends a row (no couple logic).
  const [people, setPeople] = useState<Patient[]>([FIRST_PERSON]);

  function addPerson() {
    setPeople((prev) => [
      ...prev,
      {
        label: `Person ${prev.length + 1} — care recipient`,
        meta: "Details to be completed with your advisor (combined quote).",
      },
    ]);
  }

  return (
    <PlatformShell title="Dashboard">
      <div className="flex flex-col gap-6">
        <PlatformHeader />

        {/* Estimate card */}
        <EstimateSummaryCard />

        {/* MAIN card — quote builder to finish */}
        <ProfileCompletionCard />

        {/* People in care */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              People in care
            </h2>
            <span className="tnum text-sm text-ink-faint">{people.length}</span>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            <PatientList patients={people} />
            <AddPatientButton onClick={addPerson} />
            <p className="text-center text-sm text-ink-faint">
              Caring for a second person? Your advisor will prepare a combined
              quote.
            </p>
          </div>
        </section>
      </div>
    </PlatformShell>
  );
}
