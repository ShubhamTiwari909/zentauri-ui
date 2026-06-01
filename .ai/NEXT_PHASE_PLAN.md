# Zentauri UI — Next Phase Plan

> Generated: 2026-06-01  
> Based on: 43 UI components · 5 charts · 28 hooks · 501 tests

---

## Current State Snapshot

| Category          | Count               | Health                                 |
| ----------------- | ------------------- | -------------------------------------- |
| UI Components     | 43                  | Solid — consistent layering across all |
| Charts            | 5 types             | Covered, preview pages exist           |
| Hooks             | 28                  | All tested                             |
| Tests             | 501 across 74 files | Good baseline                          |
| Animated variants | 27 / 43 components  | 16 gaps                                |
| Missing tests     | 0 components        | Phase 1 test gaps closed               |

---

## Phase 1 — Close Existing Gaps

Quick wins with low risk — no new scope, just completing what's already partially done.

### 1.1 Add missing test files

These four components previously had no dedicated test files and are now covered:

- `src/ui/divider/divider.test.tsx`
- `src/ui/empty-state/empty-state.test.tsx`
- `src/ui/skeleton/skeleton.test.tsx`
- `src/ui/table/table.test.tsx` — highest priority; covers `sortDirection`, `stickyHeader`, and `rowAnimation` logic

### 1.2 Add `typography` component preview page

Typography exists as a full component in `src/ui/typography/` (7 sub-components: `Heading`, `Text`, `Blockquote`, `CodeBlock`, `InlineCode`, `List`) but has **no entry under `/preview/components/typography`**. It only lives at `/preview/typography/`. Add a unified component preview page alongside all others so it appears in the component index.

### 1.3 Upgrade `Table` with data-management primitives

The current table is purely presentational. Add:

- Controlled sort state (`onSortChange`, `sortKey`, `sortDirection`) on `TableHeadCell`
- A `useTableSort` hook in `src/hooks/` to manage sort state externally
- A `useTableFilter` hook for basic column filtering

These should be composable — not baked into the component itself — matching the pattern of `usePagination` pairing with `Pagination`.

---

## Phase 2 — Missing Essential Components

Components that consumers of any UI kit expect and currently have to source elsewhere.

| Component            | Why it matters                                                                                           |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| **`Textarea`**       | Critical missing form input — every form needs it, no workaround exists                                  |
| **`Switch`**         | Visually distinct from `Toggle` — binary on/off for settings screens                                     |
| **`NumberInput`**    | Stepper-style number field with increment/decrement buttons                                              |
| **`Combobox`**       | Searchable select with autocomplete — more common than raw `Select` in real apps                         |
| **`MultiSelect`**    | Tag-based multi-value input — impossible to compose from existing components                             |
| **`DatePicker`**     | Single-date picker paired with a `useCalendar` hook. No external date library required for the primitive |
| **`NavigationMenu`** | Top-bar horizontal nav with dropdowns — missing from the layout toolkit                                  |
| **`Carousel`**       | Horizontal scroll with controls. Can wrap Embla internally                                               |
| **`Resizable`**      | Split-pane panels with drag handle — high demand in dashboard UIs                                        |
| **`ColorPicker`**    | Hue/saturation picker + hex input — rounds out the form set                                              |

**Suggested build order** (each unlocks more usage patterns):

```
Textarea → Switch → NumberInput → Combobox → MultiSelect
→ DatePicker → NavigationMenu → Carousel → Resizable → ColorPicker
```

---

## Phase 3 — Animated Variants for Remaining 16 Components

Currently missing `animated/` subpath entries for:

```
breadcrumb      context-menu    dropdown        dynamic-stepper
file-upload     marquee         otp-input       pagination
rating          scroll-area     search          select
slider          stepper         typography      animated-number *
```

> `animated-number` already uses `animations.ts` internally but exposes no `animated/` subpath — add one for consistency with every other component.

**Highest value to do first:** `select`, `dropdown`, `pagination`, `search` — these are interaction-heavy and benefit most from enter/exit transitions.

---

## Phase 4 — New Chart Types

The 5 existing charts (area, bar, bubble, line, pie) cover basic cases. Additions:

| Chart              | Use case                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **Radar / Spider** | Multi-axis comparison — very common in dashboards                                                     |
| **Scatter**        | Correlation plots — completes the data science toolkit                                                |
| **Stacked Bar**    | Part-to-whole over categories — frequently requested variant of `Bar`                                 |
| **Donut**          | Pie with center slot for a metric display — add as a prop on the existing `Pie` entry, not a new file |
| **Funnel**         | Conversion step visualization — product analytics dashboards                                          |

---

## Phase 5 — New Hooks

Gaps in the hook set that consumers commonly reach for:

| Hook                         | Fills the gap                                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `useEventListener`           | Typed, SSR-safe `addEventListener` — prevents the boilerplate everyone writes                       |
| `useKeyPress` / `useHotkeys` | Keyboard shortcut binding — natural companion to the `Kbd` component                                |
| `useInterval`                | `setInterval` with automatic cleanup                                                                |
| `useTimeout`                 | `setTimeout` with automatic cleanup                                                                 |
| `useAsync`                   | Wraps async functions with `loading / data / error` state — replaces dozens of `useState` triplets  |
| `useFormField`               | Controlled field state with validation message — companion to `Textarea`, `NumberInput`, `Combobox` |

---

## Phase 6 — Developer Experience & Quality

### Accessibility audit

- Add `aria-live="polite"` region to `Toast` — currently not announced to screen readers on mount
- Verify focus trap in `Modal` and `Drawer` via `useFocusManagement` and document it in preview pages
- Add keyboard interaction tables to each component preview page (pattern: Radix UI docs)

### TypeScript generics on Table

The table is untyped for data. Add a generic `DataTable<TData>` component in a separate entry (`ui/data-table`) that wraps `Table` with typed columns, built-in sort state, and `usePagination` wiring.

### Bundle size tracking

Add a `size-limit` config in `package.json` to track per-entry bundle sizes in CI. There is currently no visibility into how much each component weighs after tree-shaking.

### Storybook

Add an `apps/storybook` workspace that imports components directly from package source for isolated development and visual regression testing. Complements the docs app (consumer-facing) with a developer-facing sandbox.

### Design token reference page

The `--zui-*` CSS variable contract is the library's main differentiator but is not documented as a standalone reference. Generate a token reference page in the docs app from `src/design-system/tokens.ts` so consumers know exactly which variables to override for theming.

---

## Execution Order

```
Phase 1  ←── Start here (no new scope, closes real gaps)
Phase 2  ←── Highest consumer impact
Phase 3  ←── Parallelizable with Phase 2
Phase 4  ←── After core component set is solid
Phase 5  ←── Incremental, can be done any time alongside other work
Phase 6  ←── Ongoing — run in parallel with everything above
```

**Single highest-leverage item right now:** `Textarea` in Phase 2.  
It is the only common form primitive completely missing, and every app that uses `Input` will eventually need it.
