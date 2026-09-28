# R CORPS website

R CORPS Security Services public website, prepared for https://rcorpssecurity.com/. Static HTML, CSS and JavaScript, generated with Node.js. No application dependencies, external fonts or client-side frameworks are required.

Cloudflare deployment: **https://rcorps.pages.dev/**, deployed through the GitHub-connected Cloudflare Pages project. Version 04 adds supplied portrait, guard, PSO and armed-personnel photography; personal-escort and escort-vehicle services; Google-style review cards; and a WhatsApp enquiry handoff. The public build checks 16 HTML documents, linked routes and assets, canonical metadata, indexing policy and accidental private-file publication.

## Run locally

```sh
npm ci
npm run build
npm run preview
```

The optional preview command requires Python and serves `http://127.0.0.1:4174/`. Any static HTTP server can serve `dist/`.

## Cloudflare Pages

Connect this repository using the native GitHub integration:

| Setting | Value |
| --- | --- |
| Project name | `rcorps` |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Leave blank (repository root) |
| Environment variables | None required; `.node-version` pins Node.js |

Pushes to `main` build and deploy automatically once the Git integration is enabled. Branches can be used for separate review deployments. The production origin is `https://rcorpssecurity.com`. Both apex and www are attached to the Pages project; DNS and HTTPS activation must be verified separately. The www host redirects to the apex. Preview branches retain noindex; the pages.dev production host also receives a noindex response header. Build checks fail deployment for missing routes, linked assets, responsive image variants or accidental private source files.

Official references: [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [Node version selection](https://developers.cloudflare.com/pages/configuration/build-image/).

## Editing

- `content/home-v3.mjs`: homepage story and markup.
- `content/business.mjs`: business information and its evidence status.
- `content/personnel.mjs`: role-specific photography and the labelled escort-vehicle concept.
- `content/whatsapp.mjs`: shared contact number, WhatsApp icon and click-to-chat links.
- `public/site-v4.css`: portrait hero, personnel gallery, vehicle section and responsive WhatsApp controls.
- `content/clients.json`: supplied client-logo provenance.
- `content/reviews.mjs`: short, attributed Google review excerpts and their direct source links, checked 28 September 2026. This is a curated snapshot, not an API-fed live widget.
- `public/reviews.css` and `public/reviews.js`: responsive review cards with manual navigation, keyboard support and native touch scrolling. Reduced-motion preferences are respected.
- `scripts/build-site.mjs`: page templates, services, privacy, canonical URLs, sitemap and preview-only review notes.
- `public/`: selected optimized media, local fonts, CSS and JavaScript.
- `dist/`: generated deployment output, excluded from Git.

The font licences are included alongside the fonts. Personnel photographs and client marks originate in the supplied R CORPS material. The escort-vehicle illustration is AI-generated and labelled as a concept. Reviews use short, attributed excerpts with original Google profile images, linked to their sources. They are a dated curated snapshot; no Trustindex widget or live review API is connected. These assets are not offered under an open-source licence.

## Exact release scope

The `main` branch builds the public site with indexable metadata and a sitemap for the custom domain. Other Cloudflare branches build a noindex design preview. The public build excludes the design-review page and banner. `noindex` is not authentication. The guided enquiry stays in the current browser page until the visitor explicitly opens the prepared WhatsApp link. That click transfers the draft to WhatsApp; the visitor must tap Send in WhatsApp to send it to R CORPS at +91 91121 71015. The site does not automatically send messages or save entries on a server. The visitor can also download a local enquiry brief. Cloudflare processes normal HTTP requests to serve the website.

Publication was requested by the owner on 28 September 2026; email setup is deferred. The existing supplied Gmail address remains in the contact details. End-to-end WhatsApp delivery confirmation, final browser visual checks and the separate operations/attendance/accounts portal remain pending. DNS and certificate activation are recorded in the private launch evidence. No commercial-results claim is made.

Private invoices, PDFs, raw media archives, financial records, audit evidence, credentials and browser QA harnesses are intentionally absent from this repository and deployment. Add only reviewed website assets to `public/`.
