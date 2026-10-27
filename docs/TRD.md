
# TRD — Aamontron (মন্ত্রণ)

> **Audit date:** 2026-10-27 · **Branch:** `main` @ `2a178b7`
>
> Versions below are **verified from `package.json` and `package-lock.json`** (lockfileVersion 3,
> 355 package entries). Statuses: `LOCKED` = decided and verified · `EXISTING` = in place ·
> `PROPOSED` = suggested, not approved · `DEPRECATED` = superseded · `UNRESOLVED` = open.

---

## 1. Technology stack

### 1.1 Core framework

| Component | Package | Exact version (lockfile) | Declared range | Status |
|---|---|---|---|---|
| Angular core | `@angular/core` | **22.2.3** | `^22.2.0` | `LOCKED` |
| Angular common | `@angular/common` | **22.2.3** | `^22.2.0` | `LOCKED` |
| Angular compiler | `@angular/compiler` | **22.2.3** | `^22.2.0` | `LOCKED` |
| Angular platform-browser | `@angular/platform-browser` | **22.2.3** | `^22.2.0` | `LOCKED` | `LOCKED` |
| Angular router | `@angular/router` | **22.2.3** | `^22.2.0` | `LOCKED` |
| Angular forms | `@angular/forms` | **22.2.3** | `^22.2.0` | `LOCKED` |
| Angular animations | `@angular/animations` | **22.2.3** | `^22.2.3` | `LOCKED` |
| Angular Material | `@angular/material` | **22.2.4** | `^22.2.4` | `LOCKED` |
| Angular CDK | `@angular/cdk` | **22.2.4** | `^22.2.4` | `UNRESOLVED` — imported nowhere |
| Angular build (vite-based) | `@angular/build` | **22.2.4** | `^22.2.4` | `LOCKED` |
| Angular CLI | `@angular/cli` | **22.2.4** | `^22.2.4` | `LOCKED` |
| Angular compiler-cli | `@angular/compiler-cli` | **22.2.3** | `^22.2.0` | `LOCKED` |

### 1.2 Runtime / language

| Component | Version | Status |
|---|---|---|
| TypeScript | **6.0.3** (declared `~6.0.2`) | `LOCKED` |
| rxjs | **7.8.2** (declared `~7.8.0`) | `LOCKED` |
| tslib | **2.8.1** | `LOCKED` |
| Node.js | not pinned in lockfile (`engines` unset); CI uses **22** | `EXISTING` |
| npm | **10.9.9** (`packageManager` field) | `LOCKED` |

### 1.3 Tooling

| Component | Version | Status |
|---|---|---|
| prettier | **3.9.10** (`^3.8.1`) | `EXISTING` — configured in `.prettierrc` (printWidth 100, singleQuote, Angular HTML parser) |

### 1.4 Build system
- Builder: `@angular/build:application` (the Angular CLI's Vite-based production builder).
- `tsconfig.json` → `tsconfig.app.json` (app) / `tsconfig.spec.json` (test, Vitest globals).
- Target: `ES2022`, module `preserve`, strict flags (`noImplicitOverride`,
  `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch`,
  `skipLibCheck`, `isolatedModules`, `importHelpers`).
- Angular compiler strictness: `strictInjectionParameters`, `strictInputAccessModifiers`.

---

## 2. Folder structure



aamontron-site/
├── .github/workflows/deploy.yml     # GitHub Pages deployment
├── .vscode/                         # editor config (extensions.json only)
├── docs/                            # project documentation (created 2026-10-27)
├── dist/aamontron-site/browser/     # build output (stale — see §8)
├── node_modules/
├── public/favicon.ico               # only public asset
├── src/
│   ├── index.html                   # HTML shell + Material Icons CDN link
│   ├── main.ts                      # bootstrapApplication entry
│   ├── styles.scss                  # global styles + Material theme
│   ├── styles/variables.scss        # colour tokens + breakpoints
│   ├── app/
│   │   ├── app.ts                   # root component (standalone)
│   │   ├── app.html                 # header + footer
│   │   ├── app.scss                 # navbar / footer layout
│   │   ├── app.config.ts            # ⚠️ DEAD — exported appConfig, never imported
│   │   ├── app.routes.ts            # 4 routes + wildcard redirect
│   │   ├── environments/
│   │   │   ├── environment.ts       # dev config
│   │   │   └── environment.prod.ts  # prod config
│   │   ├── data/
│   │   │   ├── categories.json      # 10 categories
│   │   │   └── invitations.json     # 6 cards
│   │   ├── models/
│   │   │   ├── invitation.model.ts  # Category, InvitationCard, EnquiryPayload
│   │   │   └── testimonial.model.ts # Testimonial (added 2026-10-27)
│   │   ├── services/
│   │   │   ├── catalogue.service.ts # loads + filters + searches JSON
│   │   │   └── whats-app.service.ts # wa.me URL construction + window.open
│   │   └── features/
│   │       ├── home/                # hero, categories, featured, how-to, testimonials
│   │       ├── catalogue/           # search, filters, grid, empty state
│   │       ├── invitation-detail/   # gallery + specs + enquiry CTA
│   │       ├── enquiry/             # reactive form → WhatsApp handoff
│   │       └── testimonial/         # auto-advancing Facebook review carousel
├── angular.json
├── package.json / package-lock.json
├── tsconfig.json / tsconfig.app.json / tsconfig.spec.json
├── (early planning history recorded in docs/PROJECT_CONTEXT.md)
├── README.md                        # deployment + org + owner reference
└── LICENSE                          # MIT, 2026 Sayan Samanta

**Notes:**
- Single-root Angular app (`newProjectRoot: "projects"` is set but unused — no nested
  projects exist).
- `src/app/assets/` **does not exist** — all imagery is external.
- `src/app/app.config.ts` is dead code; `main.ts` bootstraps inline.

---

## 3. Architecture

### 3.1 Application type
**Standalone Angular SPA** (Angular 22, Ivy). No backend. Deployed as static files to GitHub
Pages. All business logic runs in the browser bundle.

### 3.2 Bootstrap
`src/main.ts`:
```ts
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimations()]
}).catch((err) => console.error(err));


provideBrowserGlobalErrorListeners() is imported in app.config.ts but that file is never
imported — the global-error-listener provider is not active.

3.3 State management
No state-management library (no NgRx, Signals-based stores, or services beyond CatalogueService
and WhatsAppService). Component-local state via Observables and FormGroup. Data is
loaded once from static JSON (of(...)).

3.4 Data flow

JSON files ──▶ CatalogueService (in-memory, of()) ──▶ components (Observable | subscribe)
                                                          │
Enquiry form ──▶ WhatsAppService.buildEnquiryUrl() ──▶ window.open('https://wa.me/...')
3.5 Routing
app.routes.ts — four named routes + ** → home. All routes are component routes (no
resolvers, guards, or lazy loading). Deep links are supported via the 404.html fallback.

3.6 Component communication
Parent → child: none (no @Input() anywhere in the app).
Child → parent: none (no @Output() anywhere).
Shared state: CatalogueService (read-only) and WhatsAppService (stateless URL builder).
4. Integrations
Integration	Endpoint	Trigger	Status
WhatsApp	https://wa.me/<number>?text=<encoded>	User clicks Enquiry / "Open WhatsApp Again"	LOCKED
Material Icons	fonts.googleapis.com/icon?family=Material+Icons	Page load (index.html)	LOCKED
Card imagery	Unsplash URLs in invitations.json	Render	EXTERNAL — no fallback
Google Fonts (Noto Sans Bengali)	fonts.googleapis.com	Not loaded — referenced in SCSS, absent from index.html	PLANNED
WhatsApp message format (built in WhatsAppService.buildEnquiryUrl):


Hello! I'm enquiring about an invitation card (Aamontron):

📋 Card: *<title>* (Code: <code>)
🏷️ Category: <categoryId>     ⚠️ passes the raw ID (e.g. "cat-1"), not a human-readable name
👤 Name: <name>
📞 Phone: <phone>
📅 Event Date: <date>
🔢 Quantity: <qty> pcs
💬 Special Requirements: <notes>   (omitted when empty)

Please share detailed pricing and samples. Thank you!
5. Data contracts
5.1 Category (invitation.model.ts)

{ id: string, name: string, slug: string, icon: string (Material icon name), displayOrder: number }
10 records in categories.json. slug is not used at runtime (no route uses it).

5.2 InvitationCard (invitation.model.ts)

{ id, title, titleEnglish, code, categoryId, tags[], priceEstimate, imageUrl, gallery[],
  isFeatured, isNew, dimensions, paperType, description }
6 records in invitations.json. titleEnglish is present in the model and rendered by the
detail page, but no JSON record populates it — the detail page shows a blank italic line.

5.3 EnquiryPayload

{ cardId, cardTitle, category, customerName, customerPhone, eventDate, quantity, customNotes? }
Constructed in EnquiryComponent.onSubmit() and passed to WhatsAppService.

6. Security and privacy constraints
No authentication, no user accounts, no persistent data. Enquiry fields are transient and sent to WhatsApp; nothing is stored.
No analytics, tracking scripts, or cookies.
Outbound third-party calls: Google Fonts CDN, Unsplash, wa.me (user-initiated).
No HTTPS-specific code. Hosting is HTTPS (GitHub Pages), but no HSTS, CSP, or security headers are configured (not configurable on GitHub Pages without a custom domain + records).
permissions: contents: write on the deploy job is the only elevated permission**; it is required for peaceiris/actions-gh-pages to push the gh-pages branch.
7. Environment variables
No environment-variable mechanism beyond Angular's environment.* files. No .env,
no secrets manager.

File	Key	Value	Purpose
environment.ts (dev)	whatsAppNumber	'917488580857'	WhatsApp number (+91 74885 80857)
brandName	'Aamontron'	Brand name
environment.prod.ts (prod)	whatsAppNumber	'917488580857'	Same value in prod
brandName	'Aamontron'	Brand name
brandName is declared but never read anywhere in the app — dead config.

8. Build / test commands
Command	Purpose	Verified?
npm ci	Install from lockfile (CI)	yes — workflow step
npx ng build --configuration=production --base-href=/	Production build → dist/aamontron-site/browser	yes — workflow step
cp ./dist/.../index.html ./dist/.../404.html	SPA fallback	yes — workflow step
ng serve	Dev server at localhost:4200	not run this session
ng build (default)	Build with default config	not run this session
ng test	Vitest unit tests	would run nothing — 0 spec files exist
ng e2e	E2E — no framework configured	not applicable
Local dist/ is stale. The checked-in build is from Oct 26 00:34, before the Material
theme fix (20:48). It does not reflect the current source. The live site is served from the
workflow's build, not this directory.

9. Deployment process
9.1 Trigger
Push to main → .github/workflows/deploy.yml runs.

9.2 Steps
actions/checkout@v4
actions/setup-node@v4 (Node 22, npm cache)
npm ci
npx ng build --configuration=production --base-href=/
cp ./dist/aamontron-site/browser/index.html ./dist/aamontron-site/browser/404.html
peaceiris/actions-gh-pages@v4 → gh-pages branch, publish_dir: ./dist/aamontron-site/browser, enable_jekyll: false
9.2 Hosting model
Repository: aamontron/aamontron.github.io (GitHub Organization aamontron).
Default branch: main. Deploy branch: gh-pages (auto-created).
Live URL: https://aamontron.github.io/ — root site, --base-href=/.
SPA fallback: 404.html is a copy of index.html, so unknown routes render the home page rather than a 404 message. PROPOSED improvement: a real 404 page.
9.3 Limitations (verified, not assumed)
No server-side logic of any kind. Any feature requiring a backend is unsupported by this hosting model.
No custom security headers (HSTS, CSP) — not configurable on GitHub Pages.
No custom domain configured (README notes the option but it is not set up).
Content changes require a push + rebuild + deploy (minutes). No hot-reload content.
No environment-specific config at deploy time — environment.prod.ts is edited by hand.
10. Technology decision register
ID	Decision	Status
T1	Angular standalone app, no monorepo	LOCKED
T2	No backend for MVP	LOCKED
T3	External images (Unsplash), no src/assets/	EXISTING (contradicts an early plan's claim of repo-committed images)
T4	WhatsApp wa.me client-side link	LOCKED
T5	Angular Material rose-red prebuilt theme	LOCKED
T6	GitHub Pages + peaceiris/actions-gh-pages@v4	LOCKED
T7	Root org site aamontron.github.io, --base-href=/	LOCKED
T8	permissions: contents: write on deploy job	LOCKED
T9	English-only content (Bengali logo exception)	LOCKED
T10	Centralised WhatsApp number in environment.*	LOCKED
T11	@angular/cdk dependency	UNRESOLVED — unused, candidate for removal
T12	Vitest test runner configured but unused	UNRESOLVED — 0 spec files
T13	app.config.ts as bootstrap config	DEPRECATED — dead code; main.ts bootstraps inline
T14	Repo-committed images (src/assets/images)	SUPERSEDED — never built
T15	Subfolder base-href /aamontron-site/	SUPERSEDED — replaced by root site
Audit date: 2026-10-27. Branch: main @ 2a178b7