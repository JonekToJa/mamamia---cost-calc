# mamamia — kalkulator całodobowej opieki (prototyp przelotowy)

Klikalny prototyp ścieżki pozyskania rodziny dla platformy całodobowej opieki
domowej nad seniorem. **Tryb „przelot"**: cel to przeklikać cały lejek i poczuć
UX — **bez backendu, bez logiki wyceny, bez stanu globalnego, bez persystencji,
bez walidacji**. Wszystkie dane pochodzą z jednego pliku na sztywno
(`lib/dane-przykladowe.ts`).

## Lejek

```
/cennik  →  /kalkulator (5 pytań + wynik)  →  /rejestracja  →  /platforma
```

| Ekran          | Co robi                                                                 |
|----------------|-------------------------------------------------------------------------|
| `/cennik`      | Landing: hero, pasek anty-tarcia, pasek zaufania, „jak to działa", CTA. |
| `/kalkulator`  | Kreator: 5 pytań (chipy tappable), estymata na żywo, ekran wyniku.      |
| `/rejestracja` | Brama: termin, osobny pokój, kontakt (e-mail/telefon), zgoda.           |
| `/platforma`   | Home: szacunek, oferto-kalkulator do dokończenia, osoby pod opieką.     |

Strona `/` przekierowuje na `/cennik`.

## Stack

- **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS**
- Nawigacja: `next/link` i `useRouter().push()`
- Stan: tylko lokalny `useState` w obrębie kalkulatora i platformy
- Zero zależności poza powyższymi (brak backendu, bazy, API)

## Uruchomienie

```bash
npm install
npm run dev      # tryb deweloperski → http://localhost:3000
# lub
npm run build && npm run start   # build produkcyjny
```

## Zasady (must-follow odwzorowane w UI)

- Estymata zawsze jako **widełki „od–do"**, nigdy jedna liczba (w przelocie stałe
  wartości z `PRZYKLAD`).
- **Netto = bohater** ekranu wyniku (brutto → minus dofinansowanie → „realnie ~X").
- **Wyżywienie / media opiekuna zawsze osobno** — nie wliczane do brutto ani netto.
- Notka **couple-care** drugorzędna, info-tinted, tuż przed CTA wyniku.
- „**Dlaczego pytamy**" przy pytaniu o noce i o demencję.
- Mobile-first, duże cele dotykowe, ton opiekuńczy, całe copy **po polsku**.

## Dane na sztywno

Jedyne źródło prawdy dla ekranów to `lib/dane-przykladowe.ts` (obiekt `PRZYKLAD`
+ formater waluty `eur`). Ekrany **czytają** z `PRZYKLAD` — nic nie liczą i nic
nie zapisują.

## Poza zakresem (świadomie)

Backend, stan globalny, persystencja, realna wycena, walidacja, autoryzacja,
e-mail/SMS, i18n, płatności, pełna logika opieki nad parą.

## Następny krok (po akceptacji przelotu)

Podłączenie realności na zatwierdzonym szkielecie ekranów: stan globalny
(Context + localStorage), żywa wycena (`lib/pricing.ts`), realne dane
dostępności i moduł opieki nad parą (kopiuj-i-różnicuj).
