"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppFrame } from "@/components/AppFrame";
import { ChipSelect } from "@/components/ChipSelect";
import { ContactToggleField } from "@/components/ContactToggleField";
import { ConsentCheckbox } from "@/components/ConsentCheckbox";
import { ChevronRight, Clock } from "@/components/icons";

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
  // Formularz „dla picu” — bez walidacji, bez zapisu.
  const [termin, setTermin] = useState("od_zaraz");
  const [pokoj, setPokoj] = useState("tak");
  const [zgoda, setZgoda] = useState(false);

  return (
    <AppFrame>
      <div className="pt-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Zostaw kontakt — pokażemy dostępnych opiekunów
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Jeszcze trzy szybkie pytania. Doradca dobierze opiekunów pasujących do
          Twojej sytuacji.
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-7">
        <Field label="Od kiedy potrzebna jest opieka?">
          <ChipSelect
            ariaLabel="Termin"
            value={termin}
            onChange={setTermin}
            options={[
              { value: "od_zaraz", label: "Od zaraz" },
              { value: "dwa_tygodnie", label: "W ciągu 2 tygodni" },
              { value: "ten_miesiac", label: "W tym miesiącu" },
              { value: "inny", label: "Inny termin" },
            ]}
          />
        </Field>

        <Field label="Czy jest osobny pokój dla opiekuna?">
          <ChipSelect
            ariaLabel="Osobny pokój"
            value={pokoj}
            onChange={setPokoj}
            columns={2}
            options={[
              { value: "tak", label: "Tak" },
              { value: "nie", label: "Nie" },
            ]}
          />
        </Field>

        <Field label="Jak się z Tobą skontaktować?">
          <ContactToggleField />
        </Field>

        <div className="rounded-2xl border border-line bg-white p-4">
          <ConsentCheckbox checked={zgoda} onChange={setZgoda}>
            Zgadzam się na kontakt w sprawie doboru opieki i akceptuję
            regulamin oraz politykę prywatności.
          </ConsentCheckbox>
          <p className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-sm text-ink-faint">
            <Clock className="h-4 w-4 text-accent-600" />
            Doradca odezwie się w ciągu 60 minut.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => router.push("/platforma")}
            className="btn-primary"
          >
            Zarejestruj się
            <ChevronRight className="h-5 w-5" />
          </button>
          <p className="mt-3 text-center text-sm text-ink-faint sm:text-left">
            Bez zobowiązań · w każdej chwili możesz zrezygnować.
          </p>
        </div>
      </div>
    </AppFrame>
  );
}
