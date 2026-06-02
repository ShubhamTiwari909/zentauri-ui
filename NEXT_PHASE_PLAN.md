# Zentauri UI Next Phase Plan

Generated from the current repository state on June 2, 2026.

## Current State Snapshot

Zentauri UI has moved past a simple starter kit into a broad component-system monorepo:

- `packages/components` publishes `@zentauri-ui/zentauri-components` at `1.8.2`.
- The package builds ESM, CJS, and declaration files with `tsup` plus `tsc`.
- The library exposes 42 static UI entries, 27 animated UI entries, 9 chart entries, and 28 hook entries.
- `spinner` is intentionally animated-only, while the rest of the documented UI catalog has static preview routes.
- The component package test snapshot is `75` test files and `507` tests across UI, hooks, charts, and CLI behavior.
- `apps/component-library` is a Next.js 16 docs and preview app with component, hooks, typography, chart, SEO, sidebar, and search surfaces.
- `apps/zentauri-demo-pages` exists as a separate Next.js demo surface but still carries mostly starter README material.
- `apps/zentauri-backend` is a FastAPI contact-form service with MongoDB, pagination endpoints, and Python tests.

The next phase should focus less on adding raw surface area and more on making the package easier to trust, verify, release, and adopt.

## Phase Objective

Make Zentauri UI release-ready as a polished public design-system package: consistent documentation, automated health checks, reliable vendoring CLI behavior, stronger accessibility guarantees, and a cleaner bridge between the docs site, demo pages, and backend.

## Priority 1: Stabilize Project Truth

The repo has several hand-maintained truth surfaces. Some are already drifting.

### Work Items

- Update the root `README.md` package health section to match the current package README and docs home health numbers: `75` test files and `507` tests.
- Update `PROJECT_SUMMARY.md` to reflect package version `1.8.2`, 9 chart entries, 28 hooks, and the current test snapshot.
- Fix backend README setup paths from the stale `apis/zentauri-backend` wording to the actual `apps/zentauri-backend` location.
- Replace the `apps/zentauri-demo-pages/README.md` starter text with repo-specific usage, routes, and purpose.
- Add a short "current package surface" section to the package README that calls out static UI entries, animated entries, chart entries, hooks, and the spinner exception.

### Success Criteria

- A new contributor can read the root README and project summary without finding contradictory counts.
- Package, docs-home, and root health tables agree.
- App READMEs describe the actual workspace and commands.

## Priority 2: Automate Drift-Prone Surfaces

The docs app and package rely on many parallel lists: `tsup.config.ts`, generated registry, sidebar data, SEO JSON, search entries, homepage health, and README coverage tables.

### Work Items

- Add a package-surface audit script that compares:
  - `tsup.config.ts` UI entries against `src/ui/*`.
  - animated entries against `src/ui/*/animated`.
  - chart entries against `src/charts/*`.
  - hook entries against `src/hooks/*`.
  - docs component routes against component SEO JSON.
- Add a test-count script or documented command that can regenerate package health summaries from Vitest JSON output.
- Consider making `apps/component-library/lib/site-search-entries.ts` depend fully on registered sidebar and preview registries instead of manual keyword pockets where possible.
- Add CI-friendly scripts for `pnpm --filter component-library exec vitest run` since the docs app has tests but no `test` script.

### Success Criteria

- Drift between package entries, docs routes, SEO documents, and registry data is caught locally.
- Test totals stop requiring manual arithmetic.
- Docs app tests have an obvious command path from both package scripts and contributor docs.

## Priority 3: Accessibility and Interaction Hardening

The library has strong coverage volume, but the next trust milestone should focus on behavioral quality for compound, dismissible, and keyboard-heavy primitives.

### Work Items

- Audit keyboard flows for `accordion`, `tabs`, `modal`, `drawer`, `popover`, `tooltip`, `dropdown`, `context-menu`, `command`, `select`, `radio-group`, `slider`, and `tree-view`.
- Add or expand tests for focus return, escape behavior, roving tab index, aria attributes, disabled states, nested overlay behavior, and SSR-safe initial renders.
- Add reduced-motion expectations for animated entries that use `framer-motion` or viewport reveal patterns.
- Confirm static entries never import `framer-motion`, `react-icons` subpaths unexpectedly, or chart dependencies.
- Introduce a small accessibility checklist in `packages/components/README.md` for new component contributors.

### Success Criteria

- Keyboard and screen-reader behavior is intentionally documented for the highest-risk components.
- Optional peer dependencies remain isolated to their intended subpaths.
- New component work has a clear a11y acceptance bar.

## Priority 4: CLI Adoption Polish

The vendoring CLI is a differentiator because it lets consumers copy source instead of only importing package bundles. The next phase should treat it as a product surface.

### Work Items

- Expand CLI integration tests for aliases, charts, hooks, animated entries, existing-file behavior, and dependency hints.
- Verify `cli/registry.json` is regenerated in release workflows and never silently stale.
- Improve CLI output for Tailwind v4 `@source` guidance and optional peer dependencies.
- Add examples for `zentauri-ui add button`, `zentauri-ui add charts/line`, and `zentauri-ui add useClipboard`.
- Document the expected destination structure after vendoring.

### Success Criteria

- A consumer can vendor a component, hook, or chart without guessing dependencies.
- Registry freshness is checked before packaging.
- CLI tests cover the most common adoption paths.

## Priority 5: Docs Experience and Information Architecture

The docs site already has a rich catalog. The next phase should make it faster to navigate, easier to compare, and clearer about design-token customization.

### Work Items

- Add a generated package-surface overview page or table that lists all UI, animated, chart, and hook entries.
- Strengthen token docs with copyable CSS variable examples and a dark-mode customization example.
- Make chart docs explicit about `recharts` as an optional peer dependency.
- Add install guidance variants for import-only usage versus vendored-source usage.
- Add "related primitives" links between form controls, overlays, navigation, feedback, and data-display components.
- Run a visual pass on mobile layouts for dense docs pages and code showcase sections.

### Success Criteria

- Users can find import paths, optional dependencies, and token contracts quickly.
- Docs explain why paired light/dark token classes matter.
- Mobile docs remain readable without clipped examples or crowded controls.

## Priority 6: Demo and Backend Integration

The repo contains a demo app and backend, but they are not yet positioned as a cohesive showcase.

### Work Items

- Decide whether `apps/zentauri-demo-pages` is a public examples gallery, internal sandbox, or replacement demo surface.
- Replace starter copy in the demo app with real Zentauri examples using package components.
- Add at least one end-to-end demo flow that uses a form component and submits to the FastAPI backend.
- Add backend smoke tests for health, form validation, pagination, and error responses in a documented command.
- Clarify deployment paths for docs app, demo app, and backend.

### Success Criteria

- Each app has a clear reason to exist.
- A real component-to-backend demo flow can be run locally.
- Backend setup docs match the actual workspace.

## Priority 7: Release and CI Readiness

The package is public-facing. Release work should make builds repeatable and boring.

### Work Items

- Define a release checklist covering install, build, types, tests, registry generation, package contents, and docs smoke check.
- Add a package-size or export smoke test that verifies important subpaths resolve after `pnpm --filter @zentauri-ui/zentauri-components build`.
- Add CI jobs or local scripts for:
  - `pnpm lint`
  - `pnpm check-types`
  - component package tests
  - docs app tests
  - package build
  - docs build
- Verify `prepack` catches registry generation and build failures before publish.
- Add changelog or release-note workflow if one does not already exist.

### Success Criteria

- A release can be prepared with one documented checklist.
- Broken exports and stale registry data are caught before publish.
- Contributors know which commands are required before opening or merging changes.

## Suggested Sequence

1. Documentation truth cleanup: root README, project summary, app READMEs.
2. Drift audit script: package entries, docs routes, SEO JSON, registry freshness.
3. Release checklist and CI command alignment.
4. Accessibility hardening for overlays and keyboard-heavy primitives.
5. CLI adoption polish and vendoring examples.
6. Docs information architecture improvements.
7. Demo/backend integration once the package and docs surfaces are stable.

## Immediate Next Sprint

For the next sprint, keep scope tight:

- Fix stale documentation counts and app README paths.
- Add a docs app `test` script and mention it in the root README.
- Create an audit script for package entry drift.
- Add one export smoke test after package build.
- Pick three high-risk primitives for a11y test expansion: `modal`, `select`, and `context-menu`.

This gives the project a cleaner foundation before adding more components or deeper examples.
