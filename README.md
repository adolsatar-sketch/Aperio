# Aperio

Your work, seen the way you intended it to be seen. / أعمالك، تُرى بالطريقة التي قصدتها أن تُرى بها.

A bilingual (English / Arabic) marketing site for Aperio — a brand & web
studio for creative practices — built as static HTML/CSS/JS with no build
step or dependencies.

## Structure

```
index.html          Language gate — remembers your choice, else lets you pick EN/AR
en/                  English site (index, about, services, portfolio, contact)
ar/                  Arabic site — same 5 pages, RTL, translated content
assets/
  css/style.css      Design system + all page styles, incl. RTL/Arabic type rules
  js/main.js         Nav, mobile menu, scroll reveals, page transitions,
                     portfolio filter, language-choice persistence
  images/            Logo mark (paper/obsidian/clay) and favicons
  manifest.json      Web app manifest
```

## Language handling

- First visit hits `index.html`, a small chooser (English / العربية).
- The choice is saved to `localStorage` (`aperio-lang`); on return visits
  `index.html` redirects straight to `en/index.html` or `ar/index.html`
  without showing the chooser again.
- A language switch link sits in the nav on every page and jumps to the
  equivalent page in the other language while updating the saved choice.
- Arabic pages use `dir="rtl"`; layout mirroring is handled natively by
  the browser via CSS logical properties (`inset-inline-*`,
  `padding-inline-*`, `text-align:end`) and direction-aware flex/grid —
  there's no separate RTL stylesheet to keep in sync.
- Arabic type uses Cairo (display) and Tajawal (body); English keeps
  Space Grotesk / Work Sans / JetBrains Mono.

## Running locally

Any static file server works, e.g.:

```
npx http-server .
```

Then open `http://localhost:8080`.
