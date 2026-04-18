# @zentauri-ui/zentauri-components

A React UI kit for building product interfaces with Tailwind CSS. Components are implemented in TypeScript, ship with declaration files, and are bundled as ESM and CommonJS for broad bundler compatibility.

## Overview

The library targets **React 18+** apps that use **Tailwind CSS v4** (or an equivalent setup where Tailwind can scan this package via `@source`). Styling uses utility classes; **class-variance-authority** powers variant APIs (size, appearance, and similar props), with **clsx** and **tailwind-merge** for predictable `className` composition. **Framer Motion** backs motion where components animate, and **react-icons** is used for iconography where applicable.

Published artifacts live under `dist/`. Imports use **per-entry subpaths**: `@zentauri-ui/zentauri-components/ui/<area>` for components and `@zentauri-ui/zentauri-components/hooks/<entry>` for React hooks (and shared helpers under `hooks/utils`). Each entry resolves to its own ESM (`.mjs`), CJS (`.js`), and types (`.d.ts`) so bundlers pull only what you import. Most apps rely on Tailwind scanning the package sources (see installation); a separate CSS import is not required for that setup.

## Package exports

| Subpath                                         | Description                                                                                                                                 |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `@zentauri-ui/zentauri-components/ui/<name>`   | Single UI area: components (and any re-exports from that area’s `index`, e.g. `usePagination` from `ui/pagination`).                         |
| `@zentauri-ui/zentauri-components/hooks/<entry>` | One hook module or `utils` (`cn`, `clampPage`, `range` from `src/lib/utils.ts`). Entries match files under `src/hooks/` (see **React hooks**). |

The UI `<name>` segment matches the folder under `src/ui/` (for example `accordion`, `select`, `empty-state`, `buttons` for `Button`, `inputs` for `Input`). The hooks `<entry>` is the file stem (for example `useMediaQuery`, `usePagination`) or `utils`.

## Requirements

- **React** and **React DOM** `>= 18` (peer dependencies)
- A Tailwind pipeline that can **scan** this package (see Step 3 below)

## Components

Each area is available from its own subpath (`…/ui/<subpath>`):

| Area           | Subpath `…/ui/…` |
| -------------- | ---------------- |
| Accordion      | `accordion`      |
| Alert          | `alert`          |
| Avatar         | `avatar`         |
| Badge          | `badge`          |
| Breadcrumb     | `breadcrumb`     |
| Button         | `buttons`        |
| Card           | `card`           |
| Divider        | `divider`        |
| Drawer         | `drawer`         |
| Dropdown       | `dropdown`       |
| Empty state    | `empty-state`    |
| File upload    | `file-upload`    |
| Input          | `inputs`         |
| Modal          | `modal`          |
| Pagination     | `pagination`     |
| Progress       | `progress`       |
| Select         | `select`         |
| Skeleton       | `skeleton`       |
| Slider         | `slider`         |
| Spinner        | `spinner`        |
| Stepper        | `stepper`        |
| Table          | `table`          |
| Tabs           | `tabs`           |
| Toast          | `toast`          |
| Toggle         | `toggle`         |
| Tooltip        | `tooltip`        |

## React hooks

Hooks live in `src/hooks/`. Each hook is a separate published entry under `@zentauri-ui/zentauri-components/hooks/<name>` (same pattern as UI areas). Types are exported where the implementation defines them (for example `UseDisclosureResult`, `PaginationPageItem`). For class-name merging and pagination helpers used alongside hooks, import from `@zentauri-ui/zentauri-components/hooks/utils`.

| Hook / module              | Subpath `…/hooks/…`           | Notes (selected exports) |
| -------------------------- | ----------------------------- | -------------------------- |
| `useBodyScrollLock`        | `useBodyScrollLock`           | Locks document scroll while open |
| `useClickOutside`          | `useClickOutside`             | `ClickOutsideEventType`, `UseClickOutsideParams` |
| `useClipboard`             | `useClipboard`                | `UseClipboardResult` |
| `useControllableState`     | `useControllableState`        | `UseControllableStateParams` |
| `useDebouncedValue`        | `useDebouncedValue`           | Debounced state from a value |
| `useDisclosure`            | `useDisclosure`               | `UseDisclosureParams`, `UseDisclosureResult` |
| `useDocumentTitle`         | `useDocumentTitle`            | `UseDocumentTitleParams` |
| `useFocusManagement`       | `useFocusManagement`          | Focus trap / focus moves for overlays |
| `useHover`                 | `useHover`                    | Pointer hover state |
| `useInView`                | `useInView`                   | `UseInViewParams` |
| `useIntersectionObserver`  | `useIntersectionObserver`     | `UseIntersectionObserverParams` |
| `useIsomorphicLayoutEffect`| `useIsomorphicLayoutEffect`   | `useLayoutEffect` safe for SSR |
| `useIsMounted`             | `useIsMounted`                | Ref / flag after mount |
| `useLocalStorage`          | `useLocalStorage`             | `UseLocalStorageResult` |
| `useMediaQuery`            | `useMediaQuery`               | Match CSS media queries |
| `useNetworkStatus`         | `useNetworkStatus`            | Online / offline |
| `usePageVisibility`        | `usePageVisibility`           | Document visibility API |
| `usePagination`            | `usePagination`               | `buildPaginationItems`, `BuildPaginationItemsParams`, `PaginationPageItem` |
| `usePrefersColorScheme`    | `usePrefersColorScheme`       | `ColorSchemePreference` |
| `usePrefersReducedMotion`  | `usePrefersReducedMotion`     | `prefers-reduced-motion` |
| `useResizeObserver`        | `useResizeObserver`           | `ElementSize` |
| `useSessionStorage`        | `useSessionStorage`           | `UseSessionStorageResult` |
| `useThrottledCallback`     | `useThrottledCallback`        | Throttled callback ref |
| `useToggle`                | `useToggle`                   | Boolean toggle state |
| `useWindowSize`            | `useWindowSize`               | `WindowSize` |
| `cn`, `clampPage`, `range` | `utils`                       | Shared helpers from `src/lib/utils.ts` |

#### Hook import example

```tsx
import { useDisclosure } from "@zentauri-ui/zentauri-components/hooks/useDisclosure";
import { useMediaQuery } from "@zentauri-ui/zentauri-components/hooks/useMediaQuery";
import {
  buildPaginationItems,
  usePagination,
} from "@zentauri-ui/zentauri-components/hooks/usePagination";
import { cn } from "@zentauri-ui/zentauri-components/hooks/utils";
```

Some UI packages re-export the hook that belongs to that component (for example `usePagination` from `@zentauri-ui/zentauri-components/ui/pagination`). Prefer `hooks/<name>` when you only need the hook without the UI primitives.

## Installation

**Getting started** — Add the package, install peer dependencies so primitives resolve correctly, point Tailwind at the library sources, then import from `ui/<name>` and/or `hooks/<entry>` subpaths.

### Step 1 — Install the package

Choose your package manager.

```bash
npm install @zentauri-ui/zentauri-components
```

```bash
pnpm install @zentauri-ui/zentauri-components
```

```bash
yarn add @zentauri-ui/zentauri-components
```

### Step 2 — Install peer dependencies

The library expects `react`, `react-dom`, `class-variance-authority`, `clsx`, and `tailwind-merge` in your app. Install them alongside the components package.

```bash
npm install react react-dom class-variance-authority clsx tailwind-merge
```

```bash
pnpm add react react-dom class-variance-authority clsx tailwind-merge
```

```bash
yarn add react react-dom class-variance-authority clsx tailwind-merge
```

#### Optional: animations and icons

Add `framer-motion` when using motion-based UI, and `react-icons` when using icon sets from that package.

```bash
npm install framer-motion react-icons
```

```bash
pnpm add framer-motion react-icons
```

```bash
yarn add framer-motion react-icons
```

Published `dist/` files **import** these packages; they are **not** vendored inside `@zentauri-ui/zentauri-components`. Your app installs them via `dependencies` (or optional peers above), and your bundler resolves them from `node_modules`.

### Next.js: smaller route chunks

In **Next.js 13+**, enable [optimizePackageImports](https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports) so `framer-motion` and `react-icons` are resolved in a more tree-shakeable way:

```ts
// next.config.ts (example — API may be stable in your Next version)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
};

export default nextConfig;
```

### Step 3 — Include library paths in globals.css

Add an `@source` entry so Tailwind scans class names inside `@zentauri-ui/zentauri-components`. The path is relative to this CSS file—adjust `../` if your file lives elsewhere.

```css
@import "tailwindcss";
@source "../node_modules/@zentauri-ui/zentauri-components";
```

### Step 4 — Import and use components and hooks

Use **one subpath per UI area** and **one subpath per hook module** so the bundler resolves only the entries you use.

#### Imports (single UI area)

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
```

#### Imports (multiple UI areas)

```tsx
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@zentauri-ui/zentauri-components/ui/select";
```

#### Imports (hooks alongside UI)

```tsx
import { useDisclosure } from "@zentauri-ui/zentauri-components/hooks/useDisclosure";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
```

#### Usage

```tsx
<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
  <Accordion
    type="single"
    defaultValue="item-1"
    appearance="separated"
    size="md"
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Shipping</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-slate-300">
          Standard delivery in 3-5 business days. Express options at checkout.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Returns</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-slate-300">
          Free returns within 30 days of delivery in original condition.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
```

## Checkout the components:

https://zentauri-ui.vercel.app/

## Development

From this package directory in the monorepo:

- `pnpm build` (or `npm run build`) — production bundle via `tsup` (Rollup treeshake + `scripts/prepend-use-client.mjs` via `onSuccess` so each `dist/ui/*.mjs` / `*.js` entry starts with `"use client"`)
- `pnpm dev` — `tsup` watch mode (same `onSuccess` hook after each rebuild)
- `pnpm test` / `pnpm test:watch` — **Vitest** and **Testing Library** unit tests

## NOTE:

This package is in initial phase of development and you might see some minor or major breaking changes in the future. If you want to contribute to this project, email me at @shubhmtiwri00@gmail.com or ping me on linkeded https://www.linkedin.com/in/shubham-tiwari-b7544b193/

## License

MIT
