"use client";

import { useState } from "react";
import { PRZYKLAD } from "@/lib/dane-przykladowe";
import { Mail, Phone } from "./icons";

// Przełącznik e-mail / telefon — pokazuje JEDNO pole zależnie od wyboru. Bez walidacji.
export function ContactToggleField() {
  const [kanal, setKanal] = useState<"email" | "telefon">(PRZYKLAD.kanal);
  const [email, setEmail] = useState(
    PRZYKLAD.kanal === "email" ? PRZYKLAD.kontakt : "",
  );
  const [telefon, setTelefon] = useState(
    PRZYKLAD.kanal === "telefon" ? PRZYKLAD.kontakt : "",
  );

  const opcje = [
    { k: "email" as const, label: "E-mail", Icon: Mail },
    { k: "telefon" as const, label: "Telefon", Icon: Phone },
  ];

  const inputClass =
    "w-full rounded-2xl border border-line bg-white px-4 py-4 text-base outline-none transition-colors placeholder:text-ink-faint focus:border-accent-400 focus:ring-2 focus:ring-accent-200";

  return (
    <div>
      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-1">
        {opcje.map(({ k, label, Icon }) => {
          const active = kanal === k;
          return (
            <button
              type="button"
              key={k}
              onClick={() => setKanal(k)}
              aria-pressed={active}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-accent-600 text-white"
                  : "text-ink-soft hover:bg-accent-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        {kanal === "email" ? (
          <input
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="np. jan.kowalski@poczta.pl"
            className={inputClass}
          />
        ) : (
          <input
            type="tel"
            inputMode="tel"
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            placeholder="np. 600 100 200"
            className={inputClass}
          />
        )}
      </div>
    </div>
  );
}
