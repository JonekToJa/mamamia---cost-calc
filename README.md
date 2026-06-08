# mamamia — round-the-clock home care (click-through prototype)

A clickable prototype of the family-acquisition funnel for a round-the-clock
in-home senior care platform. **Click-through mode**: the goal is to walk the
whole funnel and feel the UX — **no backend, no pricing logic, no global state,
no persistence, no validation**. All data comes from a single hard-coded file
(`lib/dane-przykladowe.ts`).

## Funnel

```
/cennik  →  /kalkulator (5 questions + result)  →  /rejestracja  →  /platforma
```

| Screen         | What it does                                                                |
|----------------|-----------------------------------------------------------------------------|
| `/cennik`      | Landing: hero, anti-friction badge, trust band, "how it works", CTA.        |
| `/kalkulator`  | Wizard: 5 questions, **sticky bottom bar** (estimate left, Back/Next right), result screen. |
| `/rejestracja` | Gate: start date, separate room, contact (email/phone) **+ password**.      |
| `/platforma`   | Mock app with a **left nav bar**: estimate, quote builder, people in care.  |

`/` redirects to `/cennik`.

## Stack

- **Next.js 14 (App Router)** + **TypeScript** + **Tailwind CSS**
- Navigation: `next/link` and `useRouter().push()`
- State: local `useState` only (within the calculator and the platform)
- No backend, database, or API

## Run

```bash
npm install
npm run dev      # dev → http://localhost:3000
# or
npm run build && npm run start   # production build
```

## Principles reflected in the UI

- The estimate is always a **from–to range**, never a single number (fixed
  values from the sample data in this prototype).
- **Net = the hero** of the result screen (gross → minus subsidies → "you really pay ~X").
- **Caregiver food / utilities are always shown separately** — never folded into gross or net.
- The **couple-care** note is secondary, info-tinted, right before the result CTA.
- "**Why we ask**" appears on the night-care and dementia questions.
- Mobile-first, large touch targets, caring tone, all copy **in English**.

## Sample data

The single source of truth for the screens is `lib/dane-przykladowe.ts`
(the `PRZYKLAD` object + the `eur` currency formatter). Screens **read** from it —
they don't compute or save anything.

## Out of scope (by design)

Backend, global state, persistence, real pricing, validation, auth, email/SMS,
i18n, payments, full couple-care logic.

## Natural next step

Wire reality onto the approved screen skeleton: global state
(Context + localStorage), a live quote (`lib/pricing.ts`), real availability data,
and the couple-care module.
