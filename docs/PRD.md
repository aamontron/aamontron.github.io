# PRD — Aamontron (আমন্ত্রণ)

> **Status:** Approved MVP scope. An early plan's mandatory feature checklist
> (item 8: SEO metadata) is **not implemented** — it was planned but never built.
> **Audit date:** 2026-10-27 · **Branch:** `main` @ `2a178b7`

---

## 1. Problem statement

Customers in Kolkata / West Bengal (and the wider Bengali-speaking audience) want to browse
and order invitation cards for weddings, rice ceremonies, birthdays, and other occasions, but
the print/design business has no online presence beyond word-of-mouth and a phone number.

This product gives them a **mobile-first catalogue** of invitation designs with an **estimated
price range** and a **one-tap WhatsApp enquiry** that pre-fills all the order details — so the
customer never has to retype their requirements.

## 2. Target personas

| Persona | Needs | Primary path |
|---|---|---|
| **The bride/groom or their family** | See real card designs for a wedding; know rough pricing before calling | `/catalogue` → filter Wedding → `/card/:id` → `/enquiry/:cardId` |
| **Parents of a baby** | A sweet, traditional rice-ceremony (Annaprasan) card | `/catalogue` → Rice Ceremony filter → Enquire |
| **Event host (birthday, housewarming, Boishakh)** | A design matching the occasion and mood | `/catalogue` → search/filter → Enquire |
| **The print business owner (Sayan)** | A low-maintenance site that routes real, pre-qualified enquiries to WhatsApp | Push to `main`; edit JSON to add designs |

## 3. Product goals

| Goal | Measurable outcome |
|---|---|
| Visible catalogue | All catalogue cards render with image, code, title, and price estimate on `/catalogue` |
| Design discovery | Category filters + text search (title, code, tags) narrow the catalogue without page reload |
| Low-friction enquiry | A customer can reach a pre-filled WhatsApp message in ≤ 3 clicks from any card |
| Trust without a checkout | Estimated prices are clearly labelled as *estimates*; no false delivery/purchase confirmation |
| Zero maintenance cost | Content changes = edit JSON + push; deploy is fully automated via GitHub Actions |

## 4. MVP scope — approved

### 4.1 User stories (prioritised)

| ID | As a | I want | So that | Acceptance criteria | Status |
|---|---|---|---|---|---|
| US-01 | Visitor | Browse the catalogue of invitation cards | I can see what designs exist | `/catalogue` renders all 6 cards with image, code, title, price. Empty state shown when filters return nothing | `IMPLEMENTED` |
| US-02 | Visitor | Filter cards by event category | I can quickly find designs for my occasion | Clicking a category chip filters the grid; "All Designs" resets. Category also selectable from Home via `?category=` query param | `IMPLEMENTED` |
| US-03 | Visitor | Search cards by name, code, or tag | I can find a specific design without scrolling | Typing in the search box filters by `title`, `code`, and `tags` (case-insensitive) | `IMPLEMENTED` |
| US-04 | Visitor | View a card's full details | I can judge quality and suitability before enquiring | `/card/:id` shows large preview, gallery thumbnails, dimensions, paper type, description, tags, and price | `IMPLEMENTED` |
| US-05 | Visitor | Open the enquiry form for a card | I can send my details in one step | `/enquiry/:cardId` shows the form pre-loaded with the selected card's image, code, title, and price | `IMPLEMENTED` |
| US-06 | Customer | Submit the enquiry form | My message reaches the business | Form validates name (required, ≥2 chars), phone (required, matches `/^[0-9+\s-]{10,15}$/`), date (required), quantity (required, ≥10). On submit, a `wa.me` URL opens with a pre-filled message | `IMPLEMENTED` |
| US-07 | Customer | Recover if WhatsApp pop-up is blocked | I can still send my enquiry | When `window.open` returns null, the success state shows a warning and a direct "Open WhatsApp Again" link to `whatsAppUrl` | `IMPLEMENTED` |
| US-08 | Visitor | See featured / new designs on the home page | I can spot popular designs quickly | Home shows `isFeatured` cards with "New"/"Featured" badges and per-card Enquire buttons | `IMPLEMENTED` |
| US-09 | Visitor | Understand how the ordering process works | I know what to expect | Home "How to Order or Enquire?" section lists 4 steps | `IMPLEMENTED` |
| US-10 | Owner | Add a new card design | The catalogue grows without a developer release | Edit `src/app/data/invitations.json` (and `categories.json` if needed), push to `main`, the workflow rebuilds and deploys | `IMPLEMENTED` (data-only) |
| US-11 | Visitor | Reach the site from a search engine | The site is discoverable | `<title>` is set. **Meta description, Open Graph, `robots.txt`, and `sitemap.xml` are NOT implemented** | `NOT IMPLEMENTED` |
| US-12 | Visitor | Read customer testimonials | I can see social proof before enquiring | Home renders a testimonial carousel before the footer: 9 Facebook reviews in `src/app/data/testimonials.json`, auto-advancing every 5 s, pause on hover/focus, prev/next arrows, dot indicators. 2 cards on desktop, 1 on mobile | `IMPLEMENTED` (2026-10-27) |
| US-13 | Visitor | Follow the business on social media | I can find the business's Facebook and Instagram | Footer "Follow Us" column links to `facebook.com/riyaann1701` and `instagram.com/aamontron`, opening in new tabs | `IMPLEMENTED` (2026-10-27) |

### 4.2 Non-functional requirements

| ID | Requirement | Status |
|---|---|---|
| NFR-01 | Mobile-first responsive layout (breakpoints 576 / 768 / 768+ px) | `IMPLEMENTED` |
| NFR-02 | SPA deep links survive page refresh (via `404.html` fallback) | `IMPLEMENTED` |
| NFR-03 | No false delivery/purchase confirmation in the enquiry success state | `IMPLEMENTED` |
| NFR-04 | Centralised WhatsApp number config (single source of truth) | `IMPLEMENTED` |
| NFR-05 | Semantic HTML, labels, keyboard-focus order, colour contrast | `PARTIAL` — no accessibility audit performed |
| NFR-06 | Build under 1 MB initial budget (Angular production budget) | `UNVERIFIED` — no build executed during this audit |

## 5. Out of scope / non-goals

The following are **not** approved requirements. They may be proposed later but must not be
implemented without an explicit scope change.

- **E-commerce checkout, cart, or payment processing.** Prices are estimates only.
- **User accounts, login, or authentication.**
- **Order tracking, order history, or persistence of submitted enquiries.** Enquiry data is
  transient and sent to WhatsApp.
- **Admin panel or headless CMS.** Content is edited by editing JSON files.
- **Backend API, serverless functions, or database.** Not supported by the GitHub Pages
  deployment model.
- **Image optimisation pipeline or local image assets.** All images are external URLs.
- **Multi-language support beyond the single Bengali brand logo.** All UI content is English.
- **Analytics, tracking scripts, or cookies.**
- **Dark mode.** Light theme only.
- **E2E or integration test suite.** No test infrastructure exists (zero spec files).
- **Email enquiry fallback.** WhatsApp is the only channel.
- **Print / production integration.** The site does not connect to any printer or fulfilment
  system.
- **Testimonial moderation dashboard or Facebook API integration.** Testimonials are
  hand-edited in `src/app/data/testimonials.json`. No live feed, no automated ingestion, no
  approval workflow. Only quotes the customer actually posted may be shown — ratings are never
  fabricated for a review that did not include one.

## 6. Success metrics

| Metric | Target | How measured |
|---|---|---|
| Enquiry completion rate | ≥ 80% of submitted forms reach a pre-filled WhatsApp URL | Manual / WhatsApp click-through (no analytics installed) |
| Catalogue findability | A visitor can find any card in ≤ 2 filter/search actions | Manual walkthrough |
| Page load on GitHub Pages | < 3 s on a 4G connection | Manual |
| Deploy reliability | Every push to `main` produces a live site update | GitHub Actions run log |
| Content update latency | Add/edit a card = edit JSON + push | Manual |

## 7. Assumptions

1. The WhatsApp number `+91 74885 80857` is actively monitored by a human.
2. Unsplash image URLs remain stable (external dependency).
3. The print partner can interpret catalogue metadata (dimensions, paper, price estimate).
4. Customers complete the flow on WhatsApp; no in-browser checkout is expected.

## 8. Dependencies

| Dependency | Type | Status |
|---|---|---|
| GitHub Pages (gh-pages branch) | Hosting | `LOCKED` — automated via `.github/workflows/deploy.yml` |
| GitHub Organization `aamontron` | Root `.github.io` domain | `LOCKED` |
| Angular Material + Material Icons CDN | UI framework | `LOCKED` |
| Google Fonts CDN | Typography (Material Icons loaded; Noto Sans Bengali **not** loaded) | `PARTIAL` |
| Unsplash | Card imagery | `EXTERNAL` — no fallback |
| WhatsApp (`wa.me`) | Conversion channel | `EXTERNAL` — user-initiated |

## 9. Open questions (unresolved)

1. Should `robots.txt` / `sitemap.xml` / meta description be added? (The original planning
   document's mandatory checklist item 8 lists them as mandatory; they are not implemented.)
2. Should the Bengali brand logo get a loaded font (Noto Sans Bengali) so it renders as designed?
3. Should the `titleEnglish` field be populated in `invitations.json` or removed from the model
   and template? (Currently renders a blank line on the detail page.)
4. Should `@angular/cdk` be removed (it is imported nowhere)?
5. Should the empty `docs/` documentation set be the canonical project docs going forward?

---

*Audit date: 2026-10-27. Branch: `main` @ `2a178b7`. Statuses: `IMPLEMENTED` = verified in code,
`NOT IMPLEMENTED` = confirmed absent, `PARTIAL` = partially done, `UNVERIFIED` = not checked.*
