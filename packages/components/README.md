# @zentauri-ui/zentauri-components

A React UI kit for building product interfaces with Tailwind CSS. Components are implemented in TypeScript, ship with declaration files, and are bundled as ESM and CommonJS for broad bundler compatibility.

## Overview

The library targets **React 18+** apps that use **Tailwind CSS v4** (or an equivalent setup where Tailwind can scan this package via `@source`). Styling uses utility classes; **class-variance-authority** powers variant APIs (size, appearance, and similar props), with **clsx** and **tailwind-merge** for predictable `className` composition. **Framer Motion** backs motion where components animate, and **react-icons** is used for iconography where applicable.

Published artifacts live under `dist/`. You can import either the **UI barrel** (`@zentauri-ui/zentauri-components/ui`) or a **per-area subpath** (`@zentauri-ui/zentauri-components/ui/<name>`) so bundlers only pull in the entry you use. Most apps rely on Tailwind scanning the package sources (see installation); a separate CSS import is not required for that setup.

## Package exports

| Subpath | Description |
| --- | --- |
| `@zentauri-ui/zentauri-components/ui` | Full UI barrel: all components, hooks, and types (ESM `.js`, CJS `.cjs`, `.d.ts`) |
| `@zentauri-ui/zentauri-components/ui/<name>` | Single area entry (same artifacts per file). Use this when you import from one module only to keep the dependency graph smaller. |

The `<name>` segment matches the folder under `src/ui/` (for example `accordion`, `select`, `empty-state`, `buttons` for `Button`, `inputs` for `Input`).

## Requirements

- **React** and **React DOM** `>= 18` (peer dependencies)
- A Tailwind pipeline that can **scan** this package (see Step 3 below)

## Components

Each area is available from the barrel and from its own subpath (`…/ui/<subpath>`):

| Area | Subpath `…/ui/…` |
| --- | --- |
| Accordion | `accordion` |
| Alert | `alert` |
| Badge | `badge` |
| Button | `buttons` |
| Card | `card` |
| Divider | `divider` |
| Drawer | `drawer` |
| Dropdown | `dropdown` |
| Empty state | `empty-state` |
| Input | `inputs` |
| Modal | `modal` |
| Pagination | `pagination` |
| Progress | `progress` |
| Select | `select` |
| Skeleton | `skeleton` |
| Spinner | `spinner` |
| Table | `table` |
| Tabs | `tabs` |
| Toast | `toast` |
| Toggle | `toggle` |
| Tooltip | `tooltip` |

## Installation

**Getting started** — Add the package, install peer dependencies so primitives resolve correctly, point Tailwind at the library sources, then import from the UI barrel or from a specific `ui/<name>` subpath.

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

### Step 3 — Include library paths in globals.css

Add an `@source` entry so Tailwind scans class names inside `@zentauri-ui/zentauri-components`. The path is relative to this CSS file—adjust `../` if your file lives elsewhere.

```css
@import "tailwindcss";
@source "../node_modules/@zentauri-ui/zentauri-components";
```

### Step 4 — Import and use components

Prefer a **subpath** when you only need one area (smaller resolved graph than the full barrel). The barrel remains valid when you use many primitives from different areas.

#### Imports (subpath — recommended for a single area)

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
```

#### Imports (multiple areas — one subpath import per area)

```tsx
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@zentauri-ui/zentauri-components/ui/select";
```

#### Imports (barrel — one entry for symbols from several areas)

```tsx
import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@zentauri-ui/zentauri-components/ui";
```

#### Usage

```tsx
<div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
  <Accordion type="single" defaultValue="item-1" appearance="separated" size="md">
    <AccordionItem value="item-1">
      <AccordionTrigger>Shipping</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-slate-300">
          Standard delivery in 3-5 business days. Express options at
          checkout.
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

- `pnpm build` (or `npm run build`) — production bundle via `tsup`
- `pnpm dev` — `tsup` watch mode
- `pnpm test` / `pnpm test:watch` — **Vitest** and **Testing Library** unit tests

## NOTE: 
This package is in initial phase of development and you might see some minor or major breaking changes in the future. If you want to contribute to this project, email me at @shubhmtiwri00@gmail.com or ping me on linkeded https://www.linkedin.com/in/shubham-tiwari-b7544b193/

## License

MIT
