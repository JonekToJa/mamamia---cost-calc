# Podsumowanie projektu — mamamia: kalkulator całodobowej opieki

Klikalny prototyp lejka pozyskania rodziny dla platformy **całodobowej opieki
domowej nad seniorem**. Celem jest przeklikanie całej ścieżki i poczucie UX —
od landingu z kalkulatorem kosztów, przez rejestrację, po panel rodziny.

Całe UI po **angielsku**. Wycena liczona jest **dynamicznie** z modelu
(`lib/pricing.ts`). Brak backendu, bazy, logowania i persystencji — to prototyp
wizualno‑funkcjonalny.

---

## 1. Stack technologiczny

| Element | Wybór |
|---|---|
| Framework | **Next.js 14.2.35** (App Router) |
| Język | **TypeScript** |
| Style | **Tailwind CSS** (paleta neutralna + jeden akcent: morska zieleń) |
| Stan | lokalny `useState` (tylko w kalkulatorze) — brak Context/Redux/localStorage |
| Nawigacja | `next/link`, `useRouter().push()` |
| Backend | brak (wszystko statyczne / liczone po stronie klienta) |

> Next przypięty do `14.2.35` — najnowsze wydanie linii 14.2.x, łatające CVE
> blokujące deploy na Railway.

---

## 2. Lejek — przepływ ekranów

```
/  →(redirect)→  /cennik  →  /kalkulator  →  /rejestracja  →  /platforma
                 landing      5 pytań +        rejestracja      panel rodziny
                 + formularz   wynik           (konto+hasło)    (lewy nav)
```

Wskaźnik postępu obejmuje **cały lejek (7 kroków)**: 5 pytań → „Your estimate" →
„Create your account".

| Ekran | Plik | Rola |
|---|---|---|
| Landing | `app/cennik/page.tsx` | Hero, pasek zaufania, formularz startowy, „How it works" |
| Kalkulator | `app/kalkulator/page.tsx` | 5 pytań + dolny pasek z wyceną na żywo + ekran wyniku |
| Rejestracja | `app/rejestracja/page.tsx` | Termin, pokój, kontakt, hasło, zgoda → konto |
| Panel | `app/platforma/page.tsx` | Mock‑aplikacja z lewym nav i kartą oferty |

---

## 3. Ekrany — szczegóły

### 3.1 Nagłówek (pre‑register)
Prawdziwy nagłówek strony (`components/AppFrame.tsx`): **logo po lewej**, linki
nawigacji po prawej (Calculator / How it works / Costs & funding / Caregivers /
FAQ) + „Sign in". Aktywna zakładka: Calculator.

### 3.2 `/cennik` — landing
1. **Sekcja nagłówkowa**: hero („What does round‑the‑clock care… really cost —
   after subsidies?"), opis (estymata → *request care*), pod opisem **pasek
   zaufania** (19 lat doświadczenia · sprawdzeni opiekunowie).
2. **Formularz startowy** (`StartEstimateForm`): najbardziej cenotwórcze pytanie
   (poziom opieki) + przycisk **„Continue to your estimate"** → pełny kalkulator.
3. **„How it works"** (3 kroki) — pod formularzem. Krok 1 podkreśla, że to
   pytania najbardziej wpływające na cenę; krok 3 mówi o wysłaniu zgłoszenia.

### 3.3 `/kalkulator` — kreator + wynik
- **5 pytań**, jeden koncept na ekran: poziom opieki (z opisami), region (kod
  pocztowy), mobilność, opieka nocna, demencja. „Why we ask" przy nocach i
  demencji.
- **Dolny przyklejony pasek** (`CalculatorBar`): po lewej **wycena na żywo**
  (netto + rozbicie), po prawej **Back / Next**. Aktualizuje się przy każdej
  zmianie chipa.
- **Ekran wyniku** — netto jako bohater:
  1. „you really pay" — duże widełki netto,
  2. rozbicie: koszt − dofinansowanie,
  3. flaga **„custom quote"** przy stałych nocach (osobna wycena),
  4. wyżywienie/media **osobno**,
  5. **wyraźny** blok dostępności (≈ liczba opiekunów / czas startu),
  6. notka couple‑care,
  7. CTA **„Find my caregiver"** → rejestracja.

### 3.4 `/rejestracja` — założenie konta
Wskaźnik postępu (7/7), pytania: termin, osobny pokój, kontakt
(**przełącznik e‑mail/telefon**), **hasło** (z pokaż/ukryj), zgoda → przycisk
**„Create account"** → panel.

### 3.5 `/platforma` — panel rodziny (mock‑app)
- **Lewy nav** (`PlatformShell`): **Care profile** (aktywne), Caregivers,
  Messages, Documents, Settings, Sign out. Na mobile zwija się do paska ikon.
- Górny pasek z tytułem sekcji i zamaskowanym kontaktem + avatar.
- **Jedna połączona karta** (`OfferCard`):
  - „Your estimate" — wyliczone netto, rozbicie, dostępność,
  - „Finish your offer" — pasek postępu (40%), lista sekcji do uzupełnienia,
    przyciski **„Finish it yourself (5 min)"** oraz **„I need help"**.

---

## 4. Model wyceny — `lib/pricing.ts` (dynamiczny)

Wycena liczona z wyboru użytkownika; stawki w configu (do podmiany bez ruszania
logiki). **To rzędy wielkości skalibrowane do rynku 2026, nie cennik mamamia.**

### Wzór (miesięcznie, €)
```
KOSZT_BRUTTO = STAWKA_BAZOWA[język] × MNOŻNIK_INTENSYWNOŚCI × MNOŻNIK_DOŚWIADCZENIA
             + KOSZT_DOJAZDU (+ KOSZT_NOCY)
MNOŻNIK_INTENSYWNOŚCI = 1 + dodatek(stopień) + dodatek(mobilność) + dodatek(demencja)
widełki = ±7%, zaokrąglone do 10 €
NETTO = BRUTTO − (świadczenie[stopień] + opieka zastępcza 200 + ulga 333)
```

### Tabele stawek
| Język (baza) | € | | Stopień | dodatek | | Mobilność | dodatek | | Demencja | dodatek |
|---|---|---|---|---|---|---|---|---|---|---|
| podstawowy | 2 300 | | SO2 | +0% | | pełna | +0% | | nie | +0% |
| dobry (dom.) | 2 550 | | SO3 | +6% | | ograniczona | +3% | | tak | +10% |
| bardzo dobry | 2 850 | | SO4 | +12% | | leżący | +8% | | | |
| | | | SO5 | +18% | | | | | | |

- **Doświadczenie**: standard ×1,00 · doświadczona ×1,08
- **Dojazd**: +150 (stała)
- **Noce**: brak +0 · sporadyczne +300 · **regularne → osobna wycena** (pokazujemy
  bazę bez nocy + komunikat)
- **Świadczenie opiekuńcze**: SO2 347 · SO3 599 · SO4 800 · SO5 990
- **Opieka zastępcza**: 200/mc · **Ulga podatkowa**: 333/mc
- **Wyżywienie/media**: 200–350/mc — **zawsze osobno**, nie w brutto/netto

### Przypadki specjalne
- **„Not sure"** (stopień) → liczone jako SO3 (proxy), wynik oznaczony jako
  orientacyjny.
- **Noce regularne** → flaga `OSOBNA_WYCENA`, pokazujemy bazę + komunikat.
- W UI **brak suwaków języka/doświadczenia** → domyślnie „dobry"/„standard".

### Dostępność (mock) — `dostepnosc()`
Scoring zawężaczy `z`: język (bardzo dobry +2 / dobry +1), demencja +1, leżący
+1, rzadki region +1, pilność +1 → `liczbaOpiekunów = max(1, 12 − 2·z)`;
`z ≤ 1` → 3–7 dni, `2–3` → 1–2 tyg., `≥ 4` → 2–4 tyg.

### Walidacja na przykładach z dokumentu
| Przypadek | Brutto | Netto |
|---|---|---|
| SO2, podstawowy, mobilny | €2 280–€2 620 | €1 400–€1 740 |
| **SO3, dobry, ograniczona (domyślny)** | **€2 720–€3 130** | **€1 588–€1 998** |
| SO4, leżący, demencja, noce regularne | €3 470–€3 990 + osobna wycena nocy | €2 137–€2 657 |

---

## 5. Komponenty (`components/`)

| Komponent | Rola |
|---|---|
| `AppFrame` | Nagłówek strony (logo + nav) + ramka treści (pre‑register) |
| `Brand` | Logo/wordmark „mamamia" |
| `TrustBand` | Pasek zaufania |
| `StartEstimateForm` | Formularz startowy na landingu (1 pytanie + „Continue") |
| `ChipSelect` | Grupa chipów (jednokrotny wybór, opcjonalny opis) |
| `KodPocztowyInput` | Pole kodu pocztowego |
| `QuestionStep` | Tytuł pytania + „Why we ask" + treść |
| `ProgressDots` | Wskaźnik postępu (etykieta + kropki) |
| `CalculatorBar` | Dolny pasek kalkulatora (wycena na żywo + Back/Next) |
| `ResultCard` | Ekran wyniku (netto, rozbicie, dostępność) |
| `CoupleCareNote` | Notka o opiece nad parą |
| `ContactToggleField` | Przełącznik e‑mail/telefon |
| `ConsentCheckbox` | Zgoda |
| `PlatformShell` | App‑shell panelu z lewym nav |
| `PlatformHeader` | Powitanie „Welcome back, Anna" |
| `OfferCard` | Połączona karta: szacunek + dokończenie oferty |
| `icons` | Zestaw ikon SVG |

`lib/`: `dane-przykladowe.ts` (`PRZYKLAD` — domyślne wybory, dane kontaktowe,
% profilu + formatter `eur`), `pricing.ts` (model wyceny).

---

## 6. Struktura plików

```
app/
  layout.tsx            # html lang="en", metadane
  globals.css           # Tailwind + style bazowe (.btn-*, .card, .pill)
  page.tsx              # redirect / → /cennik
  cennik/page.tsx
  kalkulator/page.tsx
  rejestracja/page.tsx
  platforma/page.tsx
components/             # 16 komponentów + icons.tsx
lib/
  dane-przykladowe.ts   # PRZYKLAD + eur()
  pricing.ts            # model wyceny (wycena, dostepnosc, stawki)
tailwind.config.ts · next.config.mjs · postcss.config.mjs · tsconfig.json
```

---

## 7. Uruchomienie

```bash
npm install
npm run dev      # tryb deweloperski → http://localhost:3000
# lub
npm run build && npm run start   # build produkcyjny
```

---

## 8. Co jest mockiem / poza zakresem

- **Dane dostępności** (liczba opiekunów, czas startu) — deterministyczny mock,
  do podmiany na realne dane podaży.
- **Brak stanu globalnego** — wybór w formularzu startowym na landingu nie
  przenosi się do kalkulatora (teaser); kalkulator startuje od domyślnych.
- Świadomie poza zakresem: backend, persystencja, walidacja, autoryzacja,
  e‑mail/SMS, płatności, i18n, pełna logika opieki nad parą.

---

## 9. Historia iteracji (skrót)

1. **Przelot v1** — szkielet 4 ekranów po polsku, dane na sztywno.
2. **Bezpieczeństwo** — bump Next 14.2.18 → 14.2.35 (CVE, deploy Railway).
3. **Angielski + UX** — tłumaczenie, czytelne stopnie opieki, dolny pasek
   kalkulatora, hasło w rejestracji, lewy nav w panelu.
4. **Górny nav + dynamiczna wycena** — mock taby; `lib/pricing.ts` liczy wycenę
   na żywo z wyborów.
5. **Restrukturyzacja landingu** — copy wokół estymaty + zgłoszenia, formularz
   startowy, „How it works" pod formularzem.
6. **Nagłówek + dopieszczenie lejka** — prawdziwy nagłówek strony, postęp przez
   cały lejek, wyraźna dostępność, CTA „Find my caregiver", połączona karta
   oferty na panelu, sekcja „Care profile".

---

## 10. Naturalny następny krok

Stan globalny (Context + localStorage) przenoszący wybory przez cały lejek,
realne dane dostępności, moduł opieki nad parą (kopiuj‑i‑różnicuj) oraz
podłączenie realnego cennika partnerów w miejsce stawek mockowych.
