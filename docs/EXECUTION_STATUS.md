# EXECUTION_STATUS — Aamontron (আমন্ত্রণ)

> **Audit date:** 2026-10-27
> **Branch:** `main` tracking `origin/main`
> **Latest commit:** `2a178b7` — "Restore Bengali brand logo text in header" (2026-10-26 21:02 +0530)
> **Working tree:** clean
>
> Statuses: `DONE` = implemented and verified in code · `PARTIAL` = partially implemented ·
> `PLANNED` = described but not built · `BLOCKER` = cannot proceed without a decision ·
> `UNVERIFIED` = inferred from code, not exercised at runtime.

---

## 1. Implementation status

### 1.1 DONE (verified in source)

| ID | Feature | Evidence |
|---|---|---|
| F-01 | Home page: hero, categories, featured grid, how-to | `src/app/features/home/` |
| F-02 | Catalogue: search, category filter chips, card grid, empty state | `src/app/features/catalogue/` |
| F-03 | Card detail: breadcrumb, gallery + thumbnails, specs, description, tags, actions | `src/app/features/invitation-detail/` |
| F-04 | Enquiry form: reactive form, 5 fields, validation, WhatsApp handoff, popup-blocked recovery | `src/app/features/enquiry/` |
| F-05 | WhatsApp URL construction (`wa.me/917488580857`) | `src/app/services/whats-app.service.ts` |
| F-06 | Catalogue filtering + search (title, code, tags) | `src/app/services/catalogue.service.ts` |
| F-07 | Angular Material theme (`rose-red.css`) + Material Icons font | `src/styles.scss`, `src/index.html` |
| F-08 | Header with Bengali brand logo `আমন্ত্রণ` + English `Aamontron` | `src/app/app.html` |
| F-09 | Footer with contact info (+91 74885 80857) and social links (Facebook, Instagram) | `src/app/app.html` |
| F-10 | 4 routes + wildcard redirect + SPA `404.html` fallback | `src/app/app.routes.ts`, workflow |
| F-11 | GitHub Pages deploy via `peaceiris/actions-gh-pages@v4`, `permissions: contents: write`, `--base-href=/` | `.github/workflows/deploy.yml` |
| F-12 | 6 invitation cards + 10 categories in JSON | `src/app/data/` |
| F-13 | Centralised WhatsApp number config | `src/app/environments/environment*.ts` |
| F-14 | All content in English (brand logo excepted) | verified across all templates |
| F-15 | Responsive breakpoints (500 / 600 / 768 / 900 px) | component SCSS files |
| F-16 | README documents live site, repo, org, owner | `README.md` |
| F-17 | Customer testimonial carousel on Home (before footer) | `src/app/features/testimonial/`, `src/app/data/testimonials.json` |
| F-27 | Social media links (Facebook, Instagram) in footer | `src/app/app.html` |

### 1.2 PARTIAL

| ID | Feature | What's missing |
|---|---|---|
| F-17 | Accessibility (NFR-05) | Semantic HTML and `mat-label`/`mat-error` present, but **no accessibility audit performed**. Keyboard-only flow, screen-reader output, and colour-contrast ratios are `UNVERIFIED` |
| F-18 | Bengali font support | `app.scss` and `enquiry.component.scss` declare `'Noto Sans Bengali'`, but `index.html` loads **only Material Icons**. The Bengali logo renders in the browser's default Bengali font |
| F-19 | `titleEnglish` data | Model field and template exist; `invitations.json` has **no `titleEnglish` values**. The detail page renders a blank italic line |

### 1.3 PLANNED (described, not built)

| ID | Feature | Source |
|---|---|---|
| F-20 | SEO metadata: `<meta description>`, Open Graph, `favicon` (have ICO only), `robots.txt`, `sitemap.xml` | An early plan's mandatory checklist item 8 — listed as mandatory, **not implemented** |
| F-21 | Image-failure fallback (`[error]` handler or placeholder) | not implemented; broken images show the native icon |
| F-22 | Skeleton / loading states | not implemented; grids render only after observables emit |
| F-23 | Error handling for failed JSON loads | not implemented |
| F-24 | Real `404` page content | `404.html` is a copy of `index.html` — unknown routes show the home page |
| F-25 | Noto Sans Bengali font loading via Google Fonts | `PROPOSED` in `UI_SPEC.md` |
| F-26 | Design-token consolidation (spacing, colour, type scale) | `PROPOSED` in `UI_SPEC.md` |

### 1.4 UNRESOLVED / BLOCKERS

| ID | Issue | Blocking decision needed |
|---|---|---|
| B-01 | `@angular/cdk` is a dependency but imported **nowhere** in `src/` | Remove it? |
| B-02 | Zero test files exist (`tsconfig.spec.json` + Vitest configured, `0` spec files). `ng test` runs nothing | Do you want any tests? |
| B-03 | `app.config.ts` exports `appConfig` but is **never imported** — dead code | Remove it? |
| B-04 | `brandName` in `environment.*` is declared but **never read** | Remove it? |
| B-05 | `$breakpoint-mobile` (576 px) and `$breakpoint-desktop` (1024 px) are declared but **never referenced** | Remove or use them? |
| B-06 | `slug` field on categories is never used at runtime | Remove it? |
| B-07 | Enquiry payload passes `category: card.categoryId` (e.g. `"cat-1"`) to WhatsApp, not a human-readable name | Fix the payload? |
| B-08 | `index.html` `<title>` is hardcoded `AamontronSite` | Update to `Aamontron`? |
| B-09 | Local `dist/` is stale (Oct 26 00:34, predates the Material theme fix at 20:48) | Rebuild locally? (documentation-only task — not done) |

---

## 2. Tests actually executed

**None.** This audit was documentation-only. No build, no `ng serve`, no `ng test`, and no
runtime verification of any behaviour was performed. All statuses marked `DONE` above are
verified by **reading source code**, not by running the application.

The live site at `https://aamontron.github.io/` is served from the GitHub Actions workflow's
build, not from the stale local `dist/`.

---

## 3. Technical debt

| Item | Location | Note |
|---|---|---|
| Dead code: `app.config.ts` | `src/app/app.config.ts` | exported `appConfig`, never imported |
| Dead config: `brandName` | `src/app/environments/environment*.ts` | declared, never read |
| Dead tokens: `$breakpoint-mobile`, `$breakpoint-desktop` | `src/styles/variables.scss` | declared, never referenced |
| Dead dependency: `@angular/cdk` | `package.json` | imported nowhere |
| Empty model field: `titleEnglish` | `src/app/models/invitation.model.ts` + `src/app/data/invitations.json` | model/template exist, data absent |
| Stale build output | `dist/aamontron-site/browser/` | predates the Material theme fix |
| Hardcoded media queries | all component SCSS | raw pixels instead of `$breakpoint-*` tokens |
| Inline colours | all component SCSS | not in the token file |

---

## 4. Known issues

1. **External image dependency.** All card imagery is live Unsplash URLs. No local copies, no
   fallback. A broken/unreachable URL renders a broken-image icon.
2. **No SEO metadata.** No description, OG, robots.txt, or sitemap. The site is discoverable only
   by its `<title>`.
3. **Bengali logo has no loaded font.** Renders in the browser's default Bengali font.
4. **SPA `404.html` is not a real 404.** Deep links render the home page.
5. **No loading or error states.** Failed JSON loads surface as a runtime error.
6. **WhatsApp `category` field sends a raw ID** (`cat-1`), not a category name.

---

## 5. Next steps (unprioritised, not approved)

1. Decide on B-01–B-09 (remove dead code/config/tokens, fix the `category` payload, update the title).
2. Decide whether to implement F-20 (SEO metadata) — it is in an early plan's mandatory
   checklist but was never built.
3. Decide whether to load Noto Sans Bengali (F-18/F-25).
4. Decide whether to populate or remove `titleEnglish` (F-19).
5. Decide whether to create any tests (B-02).
6. Rebuild `dist/` locally if a fresh local build is needed.

**No step above is approved or scheduled.**

---

*Audit date: 2026-10-27. Branch: `main` @ `2a178b7`. No runtime verification performed.*

