# Typography visual verification

Zentauri's docs use **VisualGuard 2.0.0** through its `visualguard/playwright` fixture, with **Playwright 1.58.2**. Both are pinned development dependencies of the docs workspace. The case limit is three minutes to allow full-page image/DOM comparisons; the CI job remains bounded at 35 minutes and retries are disabled. AI is disabled; `failOn: "review"` blocks unexplained differences and independent capture/health failures.

## Matching the rendering environment

Run from the repository root:

```sh
bash scripts/visualguard/run-container.sh compare
```

Docker must be running. The command copies tracked files and non-ignored local changes into an isolated workspace, installs the frozen lockfile, builds only the docs and their workspace dependencies, starts a production server on container port 3110, runs `visualguard doctor` after readiness, and compares the complete suite. It does not reuse the local development server or host dependencies.

Local verification and `.github/workflows/visualguard.yml` use the same Linux ARM64 Playwright image, pinned by digest. Its bundled Chromium, fonts and Node runtime form the baseline environment. The GitHub job uses `ubuntu-24.04-arm`. An x64 machine can run the container through emulation. Keep the image and Playwright dependency versions together when upgrading. The `zentauri-visualguard-pnpm-v9` Docker volume caches dependency downloads; no baseline or report is cached in it.

The package requires Node 22.12 or newer. The repo's development Node 22.14 and the container's Node 24.13 meet that requirement. The fixture setup rejects direct runs outside Linux ARM64. Native macOS captures have a different rendering identity and cannot replace these Linux references. `pnpm --filter component-library visual:doctor` can diagnose the native environment, but it requires the configured server and installed browser binaries. In baseline mode, doctor’s missing-production-URL warning is expected; the saved references supply that side of the comparison.

## Coverage and capture policy

`routes.ts` lists all 15 typography sections and checks that list against the docs registry's section type. Each page is captured at 1440 × 900 and 390 × 844 in both light and dark themes. Truncation and editorial additionally run at 320 × 844 in both themes.

The four regular projects also exercise:

- Expanded and collapsed disclosure states, preserving button focus after keyboard activation.
- Footnote target focus, native backlink return, and a focused heading permalink.
- Editorial reflow at 200% root text size, including the Arabic drop-cap paragraph.

The complete run has **76 passing cases and 88 image checkpoints**. The 32 excluded cases apply only to the narrow projects; they are intentional and documented in the spec. `verify-evidence.mjs` rejects incomplete runs and requires a PNG, metadata, DOM and health sidecar for every checkpoint. Update its counts when intentionally extending the matrix.

Themes are prepared through the real controlled docs switch and checked on `body[data-theme]`; browser color scheme alone does not set the docs theme. Captures use en-US, UTC, a fixed date, scale factor 1 and reduced motion. VisualGuard waits for fonts, disables CSS animation/transitions, pauses media and checks screenshot stability. Normal page screenshots include the examples, API tables and footer; the suite rejects clipped or unstable captures at every checkpoint. The normal full-page limit is 60,000px. At 200% text, the generated API reference makes the page unusually tall and full-page captures showed blank regions. The enlarged-text fixture therefore takes two explicit viewport captures, positioned on the article and Arabic paragraph below the visible sticky header; their dimensions must match the configured viewport. The normal-size editorial page still covers its complete content. No text, focus indicators, tables or code are masked. Scroll-to-load is disabled to retain interaction focus and scroll state.

The Vercel analytics script is fulfilled with an empty JavaScript response because that deployment-only telemetry endpoint is absent from the local production server. It renders no UI. Application assets, fonts and navigation requests remain real and are checked. Accessibility and performance comparisons are disabled in this visual gate; semantic/reflow/focus assertions remain explicit tests, and this suite does not replace a full accessibility audit.

The pixel allowance is zero, with pixelmatch's 0.1 per-pixel sensitivity and its normal anti-alias handling. The fixture also asserts zero changed pixels for every checkpoint, so a heuristic content/noise label cannot bypass review. No noise map or AI classification can suppress a difference. Do not increase tolerances merely to accept changed typography.

## Reviewing intentional changes

First run `compare` and inspect the failing case's reference, candidate, diff, DOM findings and trace. Confirm the change is expected and other affected pages still pass. For an approved design change:

```sh
bash scripts/visualguard/run-container.sh update
```

This replaces the generated candidate reference sets under `visualguard-results/candidate-baselines`; it does **not** overwrite the tracked references. The update report lists capture status; VisualGuard 2.0.0 supplies image/diff attachments on comparison runs. Inspect the candidate images directly before copying only the approved checkpoint's complete four-file set into `visualguard/baselines/playwright/`. For the initial approved typography design, review every set. Then run the full `compare` command again and commit the reviewed sets with their provenance notes. Never use updates in CI, `baseline.missing: "create"`, legacy metadata allowances, retries, or blanket refreshes to conceal failures.

PNG and sidecar names are generated by VisualGuard from test/file/project/check identities. Retain those names together. Renaming tests or projects is a baseline migration, not an ordinary refresh. Remove references for retired checkpoints after review. Baselines are taken from the approved editorial stack with the docs reflow fixes discovered by this suite. The fixes let the content column shrink, wrap showcase/mobile controls, and break long docs API names and headings when needed. Existing typography primitives and example content are unchanged. Historical main-branch screenshots were not reconstructed. Capture snapshots exclude Git internals; `baseline-provenance.json` records the approved source revision and added layout work, while run evidence records `source-revision.txt`.

Browser, image, font, platform, viewport, theme or stabilization changes require a deliberate migration: document the new environment, recapture candidates there, inspect all affected references, replace their complete sets, and verify a fresh comparison. Do not edit rendering fingerprints to bypass a mismatch.

## Reports and CI

All run evidence stays in the ignored `apps/component-library/visualguard-results/` directory:

```sh
pnpm --filter component-library visual:report
```

The HTML report contains reference/candidate/diff attachments and VisualGuard's JSON findings; the test output preserves DOM snapshots and failure traces. JSON and JUnit summaries sit alongside it. CI uploads the complete directory on success or failure for 14 days, and it never updates references. GitHub-hosted execution is verified only after the workflow actually runs; a matching local container run is recorded separately.

Firefox, WebKit and optional advisory AI are future extensions after this Chromium matrix is stable. The public component package receives no VisualGuard runtime dependency.
