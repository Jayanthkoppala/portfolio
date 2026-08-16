# jayanthkoppala.vercel.app

Personal portfolio for Jayanth Koppala — full-stack engineer & founder, Bengaluru.
Built as a static site; every claim on the page links to a public receipt.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme inline` tokens in `globals.css`) |
| Motion | `motion` (Framer successor), Lenis smooth scroll |
| 3D / shaders | three.js (desk cube), OGL-based backgrounds |
| Hosting | Vercel — production at https://jayanthkoppala.vercel.app |

## Commands

```bash
npm run dev     # dev server
npm run build   # static export to out/
npm run lint    # eslint
npx serve out   # preview the exported build
```

Deploy: `vercel deploy --prod --yes` (project `jayanthkoppala`).

## Layout

```
src/
  app/            layout, page, globals.css, icons
  components/     bespoke sections (Hero, Board, CareerIndex, ReceiptTweets, …)
    ui/           shadcn/Magic UI primitives
  config/         portfolio.ts — identity, about copy, contact strings
  data/           contributions.json (GitHub activity snapshot)
  lib/            small shared helpers
  types/          shared types (career chapter shape)
public/
  icons/tech/     skill chip SVGs (simple-icons, served locally)
  images/         section artwork + receipt photos
  shots/          product screenshots used by career chapters
```

## Content rules

- **Receipts over claims.** Anything assertive links to a public source — an original post, a company registry record, or a live product.
- **Every asset is local.** Receipt images are downloaded into `public/images/receipts/` rather than hotlinked, so the proof section can't break when a third-party CDN changes.
- **Copy lives beside its claim** — career chapters in `ExperienceSection.tsx`, longer prose in `config/portfolio.ts`.

## Page sections

`Hero → Board (desk) → Career (the Console) → Story → Skills → Receipts → Contact`

The career section (`CareerIndex.tsx`) renders as a machined instrument with two
finishes — gunmetal in dark mode, aluminium in light — driven entirely by CSS
variables scoped to `.career-console`.
