# Flexible Grid component plan

- **Status:** Initial static component implemented and locally verified. Animation and dashboard editing remain proposed follow-ups.
- **Prepared:** 6 October 2026.
- **Skill:** [add-component](../../.claude/skills/add-component/SKILL.md).
- **Public slug:** `grid`. **Exports:** `Grid`, `GridItem`. **Category:** Layout.
- **Token/export prefixes:** `--zui-grid-*` / `zuiGrid*`.
- **Initial release:** Static component, shipped through a minor Changeset. Optional animation and interactive dashboard editing are later milestones.

## 1. Recommendation and usefulness

**Yes—a general-purpose Grid would be useful if it provides a coherent responsive layout contract beyond the existing Bento Grid.** Its strongest use cases are dashboards, responsive forms, product/card collections, and reusable sections that appear inside containers of different widths.

The value is a combination of typed responsive configuration, predictable defaults, reusable spacing tokens, flexible placement, and examples that work through both package installation and the source-vendoring CLI. A component that only translates `columns={3}` into a CSS declaration would add little value over existing Tailwind utilities.

The repository already contains relevant foundations:

| Existing surface                                                               | Current behavior observed in source                                                                                    | Implication for Grid                                                                                    |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `packages/components/src/ui/bento-grid/types.ts`                               | Numeric `cols`, numeric pixel `minItemWidth`, predefined tile spans, appearance variants, expansion and detail options | Simple auto-fit sizing already exists; do not present it as an entirely new capability                  |
| `packages/components/src/ui/bento-grid/bento-grid-base.tsx`                    | CSS Grid, root/item context, auto-fit template generation, detail interaction                                          | Reuse architectural conventions; avoid importing its interaction state into Grid                        |
| `packages/components/src/ui/bento-grid/variants.ts`                            | `sm/md/lg` gaps; dense placement is the default                                                                        | Grid should default to ordinary row placement and support a broader layout API                          |
| `packages/components/src/design-system/bento-grid.ts`                          | Card-like item styling and a default implicit row minimum of `7rem`                                                    | Grid should allow neutral wrappers and natural content heights                                          |
| `packages/components/src/ui/sortable-list/types.ts`                            | Items, item identity, rendering, and reorder callbacks                                                                 | Reordering is already a separate interaction concern; avoid silently turning Grid into a sorting widget |
| `apps/zentauri-demo-pages/components/dashboard/sub-components/charts-grid.tsx` | Handwritten one-column / two-column responsive layout                                                                  | A realistic example of layout configuration Grid could consolidate                                      |
| `apps/animated-grid.md`                                                        | An earlier Bento Grid plan                                                                                             | Treat it as historical context, not the specification for this component                                |

### Product boundary

| Need                                                                  | Recommended tool                                    |
| --------------------------------------------------------------------- | --------------------------------------------------- |
| A small one-off layout with no reusable API                           | Existing CSS or Tailwind utilities                  |
| Responsive columns, gaps, spans, nested composition, custom templates | New `Grid` / `GridItem`                             |
| Styled feature tiles with hover expansion and detail morphing         | Existing `BentoGrid`                                |
| Sortable one-dimensional content                                      | Existing `SortableList`                             |
| Tabular records, selection, sorting, pagination                       | Existing `DataTable`                                |
| Dragging and resizing dashboard widgets with persisted coordinates    | A later, separately scoped dashboard-layout feature |

**Adoption gate:** Before publishing, demonstrate three distinct recipes—an auto-fitting collection, a responsive dashboard, and a form or section with named areas. These should show why the typed API improves reuse over copying utility strings. No user-demand or market-adoption claim is assumed by this plan.

## 2. Meaning of “dynamic” and release scope

For the first release, dynamic means that the layout responds to available space, responsive configuration, and changes to rendered children. Consumers can filter, sort, insert, or remove keyed items using normal React state.

It does not require a JavaScript layout engine. Use real CSS Grid; keep DOM nodes in the consumer's supplied order.

### Initial release: required

- Fixed equal-width columns, including responsive column counts.
- Intrinsic auto-fit and auto-fill layouts with a configurable minimum item width.
- Custom column/row templates and named areas as an advanced layout mode.
- Responsive gaps and responsive item placement.
- Independent row/column spacing; item alignment and self-alignment.
- Optional item surfaces with the library's appearance palettes and CSS variables.
- Nested grids with isolated root configuration.
- Native props, refs, semantic element options, and stable slot attributes.
- React-controlled content changes without a component-owned copy of the data.
- Complete package, CLI, token, props, docs, accessibility, and release integration.
- No new runtime dependency for the static entry.

### Later milestones

1. Optional animated entry for item reflow and enter/exit transitions.
2. Explicit container-query breakpoint maps, if intrinsic auto-sizing does not cover the use cases.
3. A separately designed draggable/resizable dashboard layout with controlled state, keyboard alternatives, collision rules, and persistence adapters.

### Excluded from the initial release

Masonry packing, virtualization, fetching, pagination, selection state, data sorting, breakpoint-change callbacks, layout persistence, drag handles, resizing, portals, and detail modals. Consumers retain ownership of their content, loading states, empty-state messages, and application data.

Do not expose placeholder props for future features. A prop becomes public only when its behavior and validation are implemented.

## 3. Public API proposal

The following is the proposed contract, not an existing package export. Confirm its feasibility in the implementation spike before freezing exported types.

```ts
type GridBreakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

// Requiring base avoids an undefined first-render/mobile configuration.
type GridResponsive<T> = { base: T } & Partial<
  Record<Exclude<GridBreakpoint, "base">, T>
>;

type GridResponsiveValue<T> = T | GridResponsive<T>;
type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type GridAlignment = "start" | "center" | "end" | "stretch";

type GridLayout =
  | { mode: "fixed"; columns: number }
  | {
      mode: "auto";
      minItemWidth?: number | string;
      repeat?: "fit" | "fill";
    }
  | {
      mode: "custom";
      columns: string;
      rows?: string;
      areas?: readonly string[];
    };

type GridSpan = number | "full";
```

A layout object has a `mode`; a responsive object has a mandatory `base`. This keeps normalization unambiguous. Use discriminated unions to reject combinations such as `mode: "fixed"` with `minItemWidth`.

### Grid root props

| Prop                                      | Proposed type                        | Default                         | Contract                                                                                                                                                                 |
| ----------------------------------------- | ------------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `layout`                                  | `GridResponsiveValue<GridLayout>`    | `{ mode: "fixed", columns: 1 }` | One complete layout descriptor per supplied breakpoint                                                                                                                   |
| `stackOnMobile`                           | `boolean`                            | `true`                          | Below the consumer's `sm` breakpoint, use one column and automatic span-1 item placement; `false` restores the configured mobile layout. Each nested root is independent |
| `gap`                                     | `GridResponsiveValue<GridGap>`       | `"md"`                          | Sets both axes unless an axis override is provided                                                                                                                       |
| `columnGap`, `rowGap`                     | `GridResponsiveValue<GridGap>`       | Unset                           | Override their respective axes                                                                                                                                           |
| `autoRows`                                | CSS `gridAutoRows` value             | `"auto"`                        | Natural content heights unless the consumer supplies a track size                                                                                                        |
| `autoFlow`                                | `"row" \| "row-dense"`               | `"row"`                         | Dense packing is explicit and documented for order-sensitive content                                                                                                     |
| `alignItems`, `justifyItems`              | `GridAlignment`                      | `"stretch"`                     | Root item alignment; initially scalar                                                                                                                                    |
| `as`                                      | `"div" \| "section" \| "ul" \| "ol"` | `"div"`                         | Constrained native semantics, with matching native props/ref types                                                                                                       |
| `children`                                | `ReactNode`                          | Empty                           | Render consumer content directly                                                                                                                                         |
| `className`, `style`, native props, `ref` | Corresponding selected-element props | Unset                           | Preserve native events, labels, IDs, and integration hooks                                                                                                               |

Do not add an `items`/`renderItem` API alongside `children` initially. Mapping data into `GridItem` already handles arbitrary content and keeps the surface small. Consumer callbacks remain native or application-owned; there is no synthetic `onLayoutChange` in the static release.

### GridItem props

| Prop                                                  | Proposed type                           | Default     | Contract                                                                       |
| ----------------------------------------------------- | --------------------------------------- | ----------- | ------------------------------------------------------------------------------ |
| `colSpan`                                             | `GridResponsiveValue<GridSpan>`         | `1`         | Fixed layouts normalize to the available columns; `"full"` uses `1 / -1`       |
| `rowSpan`                                             | `GridResponsiveValue<number>`           | `1`         | Positive row span; no `"full"` because implicit rows have no stable final line |
| `columnStart`                                         | `GridResponsiveValue<number \| "auto">` | `"auto"`    | Positive explicit column line or automatic placement                           |
| `rowStart`                                            | `GridResponsiveValue<number \| "auto">` | `"auto"`    | Positive explicit row line or automatic placement                              |
| `area`                                                | `GridResponsiveValue<string \| "auto">` | `"auto"`    | Named area in a custom layout; explicit `"auto"` clears an inherited area      |
| `alignSelf`, `justifySelf`                            | `"auto" \| GridAlignment`               | `"auto"`    | Optional per-item alignment                                                    |
| `appearance`                                          | Item appearance union from CVA          | `"default"` | Default is neutral; opt-in styled surfaces                                     |
| `padding`                                             | `"none" \| "sm" \| "md" \| "lg"`        | `"none"`    | Surface padding, independent of grid spacing                                   |
| `as`                                                  | `"div" \| "article" \| "li"`            | `"div"`     | Selected-element props/ref typing; list semantics remain consumer-controlled   |
| `children`, `className`, `style`, native props, `ref` | Corresponding selected-element props    | Unset       | No generated interactive wrapper                                               |

Export `GridProps`, `GridItemProps`, layout/responsive/appearance types, and `gridVariants` / `gridItemVariants`. Use a typed native-element pattern or overloads that preserve event/ref types; do not widen every ref to `HTMLElement` merely to silence type errors.

Prefer named exports over a second `Grid.Item` alias in the first release. `GridItem` must be a direct DOM grid child to receive placement; arbitrary intermediate wrappers change CSS Grid semantics. Fragments are fine. Raw children may participate as ordinary grid children but receive no GridItem placement or appearance behavior.

## 4. Responsive behavior and precedence

### Breakpoints

Use the consumer's Tailwind `sm`, `md`, `lg`, `xl`, and `2xl` viewport variants. The default breakpoint values and mobile-first behavior are described in [Tailwind's responsive documentation](https://tailwindcss.com/docs/responsive-design). Consumer theme overrides should be honored because the component uses those variants rather than hardcoded media-query pixels.

Rules:

1. Scalars apply at every width.
2. Responsive maps require `base`.
3. Missing breakpoint entries inherit the latest smaller configured value.
4. Layout entries replace the whole descriptor. Do not merge `minItemWidth` from an earlier auto mode into a later fixed mode.
5. Item spans/starts and gaps resolve independently, then normalize against the root layout at that breakpoint.
6. Root configuration is supplied through context to the nearest Grid only; nested roots replace it.
7. Do not read `window.innerWidth`, `matchMedia`, or `ResizeObserver` to choose the static layout. Server and client generate the same classes and variables.

```tsx
<Grid
  layout={{
    base: { mode: "fixed", columns: 1 },
    md: { mode: "fixed", columns: 2 },
    xl: { mode: "fixed", columns: 4 },
  }}
  gap={{ base: "sm", lg: "lg" }}
>
  <GridItem colSpan={{ base: 1, xl: 2 }}>Main content</GridItem>
  <GridItem>Supporting content</GridItem>
</Grid>
```

### Spacing precedence

Resolve the general gap and both axis overrides at each breakpoint. For each axis, use its override if supplied, otherwise the resolved general gap. An axis scalar applies at every width, even if `gap` changes at larger breakpoints. An axis map with `base` also stays active at subsequent omitted breakpoints. `"none"` means zero, not “unset.”

### Styling precedence

- Theme tokens provide defaults; explicit props select component behavior and token variants.
- Runtime layout configuration uses private CSS variables rather than hardcoded public theme-token overrides.
- Merge consumer classes through `cn()`. Avoid claiming that `className` always wins over inline properties.
- Merge consumer `style` last. Direct CSS properties in `style` intentionally override the corresponding component CSS declarations and can bypass placement safeguards.
- Consumer overrides of private variables are unsupported. Document `style` as the advanced escape hatch, including responsibility for valid CSS and placement.

### Layout-mode interactions

| Active mode | Columns                                                 | Item span behavior                                                                                                                              |
| ----------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed       | `repeat(N, minmax(0, 1fr))`                             | Clamp integer span/start to the declared column count; full span covers the explicit grid                                                       |
| Auto        | `repeat(auto-fit/auto-fill, minmax(min(W, 100%), 1fr))` | Ordinary items use span 1; full-span items are allowed; numeric spans greater than 1 and explicit column starts normalize to ordinary placement |
| Custom      | Consumer column template                                | Support explicit placement, spans, and areas; consumer is responsible for track-count consistency                                               |

Auto mode deliberately has this restriction because the actual track count is not known to the React renderer. Do not introduce measurement merely to clamp spans. Document that a full-span item occupies all explicit columns and can affect empty-track collapse. The auto-fit/auto-fill distinction comes from the [CSS Grid specification](https://www.w3.org/TR/css-grid-1/#auto-repeat).

For fixed mode with `N` columns, normalize start `S` to `1..N` and span `K` to `1..(N-S+1)` when a start is explicit; otherwise clamp to `1..N`. Normalize separately at every breakpoint where either the root or item configuration changes. `colSpan="full"` ignores column start and resolves to `1 / -1`.

### Named areas and clearing placement

In custom mode, `areas` is an array of row strings, such as `["main main aside", "footer footer footer"]`. Quote rows when building `gridTemplateAreas`; require equal cell counts and rectangular regions for every non-dot name. Restrict the typed convenience API to simple area identifiers, reserving `auto` and `.` for their CSS meanings.

An active named `area` takes precedence over spans/starts. Switching to `area="auto"` or a non-custom root mode must reset area placement and restore resolved spans/starts. Switching layout modes must also clear previously active row templates and area templates. Missing item area names fall back to ordinary placement with a development warning.

Do not support named-line start strings in the convenience API initially. Consumers can express those through `style` without expanding validation into a complete CSS parser.

## 5. Implementation architecture

Follow the skill's token → variants → types → base → static entry → barrel order.

```text
packages/components/src/design-system/grid.ts
packages/components/src/ui/grid/
  variants.ts
  types.ts
  grid-layout.ts             # private pure normalization/style helpers
  grid-layout.test.ts        # normalization and configuration edge cases
  grid-context.ts            # private nearest-root configuration context
  grid-base.tsx
  grid.tsx                  # static re-export only
  grid.test.tsx
  index.ts                  # starts with "use client"
```

### CSS delivery strategy

The package ships utility strings rather than compiled component CSS. Responsive prop values must therefore never create dynamic Tailwind class names such as `` `md:grid-cols-${n}` ``. Tailwind requires detectable complete class strings; see [its source-detection documentation](https://tailwindcss.com/docs/detecting-classes-in-source-files).

Use a finite, literal map of utilities in `design-system/grid.ts`, with private custom properties holding generated values. For example, a literal `md:[grid-template-columns:var(--_zui-grid-columns-md)]` class can consume a template generated from the `md` layout. Every template value is a CSS value, not a class name.

Design details:

- Use `--_zui-grid-*` for internal configuration so it is distinguishable from public `--zui-grid-*` theme tokens.
- Generate effective values for all supported breakpoints after inheritance resolution; they include explicit resets such as `none` and `auto`.
- Emit responsive property classes in a deterministic manner; CSS variant order, not object insertion order, governs activation.
- Reset every private variable read by a root or item on that element. A child must not inherit the outer root's configuration accidentally.
- Keep public theme tokens inheritable, including item surface overrides applied on a wrapper.
- Context carries the normalized root configuration, not the currently measured viewport or an array of children.
- GridItem resolves a complete placement map against its nearest root's configuration. A root breakpoint change can alter a span even when the item's own map omits that breakpoint.
- Keep variant maps limited to imports of design-system constants; no raw Tailwind classes in `variants.ts`.
- Use `min-width: 0` / `min-height: 0` on appropriate wrappers. Do not silently clip content or hide scrollable descendants.
- Avoid transforming/filtering children, cloning arbitrary elements, or registering every item in shared state.
- `GridItem` outside a root renders as a neutral wrapper, ignores placement props, and warns in development. This behavior is identical during server rendering and initial hydration.

### Feasibility spike before implementation

Create a small disposable fixture that proves:

1. Tailwind emits all literal breakpoint utilities when scanning package source.
2. Fixed → auto → custom mode switches reset inactive declarations.
3. Responsive root changes normalize responsive and scalar item spans correctly.
4. A nested Grid and its items receive their own private values.
5. Customized consumer breakpoints still activate the generated classes correctly.
6. Server-rendered markup hydrates without changing the class/variable contract.
7. Native `as` typing, CVA props, and the props generator can coexist.

Keep this spike focused on the published styling model. Do not add per-render `<style>` elements or ship a stylesheet just to avoid the static-string requirement. If the proposed variable approach fails, revise the responsive compiler before freezing the API.

## 6. Theme tokens and item appearances

The root is a layout primitive. Styling belongs on `GridItem`, which remains neutral by default so existing Card, Button, Input, and chart components can be composed without extra chrome.

### Proposed appearance set

`default`, `subtle`, `contrast`, `glass`, `blue`, `cyan`, `green`, `lime`, `emerald`, `indigo`, `purple`, `pink`, `rose`, `sky`, `teal`, `yellow`, `orange`, `red`, `slate`, `gray`, `zinc`, `gradient-blue`, `gradient-green`, `gradient-purple`, `gradient-orange`, `gradient-pink`.

Compare these names with the established palette at implementation time. Publish only variants whose tokens, fallbacks, dark treatment, documentation, and visual checks are complete.

### Token inventory to implement

Every themeable token below gets a hardcoded fallback and a paired `-dark` token in the same design-system string, including geometry tokens under the repository's token contract. Private layout variables are implementation configuration, not theme tokens.

| Token family                                           | Proposed fallback/purpose                                                                                                  |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `--zui-grid-gap-{xs,sm,md,lg,xl}`                      | `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `2rem`; light/dark defaults equal                                                   |
| `--zui-grid-min-item-width`                            | `16rem`; used when auto mode omits `minItemWidth`; paired dark fallback equal                                              |
| `--zui-grid-item-padding-{sm,md,lg}`                   | `0.5rem`, `1rem`, `1.5rem`; paired dark defaults equal                                                                     |
| `--zui-grid-item-radius`                               | `0.75rem` for styled surfaces; neutral default does not apply surface rounding                                             |
| `--zui-grid-item-border-width`                         | `1px` for styled surfaces                                                                                                  |
| `--zui-grid-{appearance}-{bg,fg,border}`               | Transparent/inherit/transparent for default; explicit readable foreground and border defaults for every surface appearance |
| `--zui-grid-{gradient-appearance}-{from,to,fg,border}` | Complete stop, foreground, and border palette; do not reuse a foreground that becomes unreadable on a gradient             |
| `--zui-grid-glass-blur`                                | `12px`; surface remains readable without relying on blur support                                                           |

Use existing global `--zui-*` theme tokens as fallback references where appropriate, followed by concrete fallbacks. A styled appearance can apply the shared radius/border-width tokens; `default` should have zero surface border and no padding unless explicitly selected.

Example public token pairing:

```ts
"gap-[var(--zui-grid-gap-md,1rem)] dark:gap-[var(--zui-grid-gap-md-dark,1rem)]";
```

The responsive spacing compiler should reference the public token selected for that breakpoint and color scheme. Prove that geometry dark overrides work inside runtime variables; do not accidentally capture only the light token. All newly used public variables must appear in the CSS-variable reference, including appearance-specific foregrounds and gradient stops.

Do not publish speculative focus-ring, drag, selection, or resize tokens. GridItem is not automatically focusable or interactive. Native children retain their own focus styling.

## 7. Content, semantics, accessibility, and edge cases

CSS layout alone does not make an ARIA grid widget. The [WAI-ARIA grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) describes an interactive composite with its own focus and keyboard model. The static layout should use native markup without automatically applying `role="grid"` or `role="gridcell"`.

Required behavior:

- No extra tab stops, roving tabindex, intercepted arrow keys, or click-to-open wrappers.
- Buttons, links, selects, and inputs inside an item keep their native behavior.
- `as="ul"` / `"ol"` examples use `GridItem as="li"`; a section example has an accessible heading/label where appropriate.
- Default row placement preserves straightforward source-order presentation. Dense flow, explicit starts, and areas can change visual order; examples must retain a meaningful DOM reading sequence. The [CSS Grid accessibility guidance](https://www.w3.org/TR/css-grid-1/#placement-a11y) explains why visual positioning does not replace logical source order.
- Do not claim visual order always matches DOM order when advanced placement is enabled.
- Native events and refs work for both root and item; custom class/style merging does not swallow callbacks.
- Render valid values including `0` and empty strings without truthiness-based filtering. Only `null` / `undefined` imply absent optional node content.
- Empty children render an empty grid; no invented message or live-region announcement.
- Consumer loading skeletons and empty messages compose normally. An empty-state message can live outside the grid or in a full-span item.
- Filtering an item that contains focus is the consumer's responsibility; document a recipe that moves focus deliberately when appropriate.
- Long words, wide images, charts, and embedded scrollers should not force accidental root overflow. Content may still need its own wrapping, dimensions, or scrolling policy.
- RTL examples must work with the browser's grid line direction; avoid naming line 1 “left.”
- Test browser zoom, narrow containers, and forced-colors mode. Avoid gradient/glass palettes that make labels unreadable.

### Invalid-input policy

TypeScript rejects obvious invalid combinations. For JavaScript callers or externally supplied values, normalize deterministically and issue development-only warnings without changing server/client output.

| Input                                                | Proposed handling                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Non-finite, fractional, zero, negative fixed columns | Use one column and warn; convenience range is integer `1..24`                                           |
| Fixed columns greater than 24                        | Clamp to 24 and warn; use custom templates for larger layouts                                           |
| Missing `base` in a responsive object                | Use the documented base default and warn                                                                |
| Unknown breakpoint keys                              | Ignore and warn                                                                                         |
| Invalid numeric `minItemWidth`                       | Use the themed default and warn; numbers are positive pixels                                            |
| Empty width/template strings                         | Use the appropriate layout default and warn                                                             |
| Other nonempty CSS width/template strings            | Treat as trusted consumer CSS; browser validation applies; no claim of a complete CSS grammar validator |
| Invalid numeric span/start                           | Normalize to span 1 or start `auto` and warn                                                            |
| Out-of-range fixed placement                         | Clamp as specified in section 4; never create unintended implicit columns                               |
| Numeric wide span or column start in auto mode       | Normalize to ordinary placement and warn; use `"full"` for full width                                   |
| Invalid/ragged/nonrectangular area matrix            | Ignore areas and warn; preserve the custom columns/rows                                                 |
| Area missing from active custom matrix               | Use normal placement and warn                                                                           |

Keep diagnostics concise and deduplicate repeated warnings. Tests verify both normalized output and the intended development/production diagnostic behavior.

## 8. Example recipes

### Auto-fitting collection

```tsx
import { Grid, GridItem } from "@zentauri-ui/zentauri-components/ui/grid";

<Grid layout={{ mode: "auto", minItemWidth: "16rem", repeat: "fit" }}>
  {products.map((product) => (
    <GridItem key={product.id}>
      <ProductCard product={product} />
    </GridItem>
  ))}
</Grid>;
```

Use `repeat: "fill"` to demonstrate reserved empty columns. Explain the sizing effect with fewer items than available columns and when the container becomes narrower than the minimum item width.

### Dashboard with responsive spans

```tsx
<Grid
  layout={{
    base: { mode: "fixed", columns: 1 },
    md: { mode: "fixed", columns: 6 },
    xl: { mode: "fixed", columns: 12 },
  }}
  gap="lg"
>
  <GridItem colSpan={{ base: 1, md: 4, xl: 8 }}>
    <RevenueChart />
  </GridItem>
  <GridItem colSpan={{ base: 1, md: 2, xl: 4 }}>
    <SummaryCard />
  </GridItem>
  <GridItem colSpan="full">
    <ActivityFeed />
  </GridItem>
</Grid>
```

### Named-area section

```tsx
<Grid
  as="section"
  aria-label="Account overview"
  layout={{
    base: {
      mode: "custom",
      columns: "minmax(0, 1fr)",
      areas: ["main", "aside", "footer"],
    },
    lg: {
      mode: "custom",
      columns: "minmax(0, 2fr) minmax(0, 1fr)",
      areas: ["main aside", "footer footer"],
    },
  }}
>
  <GridItem area="main">
    <AccountDetails />
  </GridItem>
  <GridItem area="aside">
    <AccountActions />
  </GridItem>
  <GridItem area="footer">
    <AccountHistory />
  </GridItem>
</Grid>
```

Also provide examples for independent axis gaps, a semantic list, a full-width form field, nested grids, token overrides on a wrapper, consumer `style`, and state-driven filtering with stable keys. Sorting changes the actual data/DOM order; Grid does not apply CSS `order` to simulate sorting.

## 9. Package integration checklist

| File/surface                                     | Planned work                                                                       |
| ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `packages/components/src/design-system/grid.ts`  | Root/item constants, responsive utility maps, spacing and appearance token strings |
| `packages/components/src/design-system/index.ts` | Export `./grid`                                                                    |
| `packages/components/src/lib/facade.ts`          | Add `grid` to `componentSlugs` in established order; confirm `zuiGrid*` discovery  |
| `packages/components/src/lib/facade.test.ts`     | Prove listing, lookup, slots, appearance options, and public token discovery       |
| `packages/components/src/ui/grid/*`              | Implement files and exports from section 5; static entry has no animation imports  |
| `packages/components/tsup.config.ts`             | Add `grid` to `uiComponentNames`; no animated list entry in the initial release    |
| `packages/components/package.json`               | Existing wildcard exports suffice; no per-component export or version edit         |
| `packages/components/cli/registry.json`          | Regenerate; inspect source dependency closure for helper/context files             |
| `packages/components/cli/props.json`             | Regenerate; verify root/item docs and layout/responsive types are comprehensible   |
| `packages/components/README.md`                  | Regenerate package surface and test coverage; add usage guidance only where useful |
| `.changeset/<descriptive-name>.md`               | Minor change for `@zentauri-ui/zentauri-components` when implementation ships      |

Document `@default` values in public prop JSDoc. Verify the props generator discovers the constrained polymorphic props and helper unions; add a targeted generator fixture only if extraction needs an adjustment. Do not flatten or hand-edit generated props JSON to hide a generator issue.

The source-vendoring CLI must include `grid-context.ts` and `grid-layout.ts`, rewrite imports correctly, and preserve the token/utils dependencies. Verify this in a temporary consumer fixture using the existing CLI test conventions. Add a registry-generator test only if the new structure exposes a missing dependency case.

Installation examples should distinguish package subpath imports from `zentauri-ui add grid` vendoring. Include the consumer Tailwind `@source` requirement with the correct path for the consumer's stylesheet location.

### Current-checkout differences from AGENTS.md

The supplied AGENTS.md lists manual search registration and manual test-health totals. Source inspection found that `lib/site-search-entries.ts` derives entries from sidebar data, and `scripts/update-test-health.mjs` updates both READMEs plus `components/home/marketing/package-health-data.ts`. CI verifies these generated outputs. The former `home-package-health.tsx` path is absent in this checkout; the display is `package-health.tsx`.

Preserve the intended requirement that all search and health surfaces are updated. Use the current generators and verify their output, consistent with the requested add-component skill; do not create a duplicate search entry or edit a generated count. Record the documentation discrepancy for maintainers, and recheck these paths before implementation rather than assuming the repository has remained unchanged.

The current facade list also omits some shipped components, including Bento Grid. Grid must be explicitly registered and tested even if an older component missed that step. Fixing unrelated discovery omissions is outside this component's scope.

## 10. Documentation and preview plan

Create the following under `apps/component-library`:

```text
app/preview/components/grid/page.tsx
content/seo/preview/components/grid.json
components/css-variables/data/grid.ts
components/preview/grid/
  index.tsx
  sections/
    grid-hero-section.tsx
    grid-playground-section.tsx
    grid-code-examples-section.tsx
    grid-props-section.tsx
    grid-installation-section.tsx
    grid-css-variables-section.tsx
  components/
    grid-code-examples.data.ts
    grid-code-examples.snippets.ts
    grid-code-examples-demo.tsx
    grid-playground.tsx
    grid-playground.data.ts
```

Use `getPreviewSeo("grid")` for route metadata. Before writing Next.js route code, read the relevant installed Next.js 16 guide under `node_modules/next/dist/docs/`, as required by AGENTS.md.

Register:

- SEO import/document in `lib/preview-seo-registry.ts`.
- Layout navigation in `components/sidebar/sidebar-data.ts`.
- Introduction card with a Layout badge in `components/introduction/data.ts`.
- `grid` in `lib/home-install-commands.ts`; it is broadly useful enough to include.
- CSS-variable reference in `components/css-variables/reference-data.ts`.
- Verify search discovers the sidebar-derived entry; no duplicate manual search object.

### Interactive playground

The playground should make flexibility understandable:

- Choose fixed, auto-fit, auto-fill, or a predefined custom-area recipe.
- Set fixed column count, minimum item width, gaps, and axis overrides.
- Switch between two typed responsive presets and an unresponsive layout.
- Resize a preview wrapper independently of the viewport to show intrinsic auto sizing. Explain that viewport maps still depend on viewport width.
- Adjust a selected item's spans/starts, appearance, padding, and alignment where supported by the active mode.
- Add, remove, and filter sample items with stable keys.
- Show nested content with links/buttons/inputs to demonstrate composition.
- Provide reset and current-code controls; code must reproduce the displayed configuration.
- Show every supported appearance in a selectable gallery, with light/dark review.

Use the project's existing controls. Selector cards must support pointer, Enter, and Space, with selected state exposed appropriately. Use semantic controls where possible; a card using `role="button"` needs `tabIndex={0}` and keyboard handlers. Keep nested controls outside native button wrappers.

Follow the existing `<p>` labels above `PreviewCodeShowcase` rows. Generate snippets from typed playground options instead of maintaining a second, drifting configuration model.

### Props and token reference

Use the generated props manifest through existing docs helpers. Describe the complete layout/responsive unions, precedence, auto-span restriction, and explicit reset behavior; a short props table alone is insufficient.

For the new CSS-variable reference, list every public light token and its paired dark token. Set `darkVariableCount` to the actual supported total. Do not count private configuration variables as public theme tokens. Verify the inventory against source, not a guessed palette multiplier.

### SEO/documentation questions to answer

What does dynamic mean? How does Grid differ from Bento Grid and DataTable? Can it work without Framer Motion? Are breakpoints viewport-based? Can it adapt inside a narrow parent? What do auto-fit and auto-fill do? How do spans behave on mobile? How do named areas affect reading order? Is drag/resize available? What Tailwind source configuration is needed?

## 11. Test and verification strategy

Use focused behavioral tests. Avoid asserting every implementation string if a smaller set of contract assertions proves the behavior. CSS layout needs real-browser verification; jsdom cannot prove track sizes or responsive activation.

| Layer               | Meaningful coverage                                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pure layout helpers | Mode discrimination, base/default resolution, missing breakpoints, insertion-order independence, numeric normalization, per-breakpoint fixed span/start clamping, auto restrictions, area validation and clearing |
| Component behavior  | Default neutral wrappers, root/item slots, native selected-element refs/events, valid `0` content, empty children, style/class composition, all appearance variants, padding/gap selection                        |
| Composition         | Nearest-root context, nested variable isolation, raw children, direct item placement, rerenders with changed layout/children, outside-root behavior                                                               |
| Responsive contract | Complete effective maps and resets, layout changes forcing item normalization, independent axis precedence, theme-variable references in light/dark                                                               |
| Type fixtures       | Valid semantic tags/refs, invalid tag/prop combinations, discriminated layout modes, required responsive base, exported variant/type surface                                                                      |
| Accessibility       | Axe fixture for semantic list/section composition and native child keyboard sequence; advanced layout reviewed for source-order meaning                                                                           |
| Discovery/metadata  | Facade lookup/options/tokens, registry dependency closure, generated root/item props, actual static export availability                                                                                           |
| Real browser        | Track widths, narrow auto grids, sparse fit/fill, breakpoint transitions, areas, item clamping, custom breakpoints, nested roots, dark overrides, RTL, zoom, hydration                                            |

Integrate accessibility fixtures with the existing `src/accessibility` tests where appropriate; do not build a parallel test framework. Reuse existing CLI/generator test infrastructure.

### Initial implementation checks

After source/test files exist, use the configured Node environment (`nvm use`) and pnpm 9. Start with:

```sh
pnpm --filter @zentauri-ui/zentauri-components exec vitest run \
  src/ui/grid/grid-layout.test.ts src/ui/grid/grid.test.tsx src/lib/facade.test.ts
pnpm --filter @zentauri-ui/zentauri-components check-types
pnpm --filter @zentauri-ui/zentauri-components generate:registry
pnpm --filter @zentauri-ui/zentauri-components generate:props
pnpm --filter @zentauri-ui/zentauri-components generate:surface
pnpm --filter @zentauri-ui/zentauri-components check:tokens
pnpm --filter @zentauri-ui/zentauri-components check:props
pnpm --filter @zentauri-ui/zentauri-components check:surface
```

After the component/docs contract is stable:

```sh
pnpm --filter @zentauri-ui/zentauri-components build
pnpm --filter @zentauri-ui/zentauri-components check:exports
pnpm --filter component-library check-types
pnpm --filter @zentauri-ui/zentauri-components update:test-health
git diff --check
```

`update:test-health` runs the full component-package Vitest suite before updating coverage totals. Schedule it at the integration milestone; do not rerun it for every small source edit. Inspect its README/per-suite and docs data diffs. Run affected docs/CLI/accessibility tests when their files change. Broader repository verification remains the existing CI/release requirement.

Visually inspect the live docs preview in light/dark mode, all appearances, mobile/desktop viewports, and narrow embedded wrappers. Use a real-browser fixture to verify the responsive compiler and package source-scanning contract, including a consumer-customized breakpoint. Confirm vendored source behaves the same way.

## 12. Optional animation milestone

Animation is useful for filtered collections and dashboard reflow, but the first release's layout contract should ship independently.

When scheduled, add `animated/animations.ts`, `animated/types.ts`, `animated/grid-animated.tsx`, and `animated/index.ts`, plus focused animation/reduced-motion tests. Export `GridAnimated` and `GridItemAnimated` from `@zentauri-ui/zentauri-components/ui/grid/animated`; document their correspondence with the static root/item.

Requirements:

- Only the animated entry imports Framer Motion. Register `grid` in `uiAnimatedComponentNames` at that milestone.
- Preserve the static props/placement/semantic contract; refactor only shared neutral helpers, not motion code into the static path.
- Stable React keys establish item identity. Introduce an additional ID prop only if a real animation requirement needs it.
- Keep item exit presence management in the animated root; layout stays in normal CSS Grid flow.
- Disable movement and stagger with `useReducedMotion`; content changes still occur immediately.
- Use short position/layout transitions and optional opacity. Avoid animation that blocks input or hides content awaiting viewport observation.
- Test exit behavior, nested roots, key changes, semantically selected tags, and interaction with resized containers.
- Do not promise all CSS template changes will interpolate smoothly; prove supported reflow cases in browsers and document limits.
- Regenerate registry/props/surface/test-health output and include an appropriate Changeset for the newly published entry.

## 13. Interactive dashboard-layout milestone

Dragging/resizing is a different stateful contract and should receive its own design before implementation. Decide whether it belongs in a separate component/subpath or a composition layer over Grid.

Required design inputs before scheduling:

- A controlled layout model with stable widget IDs and coordinates/spans, including breakpoint-specific layouts.
- `layout`/`defaultLayout` ownership, change/commit callbacks, and stale-update handling.
- Minimum/maximum dimensions, collision and compaction rules, disabled/locked items, and bounds.
- Dedicated drag/resize handles that do not intercept widget controls.
- Pointer, touch, keyboard move/resize controls, and screen-reader announcements.
- Focus preservation, undo/reset, and reduced-motion behavior.
- External serialization/versioning; no built-in localStorage side effects by default.
- Dependency/bundle review against existing sortable behavior and any candidate interaction engine.
- A plain Grid fallback that still renders useful content without the editor layer.

Do not implement two-dimensional drag sorting by merely applying SortableList's API to a grid. Two-dimensional collisions, sizing, and keyboard behavior require separate decisions.

## 14. Delivery sequence and acceptance gates

| Milestone                     | Work                                                                                                                           | Gate before moving forward                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| A: API and feasibility        | Finalize names/defaults; prove responsive CSS/private variables, normalization, polymorphic types, and generator compatibility | Three useful recipes plus the section 5 spike succeed                             |
| B: Static package core        | Tokens, CVA, types, helpers/context, root/item, exports, targeted tests                                                        | Fixed/auto/custom behavior and nested isolation pass without viewport measurement |
| C: Discovery and distribution | Facade, build list, registry, props/surface generation, CLI consumer fixture                                                   | Package subpath and vendored imports both work; public token discovery complete   |
| D: Docs and visual review     | Route, SEO, examples, playground/gallery, tokens, sidebar/introduction/install registration                                    | Every supported option is demonstrated and discoverable; snippets match output    |
| E: Release verification       | Browser/type/accessibility checks, generated test health, minor Changeset, normal CI                                           | No unverified responsive or distribution behavior; complete handoff checklist     |
| F: Optional motion            | Separate animated entry and reduced-motion support                                                                             | No static dependency leak; actual reflow cases proved                             |
| G: Dashboard editing          | Separate state/interaction design and implementation                                                                           | Controlled-state and keyboard/assistive interaction contract accepted and tested  |

Milestones A–E define the first shippable component. F and G are independent follow-up work, not prerequisites hidden inside an unbounded “highly flexible” scope. Estimate effort after the responsive styling spike; the main uncertainty is CSS delivery and metadata/type compatibility rather than drawing the grid.

## 15. Risks and decisions to watch

| Risk                                                | Mitigation / decision                                                                          |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Duplication of Bento Grid                           | Keep neutral responsive layout central; do not copy expansion/detail interactions              |
| Too many convenience props                          | Use a discriminated `layout`, a small placement set, and `style` for advanced CSS              |
| Tailwind omits runtime-generated utilities          | Literal utility maps plus consumer scanning/CLI verification                                   |
| Stale variables after a mode change                 | Resolve complete maps with explicit clearing values                                            |
| Nested configurations bleed through CSS inheritance | Nearest-root context and local resets for every private variable                               |
| Fixed spans create unintended mobile columns        | Normalize against each effective breakpoint layout                                             |
| Auto mode cannot know its column count              | Restrict numeric wide spans/starts; support full width without measurement                     |
| Dense/area placement confuses keyboard users        | Ordinary row default, explicit advanced placement, meaningful source-order examples            |
| New dark tokens miss runtime spacing paths          | Verify dark geometry overrides, not only surface colors                                        |
| Polymorphic/union props produce poor generated docs | Typed fixture and props-generator spike before freezing API                                    |
| Custom CSS cannot be completely validated           | Clearly distinguish the typed convenience contract from the consumer CSS escape hatch          |
| Drag/resize inflates the component                  | Separate follow-up design with a controlled state model                                        |
| Documentation lists outdated integration paths      | Recheck current sources; satisfy discovery and test-health requirements via current generators |

## 16. Definition of done for the first release

- [x] The three adoption recipes justify a general Grid alongside Bento Grid.
- [x] Public defaults, responsive inheritance, gap/style precedence, and mode resets are documented.
- [x] Fixed, auto-fit, auto-fill, and custom-area layouts work in real browsers.
- [x] Mobile placement and nested configurations behave as specified.
- [x] Static entry imports no Framer Motion or other new layout dependency.
- [x] Root/item refs, native props, semantic tag types, and valid ReactNode values work.
- [x] No automatic ARIA grid roles or extra tab stops; accessibility review passes.
- [x] Every shipped appearance and public token has complete light/dark fallbacks and documentation.
- [x] Design-system export, facade slug/tests, build entry, CLI registry, props, and package surface are current.
- [x] Package and vendored consumption both pass their focused checks.
- [x] Docs route, SEO, playground, all-appearance gallery, examples, props, tokens, and navigation work.
- [x] Introduction/home install registration is present; sidebar-derived search finds Grid.
- [x] README coverage/per-suite snapshots and docs health data match the generated report.
- [x] A minor Changeset exists for the implementation; no manual package version/changelog edits.
- [x] Focused local verification, visual review, and `git diff --check` pass. Standard CI remains the normal PR gate.
- [x] Remaining animation/dashboard features are described as follow-ups without unsupported public props.

## 17. Reference material

Repository delivery requirements: [AGENTS.md](../../AGENTS.md), [CONTRIBUTING.md](../../CONTRIBUTING.md), [component creation guide](../component-creation-guide.md), and the [requested skill](../../.claude/skills/add-component/SKILL.md).

Existing implementation references: [Bento Grid types](../../packages/components/src/ui/bento-grid/types.ts), [Bento Grid base](../../packages/components/src/ui/bento-grid/bento-grid-base.tsx), [Bento Grid tokens](../../packages/components/src/design-system/bento-grid.ts), [facade](../../packages/components/src/lib/facade.ts), [test-health generator](../../packages/components/scripts/update-test-health.mjs), [search derivation](../../apps/component-library/lib/site-search-entries.ts), and [CI verification](../../.github/workflows/ci.yml).

External primary documentation is linked at the relevant technical decisions above. Browser support for any later container-query or animation feature must be checked when that milestone is implemented; this plan makes no support guarantee for deferred functionality.

## 18. Initial implementation verification

The static entry is available at `@zentauri-ui/zentauri-components/ui/grid`. It exports `Grid`, `GridItem`, their public types, and CVA variant functions. The docs preview is `/preview/components/grid`. No animated entry or drag/resize API is published by this change.

Local verification on 6 October 2026:

- Initial component-package test-health run: **152 suites / 1,607 tests passed**, including 69 added cases across Grid, facade, CLI, and generated props coverage.
- Relevant docs tests: **3 suites / 7 tests passed**.
- Component-package and docs type checks, token audit, generated props/surface checks, targeted ESLint, package build, and export smoke check passed.
- Public token inventory: **95 light/dark pairs**, with every referenced token present in the CSS-variable reference.
- Browser verification covered mobile/desktop column counts, named-area placement and resets, narrow auto containers, sparse auto-fit versus auto-fill, nested grids, keyboard gallery selection, and all appearance surfaces in both themes.
- A fixture using the built package and consumer Tailwind CSS confirmed that an overridden `md=55rem` breakpoint changed from one column at an 800px viewport to three at 900px, with spans clamped accordingly. The same fixture resolved a 12px light gap and 28px dark gap from wrapper token overrides.

The implementation uses four item placement longhands rather than a `grid-area` shorthand so CSS declaration order cannot reset active spans. Native element props are represented as discriminated unions to retain selected-element ref types. The preview explicitly supplies inherited text colors for neutral surfaces in both themes.

Publishing and the repository-wide CI pipeline are separate release/PR steps; neither is claimed as completed by this local implementation record.

## 19. Mobile stacking default

Items now stack one per row below the consumer's Tailwind `sm` breakpoint (640px by default). Layout inheritance is resolved before replacing the mobile layout, so the declared base descriptor and item placement resume at `sm` unless that breakpoint supplies another descriptor. Stacking resets named areas, explicit rows, column/row starts, and column/row spans to avoid gaps or implicit extra columns. Spacing, surfaces, and implicit row sizing remain configurable.

Set `stackOnMobile={false}` on a Grid to retain its configured mobile layout. Each nested Grid owns its setting independently. Consumer `style` overrides still take precedence. The playground exposes a checked-by-default “Stack on mobile” control and includes its value in the generated code.

Mobile update verification: the full component-package test-health run passed **152 suites / 1,616 tests**, including nine new cases for default stacking across layout modes, restoration at `sm`, row and area resets, runtime toggling, and independent nested settings. Package build, both workspace type checks, token and generated-props audits, and the export smoke check passed.

Browser checks passed for fixed, auto-fit, auto-fill, and named-area layouts at 390px, including mobile placement resets and the opt-out restoring configured tracks. The 639px/640px boundary restored named areas at the standard `sm` breakpoint. Light/dark mobile checks and a rendered screenshot confirmed six full-width items in six separate rows.
