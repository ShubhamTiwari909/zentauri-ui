# BentoGrid — Build Spec (Zentauri UI)

**Target repo:** `zentauri-ui`
**Pattern to follow:** `add-new-zentauri-component` skill / PR #109 (Typing Indicator) — same layering, same file checklist, same generated-artifact rules.
**Slug:** `bento-grid` · **Component name:** `BentoGrid` · **Title:** `Bento grid` · **Token prefix:** `zuiBentoGrid` · **Category:** `Layout` · **Has animated variant:** yes

---

## 1. Summary & Goal

A CSS-Grid-native grid component with three optional, composable animation layers:

1. **Reflow** — items animate to new positions on filter/sort/insert/remove.
2. **Bento-expand** — hover/focus grows an item's span; neighbors reflow live.
3. **Morph-to-detail** — clicking an item shared-element-transitions into an expanded detail view, then morphs back.

Non-negotiable design constraint: **real CSS Grid, no absolute positioning, DOM order always equals visual/reading order.** This is the differentiator vs. typical masonry libraries — it's what makes the component accessible where most "animated grid" libraries aren't.

Static entry (no `framer-motion`) must be fully usable on its own: spans/appearances render correctly, hover/focus on bento items still visually resizes (CSS-only, snaps instead of animating smoothly), and detail view still opens/closes (plain show/hide, no shared-element morph). The animated entry layers smooth motion on top — this mirrors the existing static/animated split, don't blur it.

## 2. Out of scope for v1 (do not build)

- Drag-to-reorder (candidate for a v2 `dnd-kit`-based add-on — do not add as a peer dep now).
- Virtualization / windowing for very large item counts (note the limitation in docs instead).
- Server-driven layout persistence — this is a UI primitive only, no backend.

## 3. Public API

### 3.1 `<BentoGrid>`

| Prop                           | Type                                       | Default     | Notes                                                                                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cols`                         | `number`                                   | `4`         | Explicit column count.                                                                                                                                                                                                                             |
| `minItemWidth`                 | `number` (px)                              | `undefined` | If set, overrides `cols` with `repeat(auto-fit, minmax(minItemWidth, 1fr))` — container-query driven, not viewport media queries.                                                                                                                  |
| `gap`                          | `"sm" \| "md" \| "lg"`                     | `"md"`      | Maps to `--zui-bento-grid-gap-*` tokens.                                                                                                                                                                                                           |
| `autoFlow`                     | `"row" \| "dense"`                         | `"dense"`   | `dense` lets smaller items backfill gaps left by larger spans.                                                                                                                                                                                     |
| `animation`                    | `"none" \| "reflow" \| "bento" \| "morph"` | `"none"`    | Cumulative: `bento` includes reflow; `morph` includes both. The static entry never animates transitions but still gates behavior by level: `bento`+ enables the CSS hover/focus expand (snaps), `morph` enables the detail view (plain show/hide). |
| `className`, `children`, `ref` | standard                                   | —           | `ref` forwards to the root `div`.                                                                                                                                                                                                                  |

### 3.2 `<BentoGrid.Item>`

| Prop                            | Type                                                                     | Default      | Notes                                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                            | `string`                                                                 | **required** | Stability key for `AnimatePresence`/`layoutId`. Must be unique within a grid.                                                                                          |
| `span`                          | `"1x1" \| "2x1" \| "1x2" \| "2x2" \| "featured"`                         | `"1x1"`      | `featured` = 3x2. Maps to `col-span-*`/`row-span-*`.                                                                                                                   |
| `appearance`                    | `"default" \| "glass" \| "gradient-*" \| ...` (15+ palette, house style) | `"default"`  | Same palette convention as other Zentauri components.                                                                                                                  |
| `expandable`                    | `boolean`                                                                | `false`      | Enables bento hover/focus expand. Ignored if grid `animation` is `"none"` or `"reflow"`.                                                                               |
| `expandedSpan`                  | same union as `span`                                                     | `"2x2"`      | Target span while expanded.                                                                                                                                            |
| `detail`                        | `ReactNode`                                                              | `undefined`  | If provided, item becomes clickable and opens the detail view. Ignored unless grid `animation="morph"` (static entry: still opens, just without shared-element morph). |
| `onOpenDetail`, `onCloseDetail` | `() => void`                                                             | —            | Optional callbacks.                                                                                                                                                    |
| `className`, `children`, `ref`  | standard                                                                 | —            |                                                                                                                                                                        |

### 3.3 Usage examples

```tsx
// Basic static grid — no framer-motion required
<BentoGrid cols={4} gap="md">
  <BentoGrid.Item id="a" span="2x1">...</BentoGrid.Item>
  <BentoGrid.Item id="b">...</BentoGrid.Item>
</BentoGrid>

// Filter/sort with animated reflow
<BentoGrid animation="reflow" cols={3}>
  {filteredItems.map((i) => (
    <BentoGrid.Item key={i.id} id={i.id}>{i.content}</BentoGrid.Item>
  ))}
</BentoGrid>

// Full showcase: bento-expand + morph-to-detail
<BentoGrid animation="morph" cols={4}>
  <BentoGrid.Item id="hero" span="2x2" expandable detail={<DetailPanel />}>
    <Card />
  </BentoGrid.Item>
</BentoGrid>
```

## 4. Animation behavior spec

### 4.1 Reflow

- Wrap items in `motion.div` with `layout` in the animated entry.
- Use `AnimatePresence mode="popLayout"` at the grid container so removed items animate out without displacing siblings mid-exit.
- Transition preset: spring, `{ type: "spring", stiffness: 350, damping: 30 }` (export as default preset in `animated/animations.ts`; also export `"gentle"`, `"snappy"` variants).

### 4.2 Bento-expand

- Static entry: pure CSS — `:hover`/`:focus-within` on `[data-slot="bento-grid-item"][data-expandable]` swaps to the `expandedSpan` classes. No transition on grid-column/row (browsers can't interpolate discrete grid-template values) — it snaps. This is expected and fine for the static entry.
- Animated entry: same class swap, but because siblings also carry `layout`, Framer Motion's FLIP technique (measure before/after `DOMRect`, apply inverse transform, animate to identity) makes the resize and neighbor reflow appear smooth even though the underlying grid values are discrete. Don't try to animate `gridColumn`/`gridRow` directly — animate via `layout`, not via `style`.
- Trigger on both `mouseenter`/`mouseleave` and `focus`/`blur` (keyboard parity).

### 4.3 Morph-to-detail

- Give the item's inner content wrapper and the expanded detail panel's content wrapper the **same** `layoutId={`bento-detail-${id}`}`. Framer Motion animates between them automatically even though they're rendered in different parts of the tree (detail panel renders in a portal/overlay).
- Detail panel is controlled by `BentoGrid`-level context state (`openId`/`setOpenId`), not local state on the item — only one detail can be open per grid.
- Focus management: on open, move focus into the detail panel and trap it; on close, return focus to the triggering item. This is required, not optional — most shared-element-transition implementations skip this and it's a real accessibility gap worth explicitly avoiding.
- Static entry: same open/close state machine, but detail renders as a plain conditional block (no portal, no layoutId, no morph) — still fully functional, just not animated.

### 4.4 Reduced motion

- Animated entry calls `useReducedMotion()` from `framer-motion`.
- When `true`: set `layout={false}` on all `motion.div`s, and give the detail panel `transition={{ duration: 0 }}` instead of the spring — items should snap to state instantly, never a partial/instant-jump motion artifact.
- This must be automatic, not a prop the consumer has to opt into.

## 5. Design tokens — `design-system/bento-grid.ts`

Follow house style: every themeable value is a CSS variable with a hardcoded fallback, paired with a `dark:` class in the same string.

- `zuiBentoGridGaps` — `sm`/`md`/`lg` → `gap-[var(--zui-bento-grid-gap-{size},{px-fallback})]`
- `zuiBentoGridSpans` — `1x1`/`2x1`/`1x2`/`2x2`/`featured` → `col-span-*`/`row-span-*` string maps
- `zuiBentoGridAppearances` — 15+ palettes (same set used elsewhere in the library) + `gradient-*` + `glass`, each as `bg-[var(--zui-bento-grid-{appearance}-bg,...)] dark:bg-[var(--zui-bento-grid-{appearance}-bg-dark,...)]` plus paired border token
- `zuiBentoGridItemBase` — shared radius, transition, and focus-ring token strings applied to every item regardless of appearance

Register in `design-system/index.ts` via `export * from "./bento-grid";`.

## 6. Variants — `ui/bento-grid/variants.ts`

- `bentoGridVariants` (cva) — driven by `autoFlow`, `gap`. No raw Tailwind — import only from `../../design-system/bento-grid`.
- `bentoGridItemVariants` (cva) — driven by `span`, `appearance`.
- Re-export any constants the base/animated files need (e.g. the span-to-class map, for computing `expandedSpan` classes at runtime).

## 7. Types — `ui/bento-grid/types.ts`

```ts
export type BentoGridSpan = "1x1" | "2x1" | "1x2" | "2x2" | "featured";
export type BentoGridAnimation = "none" | "reflow" | "bento" | "morph";

export type BentoGridProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof bentoGridVariants> & {
    cols?: number;
    minItemWidth?: number;
    animation?: BentoGridAnimation;
  };

export type BentoGridItemProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof bentoGridItemVariants> & {
    id: string;
    expandable?: boolean;
    expandedSpan?: BentoGridSpan;
    detail?: ReactNode;
    onOpenDetail?: () => void;
    onCloseDetail?: () => void;
  };
```

Also export `BentoGridVariantProps` and the context value type (`animation`, `cols`, `openId`, `setOpenId`).

## 8. File-by-file build plan (Phase A)

- [ ] `design-system/bento-grid.ts` — token file (§5)
- [ ] `design-system/index.ts` — add `export * from "./bento-grid";`
- [ ] `ui/bento-grid/variants.ts` (§6)
- [ ] `ui/bento-grid/types.ts` (§7)
- [ ] `ui/bento-grid/bento-grid-base.tsx` — `"use client"`; React context (`animation`, `cols`, `openId`, `setOpenId`); `BentoGridBase` (`data-slot="bento-grid"`), `BentoGridItemBase` (`data-slot="bento-grid-item"`, `data-expandable` when applicable); compose as `BentoGrid = Object.assign(BentoGridBase, { Item: BentoGridItemBase })`; also export `BentoGridItem` standalone. No framer-motion here.
- [ ] `ui/bento-grid/bento-grid.tsx` — two-line static re-export
- [ ] `ui/bento-grid/animated/animations.ts` — transition presets (§4.1)
- [ ] `ui/bento-grid/animated/types.ts` — `BentoGridAnimatedProps = BentoGridBaseProps & { ... }`
- [ ] `ui/bento-grid/animated/bento-grid-animated.tsx` — `"use client"`; `motion`, `AnimatePresence`, `layoutId`, `useReducedMotion` (§4.1–4.4)
- [ ] `ui/bento-grid/animated/index.ts` — `"use client"` + re-exports
- [ ] `ui/bento-grid/index.ts` — `"use client"` + re-export component, prop/variant types, variant utilities
- [ ] `ui/bento-grid/bento-grid.test.tsx` (§9)
- [ ] `tsup.config.ts` — add `"bento-grid"` to `uiComponentNames` and `uiAnimatedComponentNames`
- [ ] `packages/components/package.json` — minor version bump

**Phase B (generated — run scripts, don't hand-edit):** `generate:registry`, `generate-props.mjs`, `update:test-health` — verify `bento-grid` appears in the registry with `framer-motion` under `peerHints`.

## 9. Testing requirements

- [ ] `displayName` set for both `BentoGrid` and `BentoGridItem`
- [ ] root `data-slot="bento-grid"`, item `data-slot="bento-grid-item"`
- [ ] default render (no props) matches expected default classes
- [ ] each `span` value renders the correct `col-span-*`/`row-span-*` classes
- [ ] each `appearance` value renders the correct bg/border classes
- [ ] `ref` forwarding on both components
- [ ] `className` passthrough merges, doesn't overwrite
- [ ] `expandable` + hover/focus toggles `expandedSpan` classes (static entry)
- [ ] animated entry: `layoutId` present and equals `` `bento-detail-${id}` `` when `detail` is set
- [ ] animated entry: reduced-motion mock (`matchMedia`) results in `layout={false}` / zero-duration transition
- [ ] peer-isolation assertion: static entry file has zero `framer-motion` imports

## 10. Docs app (Phase C)

- [ ] `app/preview/components/bento-grid/page.tsx`
- [ ] `preview/bento-grid/index.tsx` + `sections/hero.tsx`, `sections/snippet-sections.tsx`
- [ ] `sections/components/data.ts` — span/appearance/animation arrays (`as const satisfies`)
- [ ] `sections/components/demo.tsx` — static vs animated based on `animation` prop
- [ ] `sections/components/snippets.ts` — `bentoGridSnippet(opts)`
- [ ] `sections/components/playground.tsx` — Select-driven controls (cols, gap, animation, span, appearance)
- [ ] Hero example: 6–8 sample cards demonstrating hover-expand + click-to-detail live
- [ ] `content/seo/preview/components/bento-grid.json` — category `Layout`, useCases (dashboards, image galleries, portfolio sections, admin panels), FAQs should cover: does it work without `framer-motion`? is it accessible for screen readers/keyboard? does it support drag reorder (answer: not in v1)?
- [ ] `lib/preview-seo-registry.ts` — register the SEO doc
- [ ] `css-variables/data/bento-grid.ts` + `css-variables/reference-data.ts` — every `--zui-bento-grid-*` token, `darkVariableCount` must match actual dark entries
- [ ] `sidebar/sidebar-data.ts` — add under `Layout` group
- [ ] `introduction/data.ts` — badge `"Layout"`
- [ ] `lib/site-search-entries.ts` — **no edit needed**: it auto-derives from the `sidebar*Data` arrays (per CLAUDE.md), so the sidebar registration above populates the search index automatically
- [ ] ⚠️ `lib/home-install-commands.ts` — decide consciously; recommend **yes**, this is a flagship differentiator worth surfacing on the homepage

## 11. Definition of done

- [ ] Static entry renders correctly with zero `framer-motion` dependency
- [ ] Animated entry: reflow, bento-expand, and morph-to-detail all work and look smooth
- [ ] `prefers-reduced-motion` disables all motion automatically, no manual opt-in needed
- [ ] Tab order / DOM order always matches visual order — verified by keyboard-only pass
- [ ] Detail-view focus trap works; focus returns to trigger item on close
- [ ] Light and dark mode both correct
- [ ] `pnpm --filter @zentauri-ui/zentauri-components test|build`, `pnpm check-types`, `pnpm lint`, `pnpm format` all pass
- [ ] Docs preview page works: sidebar link, search entry, CSS-variable reference all render
- [ ] `phase-3-plan.md` checkbox flipped for `bento-grid`

## 12. Reference

Follow the `add-new-zentauri-component` skill / PR #109 (Typing Indicator) as the canonical layering example for anything not explicitly specified above — token file → variants → types → base → static entry → animated entry → barrel → tests → generated artifacts → docs app.
