// Dane na sztywno — JEDEN obiekt, z którego czytają wszystkie ekrany.
// To prototyp PRZELOTOWY: ekrany czytają z PRZYKLAD, nic nie liczą i nic nie zapisują.
// Liczby zgodne z modelem wyceny (przykład typowy: stopień 3, język dobry, mobilność ograniczona).

export const PRZYKLAD = {
  // --- odpowiedzi kalkulatora (domyślne zaznaczenia chipów) ---
  stopienOpieki: 3, // 2 | 3 | 4 | 5 | 'nie_wiem'
  region: "60-xxx", // kod pocztowy (placeholder)
  mobilnosc: "ograniczona", // 'pelna' | 'ograniczona' | 'lezacy'
  noce: "brak", // 'brak' | 'sporadyczne' | 'regularne'
  demencja: "nie", // 'nie' | 'tak'
  poziomJezyka: "dobry", // 'podstawowy' | 'dobry' | 'bardzo_dobry'
  doswiadczenie: "standard", // 'standard' | 'doswiadczona'

  // --- wynik kalkulatora (na sztywno) ---
  bruttoMin: 2720,
  bruttoMax: 3140,
  dofinansowanie: 1132, // świadczenie 599 + opieka zastępcza 200 + ulga 333
  nettoMin: 1590,
  nettoMax: 2010,
  wyzywienieMin: 200,
  wyzywienieMax: 350,

  // --- dostępność (na sztywno) ---
  liczbaOpiekunow: 6,
  startDni: "~7 dni",

  // --- rejestracja (placeholder) ---
  imie: "Anna",
  kanal: "email" as "email" | "telefon",
  kontakt: "anna.kowalska@przyklad.pl",

  // --- platforma ---
  postepProfilu: 40, // %
} as const;

// Formatowanie waluty PL
export const eur = (n: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
