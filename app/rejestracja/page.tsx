"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppFrame } from "@/components/AppFrame";
import { ProgressDots } from "@/components/ProgressDots";
import { ChipSelect } from "@/components/ChipSelect";
import { ContactToggleField } from "@/components/ContactToggleField";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";
import { ChevronRight, Lock, Eye, EyeOff } from "@/components/icons";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-ink">{label}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function RejestracjaPage() {
  const router = useRouter();
  // Sign-up form — no validation, nothing is saved (prototype).
  const [termin, setTermin] = useState("od_zaraz");
  const [pokoj, setPokoj] = useState("tak");
  const [haslo, setHaslo] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [zgoda, setZgoda] = useState(false);

  return (
    <AppFrame>
      <div className="pt-2">
        <ProgressDots current={7} total={7} label="Create your account" />
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Almost there — create your account
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          A few quick details so your advisor can match caregivers to your
          situation.
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-7">
        <Field label="When is care needed?">
          <ChipSelect
            ariaLabel="Start date"
            value={termin}
            onChange={setTermin}
            options={[
              { value: "od_zaraz", label: "As soon as possible" },
              { value: "dwa_tygodnie", label: "Within 2 weeks" },
              { value: "ten_miesiac", label: "This month" },
              { value: "inny", label: "Another date" },
            ]}
          />
        </Field>

        <Field label="Is there a separate room for the caregiver?">
          <ChipSelect
            ariaLabel="Separate room"
            value={pokoj}
            onChange={setPokoj}
            columns={2}
            options={[
              { value: "tak", label: "Yes" },
              { value: "nie", label: "No" },
            ]}
          />
        </Field>

        <Field label="How should we reach you?">
          <ContactToggleField />
        </Field>

        <Field label="Set a password">
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" />
            <input
              type={showPwd ? "text" : "password"}
              value={haslo}
              onChange={(e) => setHaslo(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              className="w-full rounded-2xl border border-line bg-white py-4 pl-11 pr-12 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-accent-400 focus:ring-2 focus:ring-accent-200"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-faint transition-colors hover:text-ink"
            >
              {showPwd ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            You&apos;ll use this to sign in to your family panel.
          </p>
        </Field>

        <div className="rounded-2xl border border-line bg-white p-4">
          <ConsentCheckbox checked={zgoda} onChange={setZgoda}>
            I agree to be contacted about arranging care and accept the terms and
            privacy policy.
          </ConsentCheckbox>
        </div>

        <div>
          <button
            type="button"
            onClick={() => router.push("/platforma")}
            className="btn-primary"
          >
            Create account
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </AppFrame>
  );
}
