# Aamontron (আমন্ত্রণ) — Architecture

Invitation-card showcase website. Stable, mobile-first, static-first, GitHub Pages.
Stage 1 deliverable. Written as the project is created from scratch inside the repository.

## 1. Why this stack

| Concern | Choice | Rationale |
|---|---|---|
| Repository Layout | Single Root Angular App (`aamontron-site`) | Direct root `src/` layout; no nested `apps/` or `libs/` overhead; minimal build & config complexity |
| Web shell | Angular standalone app | Ivy out of the box, stable, modern, zero backend runtime |
| Backend | None for MVP | Business is catalogue + WhatsApp enquiry only; pure static delivery |
| Images | Repo-committed `src/assets/images`, referenced from JSON catalogue | Zero hosting cost; URLs configurable so a CDN can migrate later without UI changes |
| WhatsApp | Client-side `wa.me` link | Only viable on GitHub Pages; customer reviews and presses Send manually |
| Fonts | Google `Noto Sans Bengali` + serif (free open-source) | Renders correctly on modern browsers; documented fallbacks |
| Deployment | `ng build --configuration=production` → `peaceiris/actions-gh-pages` → `gh-pages` branch | Free; automated via GitHub Actions |

## 2. Folder layout

```text
aamontron-site/                       # root repository directory
  src/
    index.html                         # Google Fonts (Noto Sans Bengali) & HTML shell
    main.ts                            # Bootstrap standalone application
    styles.scss                        # typography, global resets, CSS variables
    _variables.scss                    # brand colours, breakpoints
    favicon.svg / robots.txt / sitemap.xml
    app/
      app.config.ts                    # providers & standalone bootstrap configuration
      app.routes.ts                   # home, catalogue, detail, enquiry, 404
      app.ts / .html / .scss          # root header (Bengali logo) + footer layout
      features/
        home/                          # hero, categories, featured grid, CTAs
        catalogue/                     # search, category filters, sorting, empty state, grid
        invitation-detail/             # large preview, gallery modal, enquiry button
        enquiry/                       # form → WhatsApp pre-filled message
      services/
        whats-app.service.ts           # constructs WhatsApp URL & manages popup handoff
        catalogue.service.ts           # loads + filters + searches catalogue JSON
      models/
        invitation.model.ts            # InvitationCard, Category, Enquiry interfaces
      environments/
        environment.ts                 # development configuration
        environment.prod.ts            # production WHATSAPP_NUMBER placeholder
      data/
        invitations.json               # >= 5 sample records (placeholder photography)
        categories.json                # 10 event categories
      assets/
        images/                        # placeholder invitation photographs, organised by category
        logos/                         # bengali logo + favicon
  angular.json                         # production output (dist/aamontron-site)
  tsconfig.json / tsconfig.app.json     # strict TS + resolveJsonModule
  package.json                         # minimal dependency set: Angular + SCSS + rxjs
  ARCHITECTURE.md
  README.md
  .github/workflows/
    deploy.yml                         # push to main → Angular build → gh-pages deploy
```

## 3. WhatsApp design (static site contract)

`WhatsAppService.buildUrl(payload)` builds:
`https://wa.me/<NUMBER>?text=<encoded message>` where `NUMBER` comes from
`environment.prod.ts`. Message body example:

```text
Aamontron (আমন্ত্রণ): Hi! I am enquiring about <card title>.
Category: <category>; Date: <date>; Quantity: <qty>. Custom: <requirements>.
Phone: <mobile number>
```

UI states: "Preparing enquiry…" → "Opening WhatsApp" → soft success line:
*"Your enquiry is ready. WhatsApp will open with your message pre-filled. Please review and press Send."*
No false delivery confirmation is shown.

Desktop opens a tab; mobile hands off to the WhatsApp app. If the popup is blocked, the form data stays behind and the button text updates to remind the user to allow popups.

## 4. GitHub Pages deployment strategy

- `angular.json`: `outputPath: dist/aamontron-site`, `outputHashing: "all"`.
- Production build command inside workflow:
  `npm run build` — uses `--base-href /aamontron-site/` (or `/` for custom domain).
- Deployer: `peaceiris/actions-gh-pages` publishing `dist/aamontron-site` to the `gh-pages` branch.
- Static routing on deep refresh: Direct router hits supported via fallback `index.html`.

## 5. Mandatory MVP feature checklist

1. Responsive header with Bengali logo + brand tagline, footer contact info.
2. Home hero with tagline, description, Explore Designs + WhatsApp CTA, featured cards, category cards, enquiry-how section.
3. Catalogue page: responsive grid, category filters, search (title/category/tag), newest/featured sort, empty state, enquiry button per card.
4. Invitation detail (modal/lightbox with gallery); large preview preserves portrait card composition.
5. Enquiry form with required-field validation; WhatsApp pre-filled message construction; friendly no-false-success messaging.
6. Centralised `WHATSAPP_NUMBER` config; soft WhatsApp handoff; form preservation on blocked popup.
7. Sample catalogue data with clearly labelled placeholder photography; organised by event category.
8. Basic SEO: `<title>`, meta description, Open Graph, favicon, sitemap, robots.txt.
9. Accessibility: semantic HTML, labels, keyboard focus order, sufficient colour contrast.
10. Mobile-first, especially tuned for WhatsApp-opened catalogue browsing.
