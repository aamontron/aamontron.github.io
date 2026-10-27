# UI_SPEC — Aamontron (আমন্ত্রণ)

> **Audit date:** 2026-10-27 · **Branch:** `main` @ `2a178b7`
>
> All token values below are **verified against `src/styles/variables.scss`** and the component
> SCSS files. Anything marked `PROPOSED` is a suggestion, **not an approved change**.

---

## 1. Design system status

The project uses **Angular Material** (`@angular/material/prebuilt-themes/rose-red.css`) as its
component library, with a small custom SCSS design-token layer in `src/styles/variables.scss`.
There is **no separate design-system library or Figma handoff**. Tokens are defined once in
`variables.scss` and consumed via `@use 'styles/variables' as *;` in every component SCSS.

**Theme:** light only. No dark mode.

---

## 2. Colour tokens

Source: `src/styles/variables.scss`. All verified.

| Token | HEX | Usage | Where referenced |
|---|---|---|---|
| `$crimson-primary` | `#8b0000` | Primary brand (navbar, badges, prices, active filters, submit buttons) | `app.scss`, `home.component.scss`, `catalogue.component.scss`, `enquiry.component.scss`, `invitation-detail.component.scss` |
| `$crimson-dark` | `#5c0000` | Headings, hero H1, section H2 | `home.component.scss`, `catalogue.component.scss`, `invitation-detail.component.scss` |
| `$gold-accent` | `#d4af37` | Accent buttons (Enquire, View Designs), category-card hover border, featured badge | `home.component.scss`, `catalogue.component.scss`, `invitation-detail.component.scss`, `app.scss` |
| `$gold-light` | `#f4e8c1` | Brand logo English text, footer headings, step-number background, card-code background | `app.scss`, `home.component.scss`, `invitation-detail.component.scss` |
| `$ivory-bg` | `#faf9f5` | Enquiry selected-card summary background | `enquiry.component.scss` |
| `$charcoal-text` | `#2c2c2c` | Body text, card titles, headings | all components |
| `$muted-text` | `#666666` | Secondary text, prices, specs, descriptions, breadcrumbs | all components |
| `$border-color` | `#e5e0d8` | Card borders, filter-chip borders, dividers | all components |
| `$white` | `#ffffff` | Card backgrounds, navbar text, button text | all components |

### Additional colours defined inline (not in tokens)

| Colour | HEX | Usage |
|---|---|---|
| Hero gradient start | `#fff5f5` | Home hero background |
| Hero gradient end | `#fffbf0` | Home hero background |
| Footer background | `#222` | Footer |
| Footer text | `#ddd` / `#bbb` / `#888` | Footer copy (three weights) |
| Featured section background | `#f3efe6` | Home featured wrapper |
| Success icon | `#4caf50` | Enquiry success state |
| Popup warning background | `#fff4e5` | Enquiry popup-blocked warning |
| Popup warning text | `#663c00` | Enquiry popup-blocked warning |
| Popup warning icon | `#ffa000` | Enquiry popup-blocked warning |
| WhatsApp green | `#25d366` | Direct WhatsApp button |

**Token-naming convention:** `$<role>-<variant>`. Two prefixes in use — `crimson` (brand) and
`gold` (accent). The `$breakpoint-*` family is the exception (utility, not colour).

### Footer social links (added 2026-10-27)

New "Follow Us" column in the footer, alongside Brand / Quick Links / Contact:

| Property | Value |
|---|---|
| Heading | `h4` "Follow Us", `$gold-light` colour |
| Links | `ul.social-links`, `list-style: none` |
| Link colour | `#bbb`, hover → `$gold-light` (`#f4e8c1`) |
| Icons | `mat-icon` (`facebook`, `camera`) inline with label text |
| Links | Facebook: `facebook.com/riyaann1701`, Instagram: `instagram.com/aamontron` |
| Behaviour | `target="_blank"`, `rel="noopener noreferrer"` |
| Responsive | Grid auto-fits to `minmax(280px, 1fr)`; collapses naturally on mobile |

**PROPOSED (not approved):** migrate the inline colours above into `variables.scss` so the token
file is the single source of truth.

### Testimonial section (added 2026-10-27)

New background band on the Home page, between "How to Order" and the footer:

| Property | Value |
|---|---|
| Background | `linear-gradient(180deg, $white 0%, $ivory-bg 100%)` |
| Top border | `1px solid $border-color` |
| Bottom border | `1px solid $border-color` |
| Padding | `80px 0` (48px on ≤ 600px) |
| Card background | `$white` with `box-shadow: 0 12px 40px rgba(139, 0, 0, 0.06)` |
| Card accent | `5px` left border in `$crimson-primary` |
| Avatar | `52px` circle, `$crimson-primary` bg, white text, 2-letter initials |
| Eyebrow | `$crimson-primary` text on `$gold-light` bg, pill shape |
| Stars | `#ffb300` gold (`star` / `star_half` / `star_outline`) |
| Navigation arrows | `52px` circle, `$crimson-primary` icon, `$white` bg, `$border-color` border; hidden on ≤ 600px |
| Dots | `12px` circles, `$border-color`; active dot is `$crimson-primary` and widens to `32px` |
| Track transition | `transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)` |
| Autoplay | 5 s interval, pauses on `mouseenter`/`focusin` and resumes on `mouseleave`/`focusout` |

---

## 3. Typography

### 3.1 Font sources loaded

**Verified in `src/index.html`:** only one font link —

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

**No web font for text is loaded.** Body text renders in the browser's default serif/sans-serif.

---

*Audit date: 2026-10-27. Branch: `main` @ `2a178b7`.*