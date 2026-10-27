# Aamontron Documentation Index

This directory is the single source of truth for project documentation. Read the files in the
order below when starting any task.

---

## Reading order

1. **`CLAUDE.md`** (root) — mandatory entry point. Before/after task checklist and conflict rules.
2. **`PROJECT_CONTEXT.md`** — vision, business context, historical decisions, constraints,
   assumptions, risks, superseded decisions. *Read this first on every project.*
3. **`PRD.md`** — problem statement, personas, MVP scope, user stories with acceptance
   criteria, success metrics, non-goals. *Read before any requirement work.*
4. **`APP_FLOW.md`** — routes, screens, entry/exit points, button actions, forms, validation,
   state transitions. *Read before any UI/UX or navigation work.*
5. **`UI_SPEC.md`** — colour tokens and font sources. *Read before any styling or design work.*
   **`UI_SPEC_SUPPLEMENT.md`** — companion: typography scale, spacing, breakpoints, layout,
   component variants, imagery, proposed changes.
6. **`TRD.md`** — verified technology versions, folder structure, architecture, data flow,
   integrations, security, build/test commands, deployment. *Read before any infrastructure,
   build, or integration work.*
7. **`EXECUTION_STATUS.md`** — current implementation status, completed/partial/planned work,
   known issues, technical debt, blockers, next steps. *Read before any work to understand where
   the project stands.*

---

## Document ownership

| Document | Owner (who keeps it current) | Changes when... |
|---|---|---|
| `PROJECT_CONTEXT.md` | Project owner / maintainer | Important decisions, rationale, or constraints change |
| `PRD.md` | Product owner | Requirements, scope, user stories, or acceptance criteria change |
| `APP_FLOW.md` | Product owner + UI lead | Screens, routes, flows, or state transitions change |
| `UI_SPEC.md` | UI lead | Colour tokens or font sources change |
| `UI_SPEC_SUPPLEMENT.md` | UI lead | Typography scale, spacing, breakpoints, layout, component variants, imagery, or proposed changes |
| `TRD.md` | Tech lead / architect | Technology stack, versions, architecture, or deployment change |
| `EXECUTION_STATUS.md` | Tech lead | Implementation progress or verification status changes |

---

## Source-of-truth rules

1. **Source code is evidence of current implementation.** If a document says something the code
   does not do, the code wins and the document must be fixed.
2. **Explicit user decisions and approved requirements govern intended behaviour.** A decision
   in `PROJECT_CONTEXT.md` or `PRD.md` overrides current code; the discrepancy must be flagged.
3. **`TRD.md` and `UI_SPEC.md` record approved constraints.** Proposing to change a `LOCKED`
   decision requires explicit approval.
4. **Early planning assumptions (root) are historical.** Their claims are quoted inline in
   `PROJECT_CONTEXT.md` where they matter. They are never the source of truth for the current
   system.
5. **`README.md` (root) is a deployment reference** — live URL, repo, org, build commands. It
   is not a project-design document.

---

## Statuses used across documents

| Status | Meaning |
|---|---|
| `LOCKED` | Decided and verified |
| `EXISTING` | In place |
| `PROPOSED` | Suggested, not approved |
| `DEPRECATED` | Superseded |
| `SUPERSEDED` | Replaced by a later decision |
| `UNRESOLVED` | Open, needs a decision |
| `IMPLEMENTED` / `DONE` | Verified in code |
| `PARTIAL` | Partially implemented |
| `PLANNED` | Described but not built |
| `NOT IMPLEMENTED` | Confirmed absent |
| `UNVERIFIED` | Inferred from code, not exercised at runtime |

---

## Maintenance rules

- **Update docs as part of task completion**, not as optional cleanup.
- After a task: update `EXECUTION_STATUS.md` for progress/verification changes;
  `PROJECT_CONTEXT.md` for decisions/rationale/constraints; and the PRD, app flow, UI spec, or
  TRD whenever their respective requirements change.
- **Preserve historical context.** Record superseded decisions rather than erasing them.
- **Check cross-document consistency** after changes; report changed files, verification
  results, and unresolved issues.
- **Avoid rewriting unrelated documents** when nothing has changed.
- **Never mark unverified work as complete.** Distinguish tests actually executed from tests
  not run.

---

## Current state

- **Audit date:** 2026-10-27
- **Branch:** `main` @ `2a178b7`
- **Live site:** https://aamontron.github.io/
- **Repository:** https://github.com/aamontron/aamontron.github.io
- **Documentation set:** 7 files in `docs/` + root `CLAUDE.md`; early planning history is
  recorded in `PROJECT_CONTEXT.md`.

---

*This index is part of the documentation set. Update it when documents are added, removed, or
reassigned.*
