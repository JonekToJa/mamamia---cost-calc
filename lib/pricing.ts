// 24h home-care pricing model — SINGLE person. Calibration: 2026 market.
// NOTE: orders of magnitude, NOT a real mamamia price list. Always show a from–to range.
// Ported from the pricing model doc; rates live here so they can be swapped without touching the logic.

export type PoziomJezyka = "podstawowy" | "dobry" | "bardzo_dobry";
export type Mobilnosc = "pelna" | "ograniczona" | "lezacy";
export type TakNie = "nie" | "tak";
export type Doswiadczenie = "standard" | "doswiadczona";
export type Noce = "brak" | "sporadyczne" | "regularne";
export type Stopien = 2 | 3 | 4 | 5;

export interface CalcInput {
  stopienOpieki: Stopien; // "not sure" in the UI → map to 3 (proxy) + orientational flag
  mobilnosc: Mobilnosc;
  demencja: TakNie;
  noce: Noce;
  poziomJezyka?: PoziomJezyka; // default "dobry"
  doswiadczenie?: Doswiadczenie; // default "standard"
  regionRzadki?: boolean; // from (mock) supply data per region
}

// --- Rates (monthly €) ---
const STAWKA_BAZOWA: Record<PoziomJezyka, number> = {
  podstawowy: 2300,
  dobry: 2550,
  bardzo_dobry: 2850,
};
const DODATEK_STOPIEN: Record<Stopien, number> = { 2: 0, 3: 0.06, 4: 0.12, 5: 0.18 };
const DODATEK_MOBILNOSC: Record<Mobilnosc, number> = {
  pelna: 0,
  ograniczona: 0.03,
  lezacy: 0.08,
};
const DODATEK_DEMENCJA: Record<TakNie, number> = { nie: 0, tak: 0.1 };
const MNOZNIK_DOSWIADCZENIE: Record<Doswiadczenie, number> = {
  standard: 1.0,
  doswiadczona: 1.08,
};

const KOSZT_DOJAZDU = 150;
const SWIADCZENIE_OPIEKUNCZE: Record<Stopien, number> = { 2: 347, 3: 599, 4: 800, 5: 990 };
const DOFIN_OPIEKA_ZASTEPCZA = 200;
const ULGA_PODATKOWA = 333;
export const KOSZT_WYZYWIENIA: [number, number] = [200, 350];

export interface Wycena {
  bruttoMin: number;
  bruttoMax: number;
  dofinansowanie: number;
  nettoMin: number;
  nettoMax: number;
  kosztWyzywieniaOsobno: [number, number];
  nocyInfo: "OSOBNA_WYCENA" | null;
}

export function wycena(d: CalcInput): Wycena {
  const jezyk = d.poziomJezyka ?? "dobry";
  const dosw = d.doswiadczenie ?? "standard";

  const intensywnosc =
    1 +
    DODATEK_STOPIEN[d.stopienOpieki] +
    DODATEK_MOBILNOSC[d.mobilnosc] +
    DODATEK_DEMENCJA[d.demencja];

  let brutto = STAWKA_BAZOWA[jezyk] * intensywnosc * MNOZNIK_DOSWIADCZENIE[dosw];
  brutto += KOSZT_DOJAZDU;

  // Night care is a structural fork, not a plain multiplier.
  let nocyInfo: "OSOBNA_WYCENA" | null = null;
  if (d.noce === "sporadyczne") brutto += 300;
  else if (d.noce === "regularne") nocyInfo = "OSOBNA_WYCENA";

  const r = (x: number) => Math.round(x / 10) * 10;
  const bruttoMin = r(brutto * 0.93);
  const bruttoMax = r(brutto * 1.07);

  const dofinansowanie =
    SWIADCZENIE_OPIEKUNCZE[d.stopienOpieki] + DOFIN_OPIEKA_ZASTEPCZA + ULGA_PODATKOWA;

  return {
    bruttoMin,
    bruttoMax,
    dofinansowanie,
    nettoMin: Math.max(0, bruttoMin - dofinansowanie),
    nettoMax: Math.max(0, bruttoMax - dofinansowanie),
    kosztWyzywieniaOsobno: KOSZT_WYZYWIENIA,
    nocyInfo,
  };
}

// --- Availability / start time — MOCK (needs real supply data in production) ---
export type Pula = "wide" | "medium" | "narrow";
export interface Dostepnosc {
  pula: Pula;
  liczbaOpiekunow: number;
  startDni: string;
}

export function dostepnosc(d: CalcInput, pilnoscOdZaraz = false): Dostepnosc {
  const jezyk = d.poziomJezyka ?? "dobry";
  let z = 0;
  if (jezyk === "bardzo_dobry") z += 2;
  else if (jezyk === "dobry") z += 1;
  if (d.demencja === "tak") z += 1;
  if (d.mobilnosc === "lezacy") z += 1;
  if (d.regionRzadki) z += 1;
  if (pilnoscOdZaraz) z += 1;

  const liczbaOpiekunow = Math.max(1, 12 - z * 2); // MOCK
  if (z <= 1) return { pula: "wide", liczbaOpiekunow, startDni: "3–7 days" };
  if (z <= 3) return { pula: "medium", liczbaOpiekunow, startDni: "1–2 weeks" };
  return { pula: "narrow", liczbaOpiekunow, startDni: "2–4 weeks" };
}

// Mock: derive a "rare region" flag from a postcode (needs real supply data in production).
export function regionRzadki(postcode: string): boolean {
  const n = parseInt(postcode, 10);
  if (Number.isNaN(n)) return false;
  return n < 20 || n >= 90;
}
