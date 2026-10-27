# PROJECT_CONTEXT — Aamontron (আমন্ত্রণ)

> **Status of this document:** Current, reconciled against the codebase as of the audit date.
>
> Historical claims quoted below are included to explain why decisions were made. Where a
> historical claim conflicts with the implemented system, this file describes the
> **implemented** system and historical claims are labelled `SUPERSEDED`.

---

## 1. What this project is

**Aamontron** (brand logo rendered in Bengali as **আমন্ত্রণ**) is a static showcase website for
invitation cards — a curated catalogue of traditional and modern invitation designs for Bengali
and Indian events (weddings, rice ceremonies, birthdays, anniversaries, housewarmings, etc.).

Customers browse designs and enquire via **WhatsApp**. There is no e-commerce checkout, no
payment processing, and no user accounts. The entire business flow is:

> Browse → Choose a design → Fill an enquiry form → WhatsApp pre-filled message → Human follow-up.

**Live site:** https://aamontron.github.io/
**Repository:** https://github.com/aamontron/aamontron.github.io
**Owner:** Sayan Samanta (`dev-sayan-samanta@users.noreply.github.com`)
**Organization:** `aamontron` (created 2026-10-26)

---

## 2. Original vision and business context

The project was created from scratch as a **Stage 1 / MVP** deliverable. The original intent
was:

- A **stable, mobile-first, static-first** website hosted on **GitHub Pages** — zero backend,
  zero hosting cost, zero runtime dependencies beyond the browser.
- A **catalogue + WhatsApp enquiry** business model. The owner (a print/design business) shows
  invitation card designs and routes customer enquiries to a WhatsApp number.
- **Bengali-first audience** (Kolkata / West Bengal), hence the Bengali brand logo and the
  original Bengali content throughout.

### Why WhatsApp instead of a checkout
WhatsApp is the only viable conversion channel on GitHub Pages. A static site cannot process
payments or hold inventory. The design deliberately shows **estimated prices** ("₹45 / card")
as guidance, not a cart — the human team confirms final pricing and print details after the
WhatsApp exchange. **No false delivery confirmation is shown** anywhere in the UI.

### Why a static catalogue (JSON) instead of a CMS
- Zero hosting cost and zero build step for content changes (edit JSON, push, redeploy).
- Content is version-controlled and reviewable.
- Known limitation: no dynamic filtering server-side; all filtering is client-side in memory.

---

## 3. Historical decisions and rationale

| # | Decision | When | Rationale | Status |
|---|---|---|---|---|
| D1 | Single-root Angular standalone app (`aamontron-site`), no `apps/`/`libs/` monorepo | Initial | Minimal build & config complexity; direct `src/` layout | `LOCKED` |
| D2 | No backend for MVP | Initial | Business is catalogue + WhatsApp enquiry only; pure static delivery | `LOCKED` |
| D3 | Images hosted externally (Unsplash URLs in JSON), not committed to repo | Initial | An early plan claimed repo-committed images, but **no `src/assets/` exists** | `SUPERSEDED` — external images only |
| D4 | Client-side `wa.me` WhatsApp link | Initial | Only viable option on GitHub Pages | `LOCKED` |
| D5 | Google Fonts for Bengali typography (`Noto Sans Bengali`) | Initial | Free, open-source, renders Bengali correctly | `PARTIAL` — font **not loaded** in `index.html`; only Material Icons are. Bengali logo renders with fallback |
| D6 | `peaceiris/actions-gh-pages@v4` for GitHub Pages deploy | Initial | Free, automated via GitHub Actions | `LOCKED` |
| D7 | Root site at `aamontron.github.io` via GitHub Organization `aamontron` | 2026-10-26 | Root `.github.io` domains require an org, not a personal account; enables clean `--base-href=/` | `LOCKED` |
| D8 | `permissions: contents: write` on the deploy job | 2026-10-26 | Fixed a 403 error — the default `GITHUB_TOKEN` is read-only and could not push the `gh-pages` branch | `LOCKED` |
| D9 | Replace **all** Bengali content with English (SEO-friendly, layman) | 2026-10-26 | User directive. **Exception:** the brand logo `আমন্ত্রণ` stays in the header | `LOCKED` |
| D10 | Centralised WhatsApp number in `environment.ts` / `environment.prod.ts` | 2026-10-26 | Single source of truth for the contact number | `LOCKED` |
| D11 | Angular Material (prebuilt `rose-red.css`) for the enquiry form UI | 2026-10-26 | Form fields were rendering as bare HTML boxes; Material theme + icons applied | `LOCKED` |
| D12 | `@angular/cdk` added as a dependency | Initial | **Never imported anywhere in `src/`** — dead dependency | `UNRESOLVED` — candidate for removal |
| D13 | Social media links (Facebook, Instagram) added to footer | 2026-10-27 | Directs customers to the business's social channels; links open in new tabs with `noopener noreferrer` | `LOCKED` |

---

## 4. Constraints

### Technical
- **Static hosting only.** GitHub Pages serves the `gh-pages` branch. No server, no API, no
  database, no serverless functions. Any feature requiring backend logic is **not supported** by
  this deployment model.
- **Angular 22.2.x** with the Angular build system (`@angular/build:application`). Build output
  goes to `dist/aamontron-site/browser`.
- **SPA routing** requires the `404.html` fallback (copied from `index.html` in the workflow) so
  direct hits on `/catalogue`, `/card/:id`, `/enquiry/:cardId` work on a page refresh.
- **Base href `/`** — assets resolve from the repository root, not a subfolder.
- **No tests exist.** `tsconfig.spec.json` and Vitest globals are configured, but there are
  **zero `*.spec.ts` files**. `ng test` would run nothing.

### Security and privacy
- **No authentication, no user accounts, no stored personal data.** The enquiry form collects
  name, phone, event date, quantity, and optional notes — these are **transient** and sent
  directly to WhatsApp. Nothing is persisted.
- The only outbound third-party calls are:
  - Google Fonts CDN (Material Icons, and **intended but not loaded** Noto Sans Bengali).
  - Unsplash image URLs embedded in `invitations.json` (external images; no fallback if
    Unsplash is unreachable).
  - `wa.me` WhatsApp link (user-initiated).
- **No analytics, no tracking scripts, no cookies.**

### Compliance
- MIT licensed (2026, Sayan Samanta).
- `<html lang="en">`. The brand logo is the **only** non-English content on the site.

---

## 5. Assumptions

1. The WhatsApp number `+91 74885 80857` is monitored by a real person who responds to
   pre-filled enquiry messages.
2. Unsplash image URLs remain available (external dependency; no local copies exist).
3. The print/production partner can fulfil orders described only by the catalogue metadata
   (dimensions, paper type, price estimate).
4. Customers are comfortable completing the enquiry flow on WhatsApp (no in-browser checkout).

---

## 6. Risks

| Risk | Severity | Notes |
|---|---|---|
| External image dependency | Medium | All images are live Unsplash URLs. If Unsplash blocks or changes URLs, every card image breaks. No `src/assets/` fallback exists despite an early plan claiming otherwise |
| Bengali brand logo has no font source | Low | `index.html` loads only Material Icons. The logo renders in the browser's default Bengali font. Cosmetic, not functional |
| No SEO metadata | Medium | No `<meta description>`, Open Graph tags, `robots.txt`, or `sitemap.xml`. An early plan listed these as mandatory MVP item 8 — **not implemented** |
| `titleEnglish` field is empty in data | Low | The model has `titleEnglish` and the detail page renders `{{ card.titleEnglish }}`, but `invitations.json` has no such field. The detail page shows a blank italic line |
| WhatsApp popup may be blocked | Low | Handled: the form preserves data and a direct link is offered |
| `@angular/cdk` unused | Low | Dead dependency; safe to remove |

---

## 7. Superseded decisions

- **S1 — Repo-committed images (`src/assets/images`).** An early plan §1 stated images are
  committed under `src/assets/images` with "URLs configurable so a CDN can migrate later."
  **Reality:** no `src/assets/` directory exists. All images are external Unsplash URLs in
  `invitations.json`. The "configurable URL" migration path was never built.
- **S2 — `app.config.ts` as the bootstrap entry.** An early plan §2 listed `app.config.ts` as
  the providers/standalone bootstrap configuration. **Reality:** `main.ts` calls
  `bootstrapApplication(...)` directly with an inline config object.
  `src/app/app.config.ts` exports `appConfig` but is **never imported anywhere** — dead code.
- **S3 — Bengali content as the default language.** The site launched with Bengali content
  throughout. Per decision D9, all content was replaced with English; only the brand logo
  remains in Bengali. An early plan's "Mandatory MVP feature checklist" (Bengali logo, Bengali
  headings) reflects the **original** state, not the current one.
- **S4 — Subfolder base-href (`/aamontron-site/`).** The repo was briefly deployed under
  `/aamontron-site/` (commit `366ef7a`). Superseded by the move to the root org site
  `aamontron.github.io` with `--base-href=/` (commit `8538eaf`).

---

## 8. Where to find the authoritative description

| Concern | Document |
|---|---|
| Product requirements, user stories, acceptance criteria | `docs/PRD.md` |
| Screen flows, routes, state transitions | `docs/APP_FLOW.md` |
| Design tokens, colours, typography, layout | `docs/UI_SPEC.md` |
| Technology stack, versions, architecture, deployment | `docs/TRD.md` |
| Current implementation status, blockers, next steps | `docs/EXECUTION_STATUS.md` |
| Documentation index and maintenance rules | `docs/README.md` |
| Early planning assumptions (historical) | quoted inline in this file |
| Deployment, org, and owner reference | `README.md` (root) |

---

## 9. Conflict-resolution rules

For any future task:

1. **Source code is evidence of current implementation.** If a document says something the code
   does not do, the code wins — and the document is wrong and must be fixed.
2. **Explicit user decisions and approved requirements govern intended behaviour.** A decision
   recorded here (or in `PRD.md`) overrides what the code currently does, and the discrepancy
   must be flagged, not silently resolved.
3. **Technical documents record approved constraints.** `TRD.md` and `UI_SPEC.md` document
   what is locked; proposing to change a `LOCKED` decision requires explicit approval.
4. **Early planning assumptions are historical.** Their claims are quoted inline in this file
   where they matter. They are never the source of truth for the current system. When a quoted
   historical claim conflicts with reality, this file records the truth and the claim is
   labelled `SUPERSEDED`.
5. **Never mark unverified work as complete.** Only record verification you actually performed.

---

*Audit date: 2026-10-27. Branch: `main` @ `2a178b7`.*