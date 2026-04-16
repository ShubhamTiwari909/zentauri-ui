# @zentauri-ui/zentauri-components

A React UI kit for building product interfaces with Tailwind CSS. Components are implemented in TypeScript, ship with declaration files, and are bundled as ESM and CommonJS for broad bundler compatibility.

## Overview

The library targets **React 18+** apps that use **Tailwind CSS v4** (or an equivalent setup where Tailwind can scan this package via `@source`). Styling uses utility classes; **class-variance-authority** powers variant APIs (size, appearance, and similar props), with **clsx** and **tailwind-merge** for predictable `className` composition. **Framer Motion** backs motion where components animate, and **react-icons** is used for iconography where applicable.

Published artifacts live under `dist/`; consumers import the UI barrel at `@zentauri-ui/zentauri-components/ui`. A compiled stylesheet is also exposed at `@zentauri-ui/zentauri-components/styles.css` for setups that import CSS explicitly (many apps rely on Tailwind scanning alone—see installation).

## Package exports

| Subpath | Description |
| --- | --- |
| `@zentauri-ui/zentauri-components/ui` | Components, hooks, and types (ESM `.js`, CJS `.cjs`, `.d.ts`) |

## Requirements

- **React** and **React DOM** `>= 18` (peer dependencies)
- A Tailwind pipeline that can **scan** this package (see Step 2 below)

## Components

Modules re-exported from the UI entry include:

- Accordion
- Alert
- Badge
- Button
- Card
- Divider
- Drawer
- Dropdown
- Empty state
- Input
- Modal
- Pagination
- Progress
- Select
- Skeleton
- Spinner
- Table
- Tabs
- Toast
- Toggle
- Tooltip

## Installation

**Getting started** — Add the package, point Tailwind at the library sources, then import components from the UI entry.

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

### Step 2 — Include library paths in globals.css

Add an `@source` entry so Tailwind scans class names inside `@zentauri-ui/zentauri-components`. The path is relative to this CSS file—adjust `../` if your file lives elsewhere.

```css
@import "tailwindcss";
@source "../node_modules/@zentauri-ui/zentauri-components";
```

### Step 3 — Import and use components

Import from the UI barrel, then compose primitives in your JSX.

#### Imports

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui";
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

## Development

From this package directory in the monorepo:

- `pnpm build` (or `npm run build`) — production bundle via `tsup`
- `pnpm dev` — `tsup` watch mode
- `pnpm test` / `pnpm test:watch` — **Vitest** and **Testing Library** unit tests

## License

MIT
