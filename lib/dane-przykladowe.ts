// Hard-coded data — a SINGLE object every screen reads from.
// This is a CLICK-THROUGH prototype: screens read from SAMPLE, they don't compute
// anything and don't persist anything. Numbers match the pricing model
// (typical example: care level 3, good language, limited mobility).

export const PRZYKLAD = {
  // --- calculator answers (default selected chips) ---
  stopienOpieki: 3, // 2 | 3 | 4 | 5 | 'nie_wiem'
  region: "60-xxx", // postcode (placeholder)
  mobilnosc: "ograniczona", // 'pelna' | 'ograniczona' | 'lezacy'
  noce: "brak", // 'brak' | 'sporadyczne' | 'regularne'
  demencja: "nie", // 'nie' | 'tak'
  poziomJezyka: "dobry", // 'podstawowy' | 'dobry' | 'bardzo_dobry'
  doswiadczenie: "standard", // 'standard' | 'doswiadczona'

  // --- calculator result (hard-coded) ---
  bruttoMin: 2720,
  bruttoMax: 3140,
  dofinansowanie: 1132, // care benefit 599 + respite care 200 + tax relief 333
  nettoMin: 1590,
  nettoMax: 2010,
  wyzywienieMin: 200,
  wyzywienieMax: 350,

  // --- availability (hard-coded) ---
  liczbaOpiekunow: 6,
  startDni: "~7 days",

  // --- registration (placeholder) ---
  imie: "Anna",
  kanal: "email" as "email" | "telefon",
  kontakt: "anna.kowalska@example.com",

  // --- platform ---
  postepProfilu: 40, // %
} as const;

// Currency formatting (EUR, English locale → e.g. "€2,720")
export const eur = (n: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
