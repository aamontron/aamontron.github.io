# APP_FLOW — Aamontron (আমন্ত্রণ)

> **Audit date:** 2026-10-27 · **Branch:** `main` @ `2a178b7`
>
> Every flow below is **verified against the source code** unless labelled `PLANNED` or
> `UNVERIFIED`. `PLANNED` = described in a doc but not implemented. `UNVERIFIED` = behaviour
> inferred from code but not exercised at runtime.

---

## 1. Routing

Defined in `src/app/app.routes.ts`. SPA with `404.html` fallback for deep refreshes.

| Path | Component | Param | Purpose |
|---|---|---|---|
| `` | `HomeComponent` | — | Hero, categories, featured cards, how-to |
| `/catalogue` | `CatalogueComponent` | `?category=cat-*` (query) | Full catalogue: search, filters, grid |
| `/card/:id` | `InvitationDetailComponent` | `id` = card.id | Single card detail + gallery |
| `/enquiry/:cardId` | `EnquiryComponent` | `cardId` = card.id | Enquiry form → WhatsApp |
| `**` | Redirect to `` | — | Unknown routes fall through to home |

**Navigation is `RouterLink`-based (no programmatic navigation except `Router` in the enquiry
component for future use).**

---

## 2. Screen inventory

### S1 — Home (`/`)
- **Entry:** direct URL, or after a `**` redirect.
- **Sections (top → bottom):**
  1. Hero — badge, H1, description, two CTAs ("View Catalogue" primary / "WhatsApp Enquiry"
     stroked), and a rotated card-stack preview image.
  2. Event Categories — grid of 10 category cards, each linking to `/catalogue?category=<id>`.
  3. Featured & Premium Designs — grid of `isFeatured` cards with "New"/"Featured" badges,
     per-card "View Details" + "Enquire" actions, and a "View All Designs" CTA.
  4. How to Order or Enquire? — 4-step workflow cards.
5. Customer Testimonials — auto-advancing carousel of Facebook reviews
   (`src/app/features/testimonial/testimonial.component`). 2 cards on desktop, 1 on mobile.
- **Loading:** `featuredCards$` and `categories$` are `Observable`s from `CatalogueService`.
  No explicit loading state is rendered — the grids appear only after the observables emit.
- **Empty:** not applicable (categories and featured cards are static JSON; always emit).
- **Error:** none handled. If JSON fails to load, the Angular runtime error is shown.
- **Exit points:** `/catalogue`, `/catalogue?category=<id>`, `/card/<id>`, `/enquiry/<id>`.

### Footer (all pages)
- **Layout:** 4-column grid (auto-fit, min 280px): Brand, Quick Links, Contact, Follow Us.
- **Follow Us column:** links to Facebook (`facebook.com/riyaann1701`) and Instagram
  (`instagram.com/aamontron`), each opening in a new tab with `rel="noopener noreferrer"`.
- **Exit points:** external (social media sites).

### S2 — Catalogue (`/catalogue`)
- **Entry:** from Home CTAs, category chips, or direct URL.
- **Controls:**
  - Search field — `[(ngModel)]="searchTerm"`, triggers `onSearchChange()` → `loadCards()`.
  - Category filter chips — "All Designs" + one chip per category. Active chip is highlighted.
    Clicking sets `selectedCategoryId` and reloads.
- **Grid:** `*ngFor="let card of cards"`. Each card shows image, code, title, price, "Details"
  and "Enquire" actions.
- **Empty state:** when `cards.length === 0`, shows `search_off` icon, message, and a
  "View All Cards" button that resets category + search.
- **Loading:** no skeleton. `loadCards()` subscribes on `ngInit` and on every filter/search
  change. The grid appears once data emits.
- **Exit points:** `/card/<id>`, `/enquiry/<id>`.

### S3 — Card Detail (`/card/:id`)
- **Entry:** from Home featured grid, catalogue grid, or direct URL.
- **Layout:** two-column (gallery left, info right); collapses to single column ≤ 900 px.
- **Gallery:** large main image (3:4 aspect) + thumbnail strip when `card.gallery.length > 1`.
  Clicking a thumbnail calls `selectImage(img)` and swaps the main image.
- **Info:** breadcrumb, card code, H1 title, `titleEnglish` (italic), price box, divider,
  dimensions + paper specs, description, tag chips, "Enquire on WhatsApp" + "Share" actions,
  and an info line pointing the user at the Enquire button.
- **Loading:** `card` is `undefined` until `getCardById(id)` emits. While `undefined`, the
  `empty-detail` block shows "Card Not Found" with a "Return to Catalogue" button.
- **Image failure:** **not handled.** A broken image renders as a broken-image icon.
- **Exit points:** `/catalogue`, `/enquiry/<id>`.

### S4 — Enquiry (`/enquiry/:cardId`)
- **Entry:** from Home, catalogue grid, or card detail.
- **Two states:**

#### S4a — Form view (`!isSubmitted`)
- **Header:** "WhatsApp Enquiry Form" + sub-copy.
- **Selected card summary:** image, code, title, price (hidden on submit).
- **Form** (`enquiryForm: FormGroup`, built in the constructor):
  | Field | Control | Validation | Placeholder |
  |---|---|---|---|
  | Your Name | `customerName` | `required`, `minLength(2)` | e.g., Sumit Ray |
  | Mobile Number (WhatsApp) | `customerPhone` | `required`, `pattern(/^[0-9+\s-]{10,15}$/)` | e.g., 9830000000 |
  | Approximate Event Date | `eventDate` | `required` | e.g., 25th December 2024 |
  | Card Quantity (pcs) | `quantity` | `required`, `min(10)` | default 100 |
  | Special Requirements (optional) | `customNotes` | none | e.g., font size instructions |
- **Submit button** is disabled while `enquiryForm.invalid`.
- **Layout:** name + phone are full-width; date + quantity share a `form-row` with `half-width`
  fields (stack to full width ≤ 600 px).
- **On submit** (`onSubmit()`): requires `enquiryForm.valid && card`. Builds the payload, calls
  `WhatsAppService.buildEnquiryUrl(...)` then `openWhatsApp(...)`. Sets `isSubmitted = true`
  and `popupBlocked = !success`.

#### S4b — Success / handoff view (`isSubmitted`)
- `check_circle` icon, "Your Enquiry is Ready!", message instructing the user to press **Send**
  in WhatsApp.
- If `popupBlocked`: warning box with `warning` icon + a direct "Open WhatsApp Again" link to
  `whatsAppUrl`.
- Secondary "View More Cards" link back to `/catalogue`.
- **No false delivery confirmation is shown.** The message is pre-loaded; the user presses Send.

- **Loading:** `card` resolves from `getCardById`. While `undefined`, the `empty-detail` block
  shows "No Card Selected" with a "Choose a Card from Catalogue" button.
- **Exit points:** `/catalogue` (View More Cards), WhatsApp (external).

---

## 3. State transition summary
Home ──View Catalogue──▶ Catalogue ──Details──▶ Card Detail ──Enquire──▶ Enquiry (form)
│                        │                                          │
│                        └──Enquire──┐                               │
│                                     ▼                               │
└──category chip──▶ Catalogue (?category)                              │
│
Enquiry (form) ──submit──▶ Enquiry (success) ──View More Cards──▶ Catalogue
│
└──popup blocked──▶ direct wa.me link


---

## 4. Validation behaviour

| Field | Rule | Error message |
|---|---|---|
| `customerName` | required, ≥ 2 chars | "Name is required" |
| `customerPhone` | required, matches `^[0-9+\s-]{10,15}$` | "Phone number is required" |
| `eventDate` | required | "Date is required" |
| `quantity` | required, ≥ 10 | "Minimum 10 pcs" |
| `customNotes` | none | — |

**Note:** the `minLength(2)` error has no associated message in the template — it would render
as a raw control error if triggered. `UNVERIFIED` at runtime.

---

## 5. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| ≤ 500 px | Hero actions stack vertically; enquiry form `form-row` becomes a single column; card-detail actions stack vertically |
| ≤ 600 px | Enquiry `half-width` fields become full width; enquiry card wrapper padding reduces to 20 px |
| ≤ 768 px | Home hero switches to single-column + centred; navbar nav links hide (only the CTA remains); `.main-content` height adjusts |
| ≤ 900 px | Card detail collapses to single column; category filter chips wrap and scroll horizontally |
| > 900 px | Full two-column layouts |

---

## 6. Accessibility behaviour

- `<html lang="en">`.
- All images carry `alt` text (`card.title`, "Gallery thumbnail", "Wedding Card Preview").
- Form fields use `mat-label` + `mat-error` (Material announces errors).
- Navbar links use `RouterLinkActive` for visual + (implied) screen-reader current-state indication.
- **Not audited:** keyboard-only navigation, screen-reader flow, colour-contrast ratios, ARIA
  roles beyond Material's defaults. `UNVERIFIED`.

---

## 7. Planned / unimplemented behaviour

| Item | Status |
|---|---|
| `titleEnglish` population in `invitations.json` | `PLANNED` — model and template exist; data is empty, so the detail page shows a blank italic line |
| SEO metadata (description, OG, robots.txt, sitemap.xml) | `PLANNED` — listed in an early plan's mandatory checklist item 8, not implemented |
| Noto Sans Bengali font loading | `PLANNED` — brand logo references it in `app.scss` but `index.html` loads only Material Icons |
| Image-failure handling (`[error]` fallback) | `PLANNED` — not implemented; broken images show the native broken-icon |
| Skeleton / loading states | `PLANNED` — not implemented; grids render only after observables emit |
| Error handling for failed JSON loads | `PLANNED` — not implemented |
| `404` page content | `PLANNED` — `404.html` is a copy of `index.html`, so unknown SPA routes show the home page, not a 404 message |
| `@angular/cdk` removal | `UNRESOLVED` — dependency present, imported nowhere |

---

*Audit date: 2026-10-27. Branch: `main` @ `2a178b7`.*


