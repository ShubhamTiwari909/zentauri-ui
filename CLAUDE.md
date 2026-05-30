# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

pnpm + Turborepo monorepo. Two things matter most:

- `packages/components` (`@zentauri-ui/zentauri-components`) — the publishable React UI kit. Built with **tsup** into `dist/` (ESM + CJS + types). This is where primitives, hooks, charts, design tokens, and the vendoring CLI live.
- `apps/component-library` (`component-library`) — the Next.js 16 docs/preview site that demos every component. Consumes the library via `workspace:*`.

Also present: `apps/zentauri-demo-pages` (separate Next app), `apps/zentauri-backend`, and the shared config packages `packages/eslint-config` (`@repo/eslint-config`) + `packages/typescript-config` (`@repo/typescript-config`).

## Commands

Run from the repo root unless noted. Use **pnpm 9** (`corepack prepare pnpm@9.0.0 --activate`).

| Command | What it does |
| --- | --- |
| `pnpm dev` | `turbo run dev` — Next dev server **and** `tsup --watch` for the library |
| `pnpm build` | `turbo run build` — builds packages first (`^build`), then apps |
| `pnpm lint` | `turbo run lint` (ESLint runs in the apps that define it) |
| `pnpm check-types` | `turbo run check-types` (`tsc --noEmit`) |
| `pnpm format` | Prettier write across the repo (not routed through Turbo) |

Scope to one workspace when iterating: `pnpm exec turbo run dev --filter=component-library` or `--filter=@zentauri-ui/zentauri-components`.

### Tests

Tests live **only in `packages/components`** (Vitest + Testing Library, jsdom). There is no root `test` task.

```sh
pnpm --filter @zentauri-ui/zentauri-components test          # vitest run (all)
pnpm --filter @zentauri-ui/zentauri-components test:watch
# single file / single test:
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/accordion/accordion.test.tsx
pnpm --filter @zentauri-ui/zentauri-components exec vitest run -t "renders"
```

The docs app has a `vitest.config.ts` and a few tests (e.g. `components/sidebar/*.test.tsx`) but **no `test` script** — run them with `pnpm --filter component-library exec vitest run`.

### Library build internals

`pnpm --filter @zentauri-ui/zentauri-components build` = `build:js` (tsup) + `build:types` (`tsc -p tsconfig.emit-types.json`). Two post-build steps you must know about:

- `scripts/prepend-use-client.mjs` runs in tsup's `onSuccess` to force `"use client"` to the top of each UI entry (treeshake can reorder the banner).
- `scripts/generate-registry.mjs` regenerates `cli/registry.json` from `tsup.config.ts` (runs on `prepack`, or `npm run generate:registry`). **The registry is generated, never hand-edited.**

## Architecture: the component package

Each UI component in `src/ui/<name>/` follows a fixed layering. Read it bottom-up:

1. **`src/design-system/<name>.ts`** — pure string constants only (`zui<Name>Base`, `zui<Name>Appearances`, `zui<Name>Sizes`, …). Every themeable value is a CSS variable with a hardcoded fallback and a paired `dark:` class **in the same string**, e.g. `text-[color:var(--zui-x-fg,#000)] dark:text-[color:var(--zui-x-fg-dark,#fff)]`. This `--zui-*` token contract is the library's main differentiator — treat it as a public API. House style is ~15+ color "appearance" palettes plus `gradient-*` and `glass` variants.
2. **`variants.ts`** — wires those token strings into `cva()` variant maps. No raw Tailwind here; it imports from the design-system file.
3. **`types.ts`** — props, usually `VariantProps<typeof …Variants>` plus component-specific fields.
4. **`<name>-base.tsx`** — the real implementation. Compound components (Accordion, Tabs, Modal, Drawer) use a React context + `data-slot` attributes and sub-component exports.
5. **`<name>.tsx`** — the **static** entry: re-exports the base with **no framer-motion**.
6. **`animated/`** (optional) — a **separate** entry (`animations.ts` for transition presets/types, plus `<name>-animated.tsx`). Framer Motion is an optional peer dep, so motion must never leak into the static entry.
7. **`index.ts`** — starts with `"use client"`, re-exports component + types + variants.

**Adding/removing a UI component touches these files together** (easy to miss one):

- `src/ui/<name>/…` (the folder above, including a `.test.tsx`)
- `src/design-system/<name>.ts` **and** add `export * from "./<name>"` to `src/design-system/index.ts`
- `tsup.config.ts`: add the name to `uiComponentNames` (and `uiAnimatedComponentNames` if it has an `animated/` entry). This single list drives both the build entries and the generated CLI registry.
- `package.json` `exports` use wildcards (`./ui/*`, `./ui/*/animated`), so no per-component export edit is needed.

Imports are per-entry subpaths: `…/ui/<name>`, `…/ui/<name>/animated`, `…/charts/<type>`, `…/hooks/<entry>`. Charts (`src/charts/*`) are thin Recharts wrappers. Hooks live one-per-folder in `src/hooks/`.

### The CLI

`zentauri-ui add <name>` (alias `zentauri-components add <name>`) vendors component/hook **source** into a consumer app, driven by `cli/registry.json`. `nameAliases` maps friendly names (`button`→`buttons`, `input`→`inputs`, `chart-*`→`charts/*`).

### Consumer Tailwind gotcha

The package ships utility classes (not compiled CSS). Consumers must add `@source "…/node_modules/@zentauri-ui/zentauri-components";` so Tailwind v4 scans it — and because light + `dark:` classes are paired in the same strings, both need to be in scan scope.

## Architecture: the docs app

Next.js **16** / App Router. Component preview pages assemble from `components/preview/<name>/`:

- `sections/*.tsx` — page sections (hero, code examples, props, etc.).
- `components/<name>-code-examples.{data,snippets}.ts` + `-demo.tsx` — data, code strings, and live demo for `PreviewCodeShowcase` (the "Show output / Show code" toggle). Code-example section labels use `<p>` tags above each showcase row (see `components/preview/accordion/sections/accordion-code-examples-section.tsx`).
- Shared building blocks: `components/common/Section`, `components/code-showcase/`, `components/CodeHighlight.tsx`.

**Surfacing a new component in the docs app** means registering it in several places:

- `app/preview/components/<slug>/page.tsx` — route; imports the preview page and `getPreviewSeo(slug)`.
- `content/seo/preview/components/<slug>.json` — SEO document, **and** import + register it in `lib/preview-seo-registry.ts`.
- `components/sidebar/sidebar-data.ts` — navigation entry.
- `lib/site-search-entries.ts` — in-site search index.
- `lib/home-install-commands.ts` — if it should appear in homepage install lists.

SEO is data-driven: JSON in `content/seo/preview/**` → `previewSeoDocumentToMetadata()` in `lib/preview-seo.ts`. `metadataBase`/canonical come from `NEXT_PUBLIC_SITE_URL` (falls back to `http://localhost:3000`).

### Test-count surfaces are maintained by hand

When you add/remove tests, update both the coverage table in `packages/components/README.md` (incl. the per-suite snapshot) and the hardcoded totals in `apps/component-library/components/home/marketing/home-package-health.tsx`. These are not auto-generated.

## Next.js 16 caveat

`apps/zentauri-demo-pages/AGENTS.md` warns: this Next.js has breaking changes from older versions — **read the relevant guide in `node_modules/next/dist/docs/` before writing Next code**, and heed deprecation notices. Applies to both Next apps.
