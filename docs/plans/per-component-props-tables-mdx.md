# Plan: Per-component MDX docs + auto-generated live props tables

**Status:** Proposed
**Owner:** TBD
**Scope:** `packages/components` (extraction) + `apps/component-library` (rendering / MDX)
**Related roadmap item:** Phase 4 — Developer experience & distribution

---

## 1. Goal

Every component preview page should show an **auto-generated props/API table** sourced from the
component's `types.ts`, so the docs can never drift from the real prop surface. Layer an **MDX
authoring surface** on top so each component gets hand-written narrative docs (when to use, gotchas,
accessibility notes) that can embed the generated table and the live playground inline.

Two deliverables, deliberately decoupled:

1. **Props extraction → JSON manifest → `<PropsTable>`** (the high-value, low-risk core).
2. **MDX content pipeline** that can render that table + the existing playground inside authored prose.

You can ship (1) without (2). (2) depends on (1).

---

## 2. Current state (what we build on)

| Fact                                                                                                                                                                                                                                                                                   | Implication for this feature                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Props are declared in `src/ui/<name>/types.ts` as `VariantProps<typeof xVariants> & {…}`, intersected with `HTMLAttributes<…>`, with JSDoc on some props (e.g. accordion `value`, `defaultValue`).                                                                                     | Extraction must **resolve** `VariantProps` to its union of keys and must **filter out** the hundreds of inherited DOM props from `HTMLAttributes`. JSDoc must be captured as the description column.                                                                   |
| Variant option literals live in `src/design-system/<name>.ts` (the keys of `zui*Appearances`, `zui*Sizes`, …); `variants.ts` wires them via `cva()` with `defaultVariants`.                                                                                                            | Variant **option lists** and **defaults** are most reliably read from the design system / cva config, not re-parsed from raw unions.                                                                                                                                   |
| A public **introspection facade** exists: `@zentauri-ui/zentauri-components/design-system/facade` → `DesignSystem.getComponent(slug)` exposes `groups()`, `appearances()`, `sizes()`, slots, variables. Docs already consume it (`components/preview/tokens/token-reference-data.ts`). | Reuse the facade for the **variant** half of each table (groups + option keys + token links). Use a docgen pass for the **non-variant** half (callbacks, `children`, controlled props, refs) + JSDoc.                                                                  |
| Codegen-into-JSON is an established pattern: `scripts/generate-registry.mjs`, `check-design-tokens.mjs`, `check-exports.mjs`, all run on `prepack`/CI. `check-design-tokens.mjs` already imports the **TypeScript compiler API** (`typescript` is a devDep).                           | Add `scripts/generate-props.mjs` in the same style. **No new heavy tooling required** — the TS compiler is already in the toolchain. A purpose-built lib (`react-docgen-typescript`) is an optional accelerator, not a necessity.                                      |
| The canonical component list is `uiComponentNames` (and `uiAnimatedComponentNames`) in `tsup.config.ts`.                                                                                                                                                                               | Iterate the same list so the generator stays in lockstep with the build/registry.                                                                                                                                                                                      |
| Types are also emitted to `dist/*.d.ts` via `tsconfig.emit-types.json`.                                                                                                                                                                                                                | Extraction can run against **either** source `.tsx` (needs the components `tsconfig`) or the flattened `.d.ts`. `.d.ts` resolves `VariantProps` to literal unions cleanly — attractive for the variant unions, but loses JSDoc placement nuance. Recommendation below. |
| The docs app is **Next.js 16 App Router**, **no MDX configured**, no `@next/mdx`/`react-docgen`/`typedoc`/`ts-morph` deps. SEO is data-driven JSON → metadata. Preview pages compose `sections/*` via `PreviewPageShell`.                                                              | MDX is net-new wiring (Phase C). The props table can be added as a plain React **section** first, no MDX needed. Heed `apps/zentauri-demo-pages/AGENTS.md`: read `node_modules/next/dist/docs/` before writing Next 16 config.                                         |

---

## 3. Key challenges & decisions

### 3.1 Resolving `VariantProps<typeof cva>`

`react-docgen` (the classic AST one) cannot resolve this — it needs a type checker. Options:

- **TS Compiler API against source** (what `check-design-tokens.mjs` already does). Full control;
  we can walk the resolved type of `XProps`, expand intersections, and read each property's
  declared type + JSDoc. More code to write.
- `**react-docgen-typescript`\*\*. Purpose-built for React prop tables; resolves intersections and
  JSDoc out of the box; returns `{name, type, required, defaultValue, description}` per prop. Trips on
  `type` aliases vs `interface` in some versions and explodes `HTMLAttributes` unless filtered.
- **Parse the emitted `.d.ts`**. Unions are pre-resolved, but JSDoc and "which props are ours vs
  inherited" is murkier.

**Decision:** Use `**react-docgen-typescript` against source `.tsx`** as the primary extractor for the
*prop list + descriptions + required flags*, configured with a `propFilter` that **drops props
declared in `node_modules` / `@types/react*`* (kills the `HTMLAttributes` noise) while keeping ours.
Cross-reference the **facade** for *variant option enumeration, grouping, and defaults\* (cleaner and
already battle-tested) instead of trusting giant raw unions. If we want zero new deps, the fallback is
a hand-rolled TS-compiler walker — same output shape, ~150 extra lines. Recommend starting with the
library and keeping the manifest schema tool-agnostic so we can swap later.

### 3.2 The `HTMLAttributes` firehose

`AccordionItemProps = HTMLAttributes<HTMLDivElement> & {value; ref}`. We do **not** want 250 DOM
props in the table. Strategy: `propFilter` excludes anything whose declaration file is under
`node_modules`, **except** an allowlist of commonly-overridden ones we _do_ want to surface
(`className`, `children`, `id`, `style`, `onClick`?). Make the allowlist a constant in the generator.

### 3.3 Sub-components / compound APIs

Accordion exports `AccordionProps`, `AccordionItemProps`, `AccordionTriggerProps`,
`AccordionContentProps`. A component's table must cover **each exported `*Props` type**, grouped under
its sub-component name. The generator should enumerate every exported `*Props` symbol from
`src/ui/<name>/types.ts` (and `animated/` if present), not just the root.

### 3.4 Defaults

Destructured defaults aren't `defaultProps`, so docgen won't see them. Variant defaults live in
`cva(... { defaultVariants })`. **Read defaults from `variants.ts` `defaultVariants`** (regex or TS
walk) and merge into the manifest. Non-variant defaults: capture from JSDoc `@default` tags as a
convention (cheap, explicit, authoring-controlled).

### 3.5 Keeping it from drifting (the whole point)

Generated artifact must be **checked in** and **verified in CI** (like `registry.json`). A
`check:props` step regenerates to a temp buffer and fails if it differs from the committed file —
identical pattern to the registry freshness check. Wire into `prepack` + the CI gate.

### 3.6 Where the manifest lives

Generate **into the package** (e.g. `cli/props.json` or `src/generated/props.json`), add to `files`
and optionally `exports`, mirroring `cli/registry.json`. The docs app imports it across the workspace.
Bonus: shipping it means consumers / third-party doc tools can use it too. (Alternative: emit straight
into `apps/component-library/content/` — rejected; splits the source of truth away from the package.)

---

## 4. Architecture / data flow

```
src/ui/<name>/types.ts ─┐
src/ui/<name>/variants.ts ─┼─►  scripts/generate-props.mjs  ─►  cli/props.json  (committed)
src/design-system (facade) ─┘            │                              │
                                         │ (react-docgen-typescript      │  workspace import
                                         │  + facade + defaultVariants)  ▼
                                         │                    apps/component-library
                                         ▼                    ├─ components/api/PropsTable.tsx
                                  check:props (CI/prepack)    ├─ lib/props-data.ts (typed loader)
                                  fails on drift              └─ content/docs/<slug>.mdx (Phase C)
```

### Manifest schema (`cli/props.json`)

```jsonc
{
  "version": 1,
  "generatedFrom": "tsup.config.ts uiComponentNames",
  "components": {
    "accordion": {
      "slug": "accordion",
      "subcomponents": [
        {
          "name": "Accordion",
          "propsType": "AccordionProps",
          "props": [
            {
              "name": "type",
              "type": "\"single\" | \"multiple\"",
              "required": false,
              "default": "single",          // from cva defaultVariants / @default
              "description": "Selection mode.",
              "group": "behavior",          // variant | behavior | controlled | dom
              "deprecated": false
            },
            {
              "name": "appearance",
              "type": "enum",
              "options": ["default","outline","ghost","…44 total"],
              "isVariant": true,
              "variantGroup": "appearance",
              "default": "default",
              "tokenRef": "--zui-accordion-*"   // from facade, links to token page
            }
          ]
        },
        { "name": "AccordionItem", "propsType": "AccordionItemProps", "props": [ … ] }
      ]
    }
  }
}
```

---

## 5. Implementation phases

### Phase A — Extraction script (the core; ship-alone-able)

**Files:**

- `packages/components/scripts/generate-props.mjs` — new generator.
- `packages/components/scripts/check-props.mjs` — freshness guard (mirrors registry check).
- `packages/components/cli/props.json` — committed output.
- `packages/components/package.json` — add `generate:props` + `check:props` scripts; add to `prepack`; add `props.json` to `files` (+ `exports` entry `./props.json` if docs import via subpath).
- add `react-docgen-typescript` to `devDependencies` (or skip and hand-roll on the TS API).

**Tasks:**

1. Read `uiComponentNames` from `tsup.config.ts` (reuse the `extractQuotedNames` helper already in `generate-registry.mjs`).
2. For each component, run docgen over `src/ui/<name>/index.ts` (+ `animated/index.ts`), with a `propFilter` that drops `node_modules`-declared props except an allowlist.
3. Enumerate exported `*Props` symbols → subcomponents.
4. Merge variant metadata from the **facade** (`DesignSystem.getComponent(slug)`): mark `isVariant`, attach `options`, `variantGroup`, `tokenRef`.
5. Merge defaults from `variants.ts` `defaultVariants` and JSDoc `@default`.
6. Classify each prop into `group` (`variant` / `controlled` / `behavior` / `dom`) for table sectioning.
7. Write deterministic, sorted JSON (stable key order → clean diffs).
8. `check-props.mjs`: regenerate in-memory, compare to committed file, non-zero exit on mismatch.

**Acceptance:** `pnpm --filter @zentauri-ui/zentauri-components generate:props` produces a manifest
covering all `uiComponentNames`; `check:props` passes on a clean tree and fails after a manual edit;
JSDoc descriptions and the 44-key appearance options appear for accordion; zero raw DOM props leak.

### Phase B — `<PropsTable>` in the docs app

**Files:**

- `apps/component-library/lib/props-data.ts` — typed loader over `props.json` (`getComponentProps(slug)`), mirroring `lib/preview-seo.ts` style.
- `apps/component-library/components/api/PropsTable.tsx` — renders subcomponent groups → tables (Prop / Type / Default / Description), with variant options shown as chips and `tokenRef` linking to the tokens page. Reuse styling from the tokens reference table.
- `apps/component-library/components/api/PropsTable.test.tsx` — render test (Vitest, like the sidebar tests).

**Tasks:**

1. Typed import of the manifest (declare a `ComponentPropsDoc` type).
2. Component renders one `<section>` per subcomponent; collapse the `dom`/inherited group behind a "Show inherited HTML props" toggle.
3. Add a new **"API" section** to one pilot preview page (accordion) via its `sections/` + `PreviewPageShell`.

**Acceptance:** Accordion page shows a correct, themed props table for all four sub-components;
clicking a variant token link jumps to the tokens page; dark mode correct; a11y check passes.

### Phase C — MDX content pipeline (the "MDX docs" half)

> Read `node_modules/next/dist/docs/` for MDX guidance before editing Next config (Next 16 caveat).

**Files:**

- `apps/component-library/package.json` — add `@next/mdx`, `@mdx-js/react`, remark/rehype plugins (e.g. `rehype-slug`, `rehype-autolink-headings`, `remark-gfm`).
- `apps/component-library/next.config.*` — wrap with `createMDX`, register `.mdx` page extensions.
- `apps/component-library/mdx-components.tsx` — global MDX component map (headings, code → `CodeHighlight`, plus expose `<PropsTable>`, the per-component `<XPlayground>`, `<Section>`).
- `apps/component-library/content/docs/<slug>.mdx` — authored narrative per component.
- Loader/route glue: either render MDX inside the existing `app/preview/components/<slug>/page.tsx` or move narrative there; keep the SEO JSON registry as the metadata source.

**Tasks:**

1. Stand up `@next/mdx`; render a single pilot `.mdx` that embeds `<AccordionPlayground/>` + `<PropsTable slug="accordion"/>`.
2. Define the MDX component map once; ensure client components (playground) are importable from MDX (they're already `"use client"`).
3. Decide the authoring convention: MDX owns prose + ordering; generated table and playground are embedded components (never hand-authored tables).

**Acceptance:** Accordion page is driven by `accordion.mdx`, renders prose + live playground + generated
props table, with working anchlinks and unchanged SEO metadata.

### Phase D — Rollout + registry/nav integration

- Generate MDX scaffolds for all components (a small script that stubs `content/docs/<slug>.mdx` with frontmatter + embedded `<PropsTable>`/playground; authors fill prose later).
- Register in the existing surfaces per `CLAUDE.md`: `sidebar-data.ts`, `site-search-entries.ts`, SEO registry as needed.
- This rollout is a good **multi-agent workflow** candidate (same shape as the playground rollout) once Phases A–C are proven on the pilot.

### Phase E — CI / guardrails

- Add `check:props` to the CI gate (`.github/workflows/ci.yml`) alongside the token/registry checks.
- Add `generate:props` to `prepack` so the shipped manifest is always fresh.
- Optional: extend `update:test-health` philosophy — fail if a component lacks a `content/docs/<slug>.mdx`.

---

## 6. Edge cases to handle explicitly

- **Animated entries** (`ui/<name>/animated`) add props (e.g. `transitionVariant`) — extract them as an additional subcomponent so motion props are documented.
- **Generic components** / polymorphic `as` props — docgen may render `unknown`; add a manual override map (`scripts/props-overrides.json`) merged last for the handful that need it.
- **Re-exported types** (`export type { AccordionTransition }`) — ensure union aliases resolve to their literal members in the table.
- **Components missing `types.ts`** (audit flagged `typography`, `dynamic-stepper` incomplete) — generator should warn + skip gracefully, not crash.
- **Huge unions** (44 appearances) — render as a collapsible chip list, and de-dupe against the facade so we show grouped families, not a wall.
- `**ref` props\*\* — usually noise; filter unless JSDoc-documented.

## 7. Risks & tradeoffs

- `**react-docgen-typescript` fidelity on `type` aliases\*\* — mitigate with the manual-override map and a snapshot test of the accordion manifest so regressions are visible in diffs.
- **Build ordering in the monorepo** — `props.json` must be generated before the docs app builds. Put generation on `prepack`/`build` of the package (`^build` already runs packages first in Turbo).
- **New dep surface** (`@next/mdx` + plugins) — contained to the docs app, not the published package.
- **MDX + Next 16** — App Router MDX has moved; budget time to read the in-repo Next docs first.

## 8. Sequencing & rough effort

| Phase                              | Effort              | Risk                  | Ship independently? |
| ---------------------------------- | ------------------- | --------------------- | ------------------- |
| A — extraction + manifest + check  | ~1–1.5 days         | Med (type resolution) | Yes                 |
| B — `<PropsTable>` + pilot section | ~0.5–1 day          | Low                   | Yes (no MDX)        |
| C — MDX pipeline + pilot page      | ~1–1.5 days         | Med (Next 16)         | Needs A+B           |
| D — rollout all components         | ~0.5 day (workflow) | Low                   | Needs A–C           |
| E — CI guardrails                  | ~0.25 day           | Low                   | Anytime after A     |

**Recommended first PR:** Phases A + B on accordion only — delivers a real, drift-proof props table
with zero MDX risk, and validates the extraction approach before committing to the MDX wiring.

## 9. Open questions

1. **MDX vs. keep TS preview pages?** Do we want full MDX authoring now, or just the generated
   `<PropsTable>` dropped into the existing TS section structure (defer MDX)? (A+B answer "table now,
   MDX later".)
2. **Ship the manifest to npm consumers** (export `./props.json`) or keep it docs-internal?
3. `**react-docgen-typescript` dep\*\* acceptable, or prefer the zero-new-dep hand-rolled TS-compiler
   extractor to match `check-design-tokens.mjs`?
4. Manifest location: `cli/props.json` (next to registry) vs `src/generated/props.json`?
