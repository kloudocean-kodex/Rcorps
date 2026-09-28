# R CORPS website

Version 03 of the R CORPS Security Services design preview. Static HTML, CSS and JavaScript, generated with Node.js. No application dependencies, external fonts or client-side frameworks are required.

Hosted preview: **https://rcorps.pages.dev/**. The GitHub-connected Cloudflare Pages project was created on 28 September 2026. The initial hosted build passed all 14 HTML-document checks and 614 local-reference checks. All 67 public resources returned HTTP 200; QA/source paths and a missing page returned the expected HTTP 404. The hosted preview retains its noindex headers and demo enquiry behaviour.

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

Pushes to `main` build and deploy automatically once the Git integration is enabled. Branches can be used for separate review deployments. No custom domain is configured yet. Build checks fail deployment for missing routes, linked assets, responsive image variants or accidental private source files.

Official references: [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/), [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [Node version selection](https://developers.cloudflare.com/pages/configuration/build-image/).

## Editing

- `content/home-v3.mjs`: homepage story and markup.
- `content/business.mjs`: business information and its evidence status.
- `content/clients.json`: supplied client-logo provenance.
- `scripts/build-site.mjs`: page templates, services, privacy and review notes.
- `public/`: selected optimized media, local fonts, CSS and JavaScript.
- `dist/`: generated deployment output, excluded from Git.

The font licences are included alongside the fonts. Personnel photographs and client marks originate in the supplied R CORPS material. The workplace illustration is AI-generated and labelled in the page. These assets are not offered under an open-source licence.

## Exact release scope

This is a publicly accessible **design preview**, with search indexing disabled. `noindex` is not authentication. The guided enquiry stays in the current browser page; it does not send messages or save entries on a server. It can generate a local sample download. Cloudflare processes normal HTTP requests to serve the website.

Live lead delivery, final business/media approval, domain, production privacy policy and the separate operations/attendance/accounts portal remain pending. No production-readiness or commercial-results claim is made.

Private invoices, PDFs, raw media archives, financial records, audit evidence, credentials and browser QA harnesses are intentionally absent from this repository and deployment. Add only reviewed website assets to `public/`.
