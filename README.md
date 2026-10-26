# AamontronSite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## 🚀 Deployment & Publishing

This site is built with Angular and deployed to **GitHub Pages** via a GitHub Actions workflow.

### Live Site

🔗 **https://aamontron.github.io/** (root site, served from the `gh-pages` branch)

### Repositories

| Item | Value |
|------|-------|
| **Production repo** | `https://github.com/aamontron/aamontron.github.io` |
| **Local clone path** | `/Users/sayansamanta/sayan-hq/claude-lab/aamontron-site` |
| **Git remote (`origin`)** | `https://github.com/aamontron/aamontron.github.io.git` |
| **Default branch** | `main` |
| **Deploy branch** | `gh-pages` (auto-created by workflow) |

### Deploy Command

```bash
git push origin main
```

The `.github/workflows/deploy.yml` workflow runs automatically on every push to `main`:
1. Installs dependencies (`npm ci`)
2. Builds production (`ng build --configuration=production --base-href=/`)
3. Adds `404.html` fallback for SPA routes
4. Deploys to GitHub Pages via `peaceiris/actions-gh-pages@v4`

### Build Configuration

- **Base href:** `/` (root site — assets resolve from root, not a subfolder)
- **Output path:** `dist/aamontron-site/browser`
- **SPA fallback:** `404.html` copied from `index.html`

---

## 🏢 Organization & Owner Details

| Detail | Value |
|--------|-------|
| **GitHub Organization** | [`aamontron`](https://github.com/aamontron) |
| **Org URL** | `https://github.com/aamontron` |
| **Org created** | 2026-10-26 |
| **Owner name** | Sayan Samanta |
| **Owner email** | `dev-sayan-samanta@users.noreply.github.com` |
| **Personal GitHub** | [`dev-sayan-samanta`](https://github.com/dev-sayan-samanta) |

---

## 📝 Notes

- The GitHub Actions workflow requires `permissions: contents: write` to create and push the `gh-pages` branch.
- GitHub Pages may take a few minutes to activate after the first push to `gh-pages`.
- For a custom domain (e.g., `aamontron.com`), add a `CNAME` record pointing to `dev-sayan-samanta.github.io` (or the new org URL) and set the custom domain in repo Settings → Pages.
