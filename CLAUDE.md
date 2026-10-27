# CLAUDE.md — Aamontron (আমন্ত্রণ)

This file is the **mandatory instruction entry point** for every Claude Code task on this
project. Read it before doing anything else.

---

## Before every task

**To trigger full context recall for any task, say: "Aamontron context"** followed by your
request. Claude Code will then load this file plus the relevant `docs/` files before planning.

1. **Read `docs/README.md`** — the documentation index, reading order, and maintenance rules.
2. **Read `docs/PROJECT_CONTEXT.md`** — vision, business context, historical decisions,
   constraints, assumptions, risks, and superseded decisions.
3. **Read the relevant domain doc** before planning or implementing:
   - Requirements / scope → `docs/PRD.md`
   - Screens, routes, flows, state transitions → `docs/APP_FLOW.md`
   - Design tokens, colours, typography, layout → `docs/UI_SPEC.md`
   - Technology stack, versions, architecture, deployment → `docs/TRD.md`
   - Current implementation status, blockers, next steps → `docs/EXECUTION_STATUS.md`
4. **Inspect relevant source code, configuration, tests, and existing Git changes** — do not
   plan from documentation alone. Source code is evidence of current implementation.
5. **Identify applicable acceptance criteria, non-goals, architectural constraints, and
   documentation gaps** from the PRD and execution status.
6. **Propose a plan for non-trivial work and seek approval** when scope, security, cost, or
   locked decisions would change.

---

## After every task

1. **Review actual code changes and test results.** Do not report work you did not do.
2. **Update every affected documentation file.** Documentation maintenance is part of task
   completion, not optional cleanup.
3. **Update `docs/EXECUTION_STATUS.md`** whenever implementation progress or verification
   status changes.
4. **Update `docs/PROJECT_CONTEXT.md`** when important decisions, rationale, or constraints
   change.
5. **Update `docs/PRD.md`, `docs/APP_FLOW.md`, `docs/UI_SPEC.md`, or `docs/TRD.md`** whenever
   their respective requirements change.
6. **Preserve historical context and record superseded decisions** rather than silently
   erasing them.
7. **Check cross-document consistency** and report changed files, verification results, and
   unresolved issues.

Avoid rewriting unrelated documents when nothing has changed.

---

## Conflict handling

1. **Source code is evidence of current implementation.** If a document says something the code
   does not do, the code wins — and the document is wrong and must be fixed.
2. **Explicit user decisions and approved requirements govern intended behaviour.** A decision
   recorded in `PROJECT_CONTEXT.md` or `PRD.md` overrides what the code currently does, and
   the discrepancy must be flagged, not silently resolved.
3. **Technical documents record approved constraints.** `TRD.md` and `UI_SPEC.md` document
   what is `LOCKED`; proposing to change a `LOCKED` decision requires explicit approval.
4. **Early planning assumptions (root) are historical.** Their claims are quoted inline in
   `PROJECT_CONTEXT.md` where they matter. They are never the source of truth for the current
   system. When a quoted historical claim conflicts with reality, `PROJECT_CONTEXT.md` records
   the truth and the claim is labelled `SUPERSEDED`.
5. **Never mark unverified work as complete.** Only record verification you actually performed.
   Distinguish tests actually executed from tests not run.

---

## Standing constraints

- **Do not push without explicit instruction.** The user controls when changes are pushed.
  Commit locally; ask before pushing.
- **Do not implement out-of-scope features, silently change locked decisions, or mark unverified
  work as complete.**
- **Documentation-only work** must not modify application code, dependencies, configuration, or
  deployment settings.

---

## Project essentials

| Item | Value |
|---|---|
| Live site | https://aamontron.github.io/ |
| Repository | https://github.com/aamontron/aamontron.github.io |
| Default branch | `main` (tracks `origin/main`) |
| Deploy branch | `gh-pages` (auto-created by `.github/workflows/deploy.yml`) |
| Build command | `npx ng build --configuration=production --base-href=/` |
| WhatsApp number | +91 74885 80857 (`917488580857` in `environment.*`) |
| Only non-English content | Bengali brand logo `আমন্ত্রण` in the header |

---

## When in doubt

Read the docs. If the docs are silent or contradict each other, inspect the code, report the
discrepancy, and ask before deciding.
