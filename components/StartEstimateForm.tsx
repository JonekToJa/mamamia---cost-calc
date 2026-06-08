"use client";

import { useState } from "react";
import Link from "next/link";
import { ChipSelect } from "./ChipSelect";
import { ChevronRight } from "./icons";
import { PRZYKLAD } from "@/lib/dane-przykladowe";

// Starter form on the landing: the single most price-relevant question + a button
// to continue into the whole calculator.
export function StartEstimateForm() {
  const [stopien, setStopien] = useState<string>(String(PRZYKLAD.stopienOpieki));

  return (
    <div className="card border-accent-200 bg-accent-50/40">
      <h2 className="text-xl font-semibold tracking-tight text-ink">
        Get your free estimate
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Start with the question that affects the price the most — you can change
        everything later.
      </p>

      <div className="mt-5">
        <p className="text-base font-medium text-ink">
          What level of care does the person need?
        </p>
        <div className="mt-3">
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
        </div>
      </div>

      <div className="mt-6">
        <Link href="/kalkulator" className="btn-primary">
          Continue to your estimate
          <ChevronRight className="h-5 w-5" />
        </Link>
        <p className="mt-3 text-sm text-ink-faint">
          Free · anonymous · no sign-up · 4 more quick questions
        </p>
      </div>
    </div>
  );
}
