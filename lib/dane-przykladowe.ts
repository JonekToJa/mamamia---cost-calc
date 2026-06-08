// Sample data — selections + identity used to seed the screens.
// Prices and availability are NO LONGER hard-coded here: they are computed live
// from the selection by lib/pricing.ts. This object only holds defaults and placeholders.

export const PRZYKLAD = {
  // --- calculator answers (default selected chips) ---
  stopienOpieki: 3, // 2 | 3 | 4 | 5 | 'nie_wiem'
  region: "60-xxx", // postcode (placeholder)
  mobilnosc: "ograniczona", // 'pelna' | 'ograniczona' | 'lezacy'
  noce: "brak", // 'brak' | 'sporadyczne' | 'regularne'
  demencja: "nie", // 'nie' | 'tak'
  poziomJezyka: "dobry", // 'podstawowy' | 'dobry' | 'bardzo_dobry'
  doswiadczenie: "standard", // 'standard' | 'doswiadczona'

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
