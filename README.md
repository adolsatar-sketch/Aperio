# Aperio

Your work, seen the way you intended it to be seen.

A five-page marketing site for Aperio — a brand & web studio for creative
practices — built as static HTML/CSS/JS with no build step or dependencies.

## Structure

```
index.html          Home
about.html           Studio manifesto, traits, process
services.html        Capabilities, process
portfolio.html       Selected work, filterable by discipline
contact.html         Contact details + mailto-based enquiry form
assets/
  css/style.css      Design system + all page styles
  js/main.js         Nav, mobile menu, scroll reveals, page transitions, portfolio filter
  images/            Logo mark (paper/obsidian/clay) and favicons
```

## Running locally

Any static file server works, e.g.:

```
npx http-server .
```

Then open `http://localhost:8080`.
