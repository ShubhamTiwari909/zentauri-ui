# Zentauri UI — Project Brief

## Overview

pnpm + Turborepo monorepo shipping a **React UI component library** (`@zentauri-ui/zentauri-components`) with a **Next.js 16 docs site** (`component-library`), a demo app, and a Python backend.

---

## Quick Commands (root)

| Command | Action |
|---|---|
| `pnpm dev` | Turbo: runs `tsup --watch` for library + Next dev server for docs |
| `pnpm build` | Turbo: builds packages first, then apps |
| `pnpm lint` | Turbo: ESLint across apps |
| `pnpm check-types` | Turbo: `tsc --noEmit` across workspaces |
| `pnpm format` | Prettier write across repo |
| `pnpm --filter @zentauri-ui/zentauri-components test` | Vitest run for the library (all tests) |
| `pnpm exec vitest run -t "test name"` | Run single test by name |

---

## Project Structure

```
zentauri-ui/
├── apps/
│   ├── component-library/      # Next.js 16 docs/preview site
│   ├── zentauri-demo-pages/    # Separate Next.js 16 demo app
│   └── zentauri-backend/       # Python FastAPI backend
├── packages/
│   ├── components/             # THE MAIN PACKAGE — React UI kit
│   ├── eslint-config/          # Shared ESLint config (@repo/eslint-config)
│   ├── typescript-config/      # Shared TS config (@repo/typescript-config)
│   └── shared/                 # Shared React components for apps
└── configuration
    ├── pnpm-workspace.yaml     # Workspace: apps/*, packages/*
    ├── turbo.json              # Pipeline: build → lint → check-types
    └── package.json            # pnpm@9, node >=18
```

---

## Library Package (`packages/components`)

**Name:** `@zentauri-ui/zentauri-components` (v1.8.0)  
**Consumed via:** per-entry subpaths (e.g. `@zentauri-ui/zentauri-components/ui/button`, `@zentauri-ui/zentauri-components/hooks/useClipboard`)  
**Entry types:** `ui/*`, `ui/*/animated`, `charts/*`, `hooks/*`, `hooks/utils`  
**Build:** tsup (ESM + CJS) → `dist/`, types via `tsc --noEmit`  
**Key scripts:** `dev` (tsup --watch), `build` (tsup + tsc types), `test` (vitest), `generate:registry` (CLI registry)

### Directory Layout

```
packages/components/src/
├── ui/
│   ├── accordion/              # 40+ components, each with ~7 files
│   ├── buttons/
│   ├── ...                     # (see full list below)
│   └── typography/
├── hooks/                      # 25 hooks (useClipboard, useMediaQuery, etc.)
├── charts/                     # 5 Recharts wrappers (area, bar, bubble, line, pie)
├── design-system/              # 41 token files (CSS variable strings)
│   ├── button.ts               # zuiButtonBase, zuiButtonAppearances, zuiButtonSizes
│   ├── tokens.ts               # Shared tokens (focus ring, radius, etc.)
│   └── index.ts                # Barrel export of all token files
└── lib/
    └── utils.ts                # cn(), clampPage(), range()
```

### Component Layers (per-component, read bottom-up)

Each component folder follows a fixed 5-layer architecture:

1. **`src/design-system/<name>.ts`** — Pure string constants only. Each themeable value is a CSS variable with hardcoded fallback + paired `dark:` class in the same string. Format: `text-[color:var(--zui-x-fg,#000)] dark:text-[color:var(--zui-x-fg-dark,#fff)]`. The `--zui-*` token contract is the library's main differentiator — treat as public API.

2. **`src/ui/<name>/variants.ts`** — Imports from design-system, wires tokens into `cva()` variant maps. No raw Tailwind here.

3. **`src/ui/<name>/types.ts`** — Props interface (usually `VariantProps<typeof …Variants>` + component-specific fields).

4. **`src/ui/<name>/<name>-base.tsx`** — Real implementation. Compound components use React context + `data-slot` attributes.

5. **`src/ui/<name>/<name>.tsx`** — Static entry: re-exports base with **no framer-motion**.

6. **`src/ui/<name>/animated/`** (optional) — Separate motion entry. Contains `animations.ts` (transition presets/types) + `<name>-animated.tsx`. framer-motion is optional peer dep, must never leak into static entry.

7. **`src/ui/<name>/index.ts`** — Starts with `"use client"`, re-exports component + types + variants.

### All UI Components (41)

| Component | Has Animated? | Has Test? |
|---|---|---|
| accordion, alert, avatar, badge, buttons, card, checkbox, command, divider, drawer, empty-state, inputs, modal, popover, progress, radio-group, skeleton, table, tabs, timeline, toast, toggle, tooltip, tree-view | Yes | Yes (most) |
| animated-number, breadcrumb, context-menu, dropdown, dynamic-stepper, file-upload, marquee, otp-input, pagination, rating, scroll-area, search, select, slider, stepper, typography | No | Yes |
| spinner | Yes (animated only) | Yes |

### Hooks (25)

```useBodyScrollLock, useClickOutside, useClipboard, useControllableState, useDebouncedValue, useDisclosure, useDocumentTitle, useDynamicStepper, useFocusManagement, useHover, useInView, useIntersectionObserver, useIsomorphicLayoutEffect, useIsMounted, useLocalStorage, useMediaQuery, useNetworkStatus, usePageVisibility, usePagination, usePrefersColorScheme, usePrefersReducedMotion, useResizeObserver, useSessionStorage, useThrottledCallback, useToggle, useWindowSize```

### Charts (5)

AreaChart, BarChart, BubbleChart, LineChart, PieChart — thin Recharts wrappers with `appearance` (default, muted, outline, glass) and `density` (compact, comfortable, spacious) variants.

### Peer Dependencies (installer must provide)

| Required | Optional |
|---|---|
| `react >18`, `react-dom >18`, `class-variance-authority`, `clsx`, `tailwind-merge` | `framer-motion`, `react-icons`, `recharts` |

### Tailwind v4 Requirement (consumer)

Consumers must add `@source "…/node_modules/@zentauri-ui/zentauri-components"` to their CSS so Tailwind v4 scans the library's utility classes.

---

## How to Add a New Component

You must touch **all** of these:

1. `packages/components/src/ui/<name>/` — Full component folder (design-system → variants → types → base → entry → index + test)
2. `packages/components/src/design-system/<name>.ts` — Token file + add to `design-system/index.ts`
3. `packages/components/tsup.config.ts` — Add name to `uiComponentNames` (and `uiAnimatedComponentNames` if has animated entry)
4. **Docs app** (if surfacing in docs):
   - `apps/component-library/app/preview/components/<slug>/page.tsx` — Route page
   - `apps/component-library/content/seo/preview/components/<slug>.json` — SEO document + register in `preview-seo-registry.ts`
   - `apps/component-library/components/sidebar/sidebar-data.ts` — Nav entry
   - `apps/component-library/lib/site-search-entries.ts` — Search index
5. `packages/components/README.md` — Coverage table (maintained by hand, not auto-generated)
6. `apps/component-library/components/home/marketing/home-package-health.tsx` — Hardcoded test totals

---

## CLI (`zentauri-ui add` / `zentauri-components add`)

- Vendors component/hook **source** into consumer app
- Driven by `cli/registry.json` (**auto-generated** from `tsup.config.ts`, never hand-edit)
- After changing `tsup.config.ts`, run `pnpm --filter @zentauri-ui/zentauri-components exec node scripts/generate-registry.mjs` to regenerate
- `nameAliases` map: `button`→`buttons`, `input`→`inputs`, `chart-*`→`charts/*`

---

## Docs App (`apps/component-library`)

- **Next.js 16** (App Router, canary features — check `node_modules/next/dist/docs/` for breaking changes)
- Component preview pages live at `app/preview/components/<slug>/page.tsx`
- Each preview page assembles from `components/preview/<name>/` which contains:
  - `sections/*.tsx` — Page sections (hero, code examples, props table, etc.)
  - `components/<name>-code-examples.{data,snippets}.ts` + `*-demo.tsx` — Code examples
- SEO is data-driven: JSON in `content/seo/preview/**` → `previewSeoDocumentToMetadata()`
- Sidebar data in `components/sidebar/sidebar-data.ts`
- In-site search in `lib/site-search-entries.ts`

---

## Key Architectural Rules

1. **Design tokens are CSS variables with paired dark: classes** — every token string includes both. This is the core differentiator.
2. **No raw Tailwind in variants.ts** — imports from design-system token files only.
3. **framer-motion is optional** — never import motion stuff in static entries (`<name>.tsx`); only in `animated/` folder.
4. **"use client" is prepended by post-build script** (`scripts/prepend-use-client.mjs`), not written in source (tsup's treeshake can reorder it).
5. **Registry is generated** (`scripts/generate-registry.mjs`), never hand-edited.
6. **package.json `exports` use wildcards** (`./ui/*`), so no per-component export edit needed when adding components.
7. **Tests live only in `packages/components`** (Vitest + Testing Library, jsdom). Docs app has a few tests but no `test` script.

---

## Test Suite (packages/components)

- **68 test files, 496 total tests**
  - UI components: 44 files, 390 tests
  - Hooks: 27 files, 97 tests
  - CLI: 2 files, 9 tests
- Run: `pnpm --filter @zentauri-ui/zentauri-components test`
- Single file: `pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/accordion/accordion.test.tsx`
- Single test: add `-t "renders"`

---

## Common Gotchas

- **Next.js 16** has breaking changes from older versions — read `node_modules/next/dist/docs/` before writing Next code
- Test-count surfaces in docs (`home-package-health.tsx`) and README coverage table are **hand-maintained** — update them when tests change
- The `viewport` prop on motion components types `margin` as `string`, while `useInView` expects `MarginType` (template literal union) — use `as UseInViewOptions` when merging
- **Spinner** has no static entry; it's animated-only
