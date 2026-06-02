# Zentauri UI

[![npm version](https://img.shields.io/npm/v/@zentauri-ui/zentauri-components)](https://www.npmjs.com/package/@zentauri-ui/zentauri-components)
[![npm downloads](https://img.shields.io/npm/dm/@zentauri-ui/zentauri-components)](https://www.npmjs.com/package/@zentauri-ui/zentauri-components)

Zentauri UI is a **pnpm + Turborepo** monorepo for a **React component library** and its **Next.js documentation / preview site**. The publishable UI kit lives in `packages/components` as **`@zentauri-ui/zentauri-components`**. The interactive catalog (demos, props guidance, code snippets) lives in **`apps/component-library`**.

Public site: [zentauri-ui.vercel.app](https://zentauri-ui.vercel.app/)

---

## What is in this repository?

| Location                     | Package name                       | Role                                                                                        |
| ---------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------- |
| `apps/component-library`     | `component-library`                | Next.js 16 app (App Router): marketing home, `/preview` docs, SEO helpers, Vercel Analytics |
| `apps/zentauri-demo-pages`   | `zentauri-demo-pages`              | Next.js 16 demo gallery for reusable landing-page layouts and theme previews                |
| `apps/zentauri-backend`      | `zentauri-backend`                 | FastAPI service for contact-form submissions backed by MongoDB                              |
| `packages/components`        | `@zentauri-ui/zentauri-components` | Source of UI primitives and hooks; built with **tsup** into `dist/` (ESM/CJS + types)       |
| `packages/shared`            | `@zentauri-ui/shared`              | Shared React chrome and utilities consumed by the apps                                      |
| `packages/eslint-config`     | `@repo/eslint-config`              | Shared ESLint presets (`base`, `next-js`, `react-internal`)                                 |
| `packages/typescript-config` | `@repo/typescript-config`          | Shared `tsconfig` fragments for apps and packages                                           |

Shared tooling: **TypeScript**, **Prettier**, **Turborepo**, **ESLint** (in the app that runs `lint`). The component package uses **Vitest** and Testing Library for unit tests.

---

## Package status and test coverage

| Metric     | Result           |
| ---------- | ---------------- |
| Test files | 75 passed (75)   |
| Tests      | 507 passed (507) |

| Area                        | Test files | Tests |
| --------------------------- | ---------- | ----- |
| Components and UI utilities | 45         | 397   |
| React hooks                 | 28         | 101   |
| CLI and import rewriting    | 2          | 9     |

### Per-suite snapshot

| Suite                                                                   | Tests |
| ----------------------------------------------------------------------- | ----: |
| `src/ui/dynamic-stepper/dynamic-stepper.test.tsx`                       |     8 |
| `src/ui/select/select.test.tsx`                                         |     6 |
| `src/charts/charts.test.tsx`                                            |     6 |
| `src/ui/modal/modal.test.tsx`                                           |     9 |
| `src/ui/drawer/drawer.test.tsx`                                         |     7 |
| `cli/cli.integration.test.ts`                                           |     4 |
| `src/ui/buttons/button.test.tsx`                                        |    41 |
| `src/ui/inputs/input.test.tsx`                                          |    40 |
| `src/ui/marquee/marquee.test.tsx`                                       |    10 |
| `src/ui/otp-input/otp-input.test.tsx`                                   |    10 |
| `src/ui/tree-view/tree-view.test.tsx`                                   |    10 |
| `src/ui/card/card.test.tsx`                                             |     7 |
| `src/ui/checkbox/checkbox.test.tsx`                                     |     6 |
| `src/ui/popover/popover.test.tsx`                                       |     4 |
| `src/ui/command/command.test.tsx`                                       |     7 |
| `src/ui/context-menu/context-menu.test.tsx`                             |     8 |
| `src/ui/copy-button/copy-button.test.tsx`                               |     8 |
| `src/ui/kbd/kbd.test.tsx`                                               |     7 |
| `src/ui/tooltip/tooltip.test.tsx`                                       |     4 |
| `src/ui/dropdown/dropdown.test.tsx`                                     |     6 |
| `src/hooks/useFocusManagement/useFocusManagement.test.tsx`              |     3 |
| `src/ui/progress/progress.test.tsx`                                     |     8 |
| `src/ui/rating/rating.test.tsx`                                         |    11 |
| `src/ui/radio-group/radio-group.test.tsx`                               |     5 |
| `src/ui/scroll-area/scroll-area.test.tsx`                               |     8 |
| `src/ui/accordion/accordion.test.tsx`                                   |     7 |
| `src/ui/toast/toast.test.tsx`                                           |     5 |
| `src/ui/pagination/pagination.test.tsx`                                 |    15 |
| `src/ui/table/table.test.tsx`                                           |    11 |
| `src/ui/tabs/tabs.test.tsx`                                             |     3 |
| `src/ui/stepper/stepper.test.tsx`                                       |    12 |
| `src/ui/timeline/timeline.test.tsx`                                     |    14 |
| `src/ui/animated-number/animated-number.test.tsx`                       |     9 |
| `src/ui/toggle/toggle.test.tsx`                                         |     5 |
| `src/ui/slider/slider.test.tsx`                                         |     9 |
| `src/ui/typography/typography.test.tsx`                                 |     7 |
| `src/ui/skeleton/skeleton.test.tsx`                                     |     8 |
| `src/ui/divider/divider.test.tsx`                                       |     6 |
| `src/ui/empty-state/empty-state.test.tsx`                               |     6 |
| `src/ui/alert/alert.test.tsx`                                           |    11 |
| `src/ui/badge/badge.test.tsx`                                           |     6 |
| `src/hooks/useClipboard/useClipboard.test.ts`                           |     6 |
| `src/hooks/useLocalStorage/useLocalStorage.test.ts`                     |     6 |
| `src/hooks/useDisclosure/useDisclosure.test.ts`                         |     5 |
| `src/ui/avatar/avatar.test.tsx`                                         |     4 |
| `src/ui/file-upload/file-upload.test.tsx`                               |     4 |
| `src/ui/spinner/animated/spinner.test.tsx`                              |     8 |
| `src/hooks/useDynamicStepper/useDynamicStepper.test.ts`                 |     7 |
| `src/hooks/useClickOutside/useClickOutside.test.tsx`                    |     3 |
| `src/hooks/useControllableState/useControllableState.test.ts`           |     4 |
| `src/ui/breadcrumb/breadcrumb.test.tsx`                                 |     4 |
| `src/hooks/useThrottledCallback/useThrottledCallback.test.ts`           |     4 |
| `src/hooks/useToggle/useToggle.test.ts`                                 |     4 |
| `src/hooks/usePagination/usePagination.test.ts`                         |    10 |
| `src/hooks/useTableFilter/useTableFilter.test.ts`                       |     9 |
| `src/hooks/useTableSort/useTableSort.test.ts`                           |     7 |
| `src/hooks/useSessionStorage/useSessionStorage.test.ts`                 |     3 |
| `src/hooks/usePrefersColorScheme/usePrefersColorScheme.test.ts`         |     1 |
| `src/hooks/useIsMounted/useIsMounted.test.ts`                           |     3 |
| `src/hooks/useDebouncedValue/useDebouncedValue.test.ts`                 |     4 |
| `src/hooks/useHover/useHover.test.ts`                                   |     2 |
| `src/hooks/useIntersectionObserver/useIntersectionObserver.test.ts`     |     2 |
| `src/hooks/usePageVisibility/usePageVisibility.test.ts`                 |     1 |
| `src/hooks/useResizeObserver/useResizeObserver.test.ts`                 |     2 |
| `src/hooks/useNetworkStatus/useNetworkStatus.test.ts`                   |     2 |
| `src/hooks/useMediaQuery/useMediaQuery.test.ts`                         |     2 |
| `src/hooks/useDocumentTitle/useDocumentTitle.test.ts`                   |     3 |
| `src/hooks/usePrefersReducedMotion/usePrefersReducedMotion.test.ts`     |     1 |
| `src/hooks/useBodyScrollLock/useBodyScrollLock.test.ts`                 |     4 |
| `src/hooks/useWindowSize/useWindowSize.test.ts`                         |     1 |
| `src/hooks/useInView/useInView.test.ts`                                 |     1 |
| `src/hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.test.ts` |     1 |
| `cli/rewrite-imports.test.ts`                                           |     5 |
| `src/ui/search/filter-search-suggestions.test.ts`                       |     6 |
| `src/ui/search/search-suggestion-utils.test.ts`                         |     1 |

---

## Prerequisites

1. **Node.js** — **v18 or newer** (see root `package.json` → `engines.node`). A current LTS (20+) is a sensible default.
2. **pnpm** — The repo pins **`pnpm@9.0.0`** via the root `packageManager` field. Use that version so installs and lockfile behavior match CI and other contributors.

### Installing pnpm 9 with Corepack (recommended)

[Corepack](https://nodejs.org/api/corepack.html) ships with Node and can install the pinned pnpm version:

```sh
corepack enable
corepack prepare pnpm@9.0.0 --activate
pnpm -v   # should report 9.0.0
```

If you already use another pnpm major, switch only for this repo (for example with [Volta](https://volta.sh/) or `fnm`/`nvm`) or rely on Corepack as above.

---

## First-time setup (new developer)

Follow these steps **from the repository root** (`zentauri-ui/`).

### 1. Clone the repository

```sh
git clone <repository-url>
cd zentauri-ui
```

Use the URL your team uses (for example the [GitHub source](https://github.com/ShubhamTiwari909/zentauri-ui)).

### 2. Use the correct Node and pnpm versions

- Ensure Node **≥ 18**.
- Enable Corepack and activate **pnpm 9.0.0** (see [Prerequisites](#prerequisites)).

### 3. Install dependencies

Workspaces are declared in `pnpm-workspace.yaml` (`apps/*`, `packages/*`). Installing once at the root links every package:

```sh
pnpm install
```

This links `component-library` to `@zentauri-ui/zentauri-components` via `workspace:*` and installs all transitive dependencies.

### 4. (Optional) Environment variables for the Next.js app

The docs app does **not** require a `.env` file for local work. For accurate canonical URLs and Open Graph metadata in production-like setups, you can set:

| Variable               | Required locally?   | Purpose                                                                                                                                                               |
| ---------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No                  | Public origin with scheme (e.g. `https://zentauri-ui.vercel.app`). Used as `metadataBase` and for canonical / OG URLs in `apps/component-library/lib/preview-seo.ts`. |
| `VERCEL_URL`           | Automatic on Vercel | Fallback hostname when `NEXT_PUBLIC_SITE_URL` is unset.                                                                                                               |

If neither is set, metadata falls back to **`http://localhost:3000`**.

Create `apps/component-library/.env.local` only if you want to override defaults:

```sh
# apps/component-library/.env.local (example)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Verify the workspace

**Typecheck** (runs in workspaces that define `check-types`; currently the component-library app):

```sh
pnpm check-types
```

**Production build** (builds dependencies first per `turbo.json` → `dependsOn: ["^build"]`):

```sh
pnpm build
```

**Lint** (runs where a `lint` script exists):

```sh
pnpm lint
```

If these succeed, your environment matches what the repo expects.

---

## Daily development

All commands below assume the **repository root** unless noted.

### Run everything that defines `dev`

```sh
pnpm dev
```

This runs **`turbo run dev`**, which starts:

- **`@zentauri-ui/zentauri-components`** — `tsup --watch` (rebuilds `dist/` when sources change).
- **`component-library`** — `next dev` (default [http://localhost:3000](http://localhost:3000)).

Use this when you change **both** library sources and the preview app.

### Run only the documentation site

Faster when you are not editing `packages/components`:

```sh
pnpm exec turbo run dev --filter=component-library
```

### Run only the component package in watch mode

When iterating on primitives without the Next.js server:

```sh
pnpm exec turbo run dev --filter=@zentauri-ui/zentauri-components
```

### Global `turbo` (optional)

You can install [turbo](https://turborepo.dev/docs/getting-started/installation) globally and run `turbo dev` / `turbo build --filter=...` instead of `pnpm exec turbo …`.

---

## Root scripts (cheat sheet)

| Command            | What it does                                                                  |
| ------------------ | ----------------------------------------------------------------------------- |
| `pnpm install`     | Install and link all workspaces                                               |
| `pnpm dev`         | `turbo run dev` — persistent dev tasks (Next + tsup watch)                    |
| `pnpm build`       | `turbo run build` — builds packages and apps; caches via Turbo                |
| `pnpm lint`        | `turbo run lint` — ESLint where defined                                       |
| `pnpm check-types` | `turbo run check-types` — `tsc --noEmit` where defined                        |
| `pnpm format`      | Prettier write on `**/*.{ts,tsx,md}` from the root (not routed through Turbo) |

### Scoped commands with pnpm filters

Run a script in one workspace without `turbo`:

```sh
pnpm --filter component-library dev
pnpm --filter @zentauri-ui/zentauri-components build
```

### Component package tests

The **`test`** script is defined on `@zentauri-ui/zentauri-components`, not in the root `turbo.json`. Run:

```sh
pnpm --filter @zentauri-ui/zentauri-components test
pnpm --filter @zentauri-ui/zentauri-components test:watch
```

---

## Where to change what

- **New or updated UI primitives** (Button, Select, etc.): `packages/components/src/` then ensure `pnpm build` or watch dev passes. Consumption and Tailwind `@source` notes: [`packages/components/README.md`](packages/components/README.md).
- **Docs, previews, routes, marketing copy, SEO JSON**: `apps/component-library/` — see [`apps/component-library/README.md`](apps/component-library/README.md) for route map, `content/seo/preview/components`, and script tables.
- **Lint / TypeScript presets**: `packages/eslint-config`, `packages/typescript-config`.

The Next app sets `transpilePackages: ["@zentauri-ui/zentauri-components"]` so the workspace library is compiled as part of the app build.

---

## Monorepo mechanics (short)

- **pnpm** resolves `workspace:*` to local packages; always install from the **root** so links stay consistent.
- **Turborepo** (`turbo.json`) orchestrates `build`, `dev`, `lint`, and `check-types`. Builds depend on **`^build`** (dependencies build first). Outputs include `.next/**` and `dist/**` for caching.

### Optional: Remote cache (team / CI)

Turborepo can use [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) (e.g. Vercel). This is optional for local work:

```sh
pnpm exec turbo login
pnpm exec turbo link
```

---

## Troubleshooting

| Symptom                            | Things to try                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| Wrong pnpm / lockfile errors       | `corepack prepare pnpm@9.0.0 --activate`; delete `node_modules` and run `pnpm install` from root. |
| App shows stale components         | Run `pnpm build` for the library or use `pnpm dev` so `tsup --watch` updates `dist/`.             |
| Types or imports fail after a pull | `pnpm install` then `pnpm check-types` and `pnpm build`.                                          |
| Port 3000 in use                   | `pnpm --filter component-library dev -- -p 3001` (forwards `-p` to `next dev`).                   |

---

## AI Tools used

- Cursor (Composer 2.0 and 2.5)
- Chatgpt Codex (GPT 5.5)
- Claude code (Opus 4.7 and 4.8)
- Gemini AI code assist (code review)
- Chatgpt codex connector (code review)
- Cubic AI (code review)

---

## Further reading

- [Turborepo — Running tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Turborepo — Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [pnpm — Workspace](https://pnpm.io/workspaces)
- Component library consumer guide: [`packages/components/README.md`](packages/components/README.md)
- Component library app (routes, env, scripts): [`apps/component-library/README.md`](apps/component-library/README.md)
