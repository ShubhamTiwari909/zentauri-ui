# @zentauri-ui/zentauri-components

[![npm version](https://img.shields.io/npm/v/@zentauri-ui/zentauri-components)](https://www.npmjs.com/package/@zentauri-ui/zentauri-components)
[![npm downloads](https://img.shields.io/npm/dm/@zentauri-ui/zentauri-components)](https://www.npmjs.com/package/@zentauri-ui/zentauri-components)

A React UI kit for building product interfaces with Tailwind CSS. Components are implemented in TypeScript, ship with declaration files, and are bundled as ESM and CommonJS for broad bundler compatibility.

## Overview

The library targets **React 18+** apps that use **Tailwind CSS v4** (or an equivalent setup where Tailwind can scan this package via `@source`). Styling uses utility classes; **class-variance-authority** powers variant APIs (size, appearance, and similar props), with **clsx** and **tailwind-merge** for predictable `className` composition. Component variants are light-theme ready by default and include paired `dark:` Tailwind classes for dark-mode surfaces, text, borders, focus rings, gradients, and form controls. **Framer Motion** backs motion where a feature ships animated variants, and **react-icons** is used for iconography where applicable.

Published artifacts live under `dist/`. Imports use **per-entry subpaths**: `@zentauri-ui/zentauri-components/ui/<area>` for static UI, `@zentauri-ui/zentauri-components/ui/<area>/animated` where a motion bundle exists, `@zentauri-ui/zentauri-components/animations/<name>` for standalone Motion wrappers, `@zentauri-ui/zentauri-components/charts/<type>` for Recharts-powered chart primitives, and `@zentauri-ui/zentauri-components/hooks/<entry>` for React hooks (and shared helpers under `hooks/utils`). Base UI entries do **not** re-export animated components; motion lives on its own entry so optional `framer-motion` usage stays tree-shakeable and chunk-friendly. Each entry resolves to its own ESM (`.mjs`), CJS (`.js`), and types (`.d.ts`) so bundlers pull only what you import. Most apps rely on Tailwind scanning the package sources (see installation); a separate CSS import is not required for that setup.

## Current package surface

| Surface             | Count | Import shape                                          |
| ------------------- | ----: | ----------------------------------------------------- |
| Static UI entries   |    43 | `@zentauri-ui/zentauri-components/ui/<name>`          |
| Animated UI entries |    27 | `@zentauri-ui/zentauri-components/ui/<name>/animated` |
| Animation entries   |    41 | `@zentauri-ui/zentauri-components/animations/<name>`  |
| Chart entries       |     9 | `@zentauri-ui/zentauri-components/charts/<type>`      |
| Hook entries        |    28 | `@zentauri-ui/zentauri-components/hooks/<entry>`      |

`spinner` is the only animated-only UI area. Import it from `@zentauri-ui/zentauri-components/ui/spinner/animated`; there is no `@zentauri-ui/zentauri-components/ui/spinner` static entry.

## Package status and test coverage

Generated from the component package Vitest JSON report via `pnpm --filter @zentauri-ui/zentauri-components update:test-health`.

| Metric     | Result           |
| ---------- | ---------------- |
| Test files | 100 passed (100)   |
| Tests      | 836 passed (836) |

| Area                           | Test files | Tests |
| ------------------------------ | ---------- | ----- |
| Components and UI utilities    | 51         | 531   |
| Standalone animations          | 1          | 45    |
| React hooks                    | 41         | 174   |
| Design system facade           | 1          | 11    |
| CLI and import rewriting       | 4          | 33    |
| Accessibility (axe + keyboard) | 2          | 42    |

### Per-suite snapshot

| Suite                                                                   | Tests |
| ----------------------------------------------------------------------- | ----: |
| `src/animations/animations.test.tsx`                                    |    45 |
| `src/ui/buttons/button.test.tsx`                                        |    44 |
| `src/ui/inputs/input.test.tsx`                                          |    40 |
| `src/ui/audio-player/audio-player.test.tsx`                             |    34 |
| `src/ui/peer-isolation.test.ts`                                         |    30 |
| `src/accessibility/axe-core.test.tsx`                                   |    24 |
| `src/ui/combobox/combobox.test.tsx`                                     |    24 |
| `cli/cli.integration.test.ts`                                           |    21 |
| `src/accessibility/keyboard-interaction.test.tsx`                       |    18 |
| `src/ui/pagination/pagination.test.tsx`                                 |    15 |
| `src/ui/timeline/timeline.test.tsx`                                     |    14 |
| `src/ui/data-table/data-table.test.tsx`                                 |    13 |
| `src/ui/context-menu/context-menu.test.tsx`                             |    12 |
| `src/lib/facade.test.ts`                                                |    11 |
| `src/ui/alert/alert.test.tsx`                                           |    11 |
| `src/ui/rating/rating.test.tsx`                                         |    11 |
| `src/ui/select/select.test.tsx`                                         |    11 |
| `src/ui/split-button/split-button.test.tsx`                             |    11 |
| `src/ui/table/table.test.tsx`                                           |    11 |
| `src/hooks/usePagination/usePagination.test.ts`                         |    10 |
| `src/ui/marquee/marquee.test.tsx`                                       |    10 |
| `src/ui/modal/modal.test.tsx`                                           |    10 |
| `src/ui/otp-input/otp-input.test.tsx`                                   |    10 |
| `src/ui/tree-view/tree-view.test.tsx`                                   |    10 |
| `src/hooks/useLongPress/useLongPress.test.ts`                           |     9 |
| `src/hooks/useTableFilter/useTableFilter.test.ts`                       |     9 |
| `src/ui/animated-number/animated-number.test.tsx`                       |     9 |
| `src/ui/skeleton/skeleton.test.tsx`                                     |     9 |
| `src/ui/slider/slider.test.tsx`                                         |     9 |
| `src/ui/typing-indicator/typing-indicator.test.tsx`                     |     9 |
| `src/ui/command/command.test.tsx`                                       |     8 |
| `src/ui/copy-button/copy-button.test.tsx`                               |     8 |
| `src/ui/dynamic-stepper/dynamic-stepper.test.tsx`                       |     8 |
| `src/ui/progress/progress.test.tsx`                                     |     8 |
| `src/ui/scroll-area/scroll-area.test.tsx`                               |     8 |
| `src/ui/spinner/animated/spinner.test.tsx`                              |     8 |
| `cli/rewrite-imports.test.ts`                                           |     7 |
| `src/hooks/useDynamicStepper/useDynamicStepper.test.ts`                 |     7 |
| `src/hooks/useHotkeys/useHotkeys.test.ts`                               |     7 |
| `src/hooks/useTableSort/useTableSort.test.ts`                           |     7 |
| `src/ui/accordion/accordion.test.tsx`                                   |     7 |
| `src/ui/card/card.test.tsx`                                             |     7 |
| `src/ui/code-diff/code-diff.test.tsx`                                   |     7 |
| `src/ui/drawer/drawer.test.tsx`                                         |     7 |
| `src/ui/kbd/kbd.test.tsx`                                               |     7 |
| `src/ui/typography/typography.test.tsx`                                 |     7 |
| `src/charts/charts.test.tsx`                                            |     6 |
| `src/hooks/useClipboard/useClipboard.test.ts`                           |     6 |
| `src/hooks/useCountdown/useCountdown.test.ts`                           |     6 |
| `src/hooks/useGeolocation/useGeolocation.test.ts`                       |     6 |
| `src/hooks/useIdleTimeout/useIdleTimeout.test.ts`                       |     6 |
| `src/hooks/useKeyPress/useKeyPress.test.ts`                             |     6 |
| `src/hooks/useLocalStorage/useLocalStorage.test.ts`                     |     6 |
| `src/hooks/useVirtualList/useVirtualList.test.ts`                       |     6 |
| `src/ui/badge/badge.test.tsx`                                           |     6 |
| `src/ui/checkbox/checkbox.test.tsx`                                     |     6 |
| `src/ui/divider/divider.test.tsx`                                       |     6 |
| `src/ui/dropdown/dropdown.test.tsx`                                     |     6 |
| `src/ui/empty-state/empty-state.test.tsx`                               |     6 |
| `src/ui/search/filter-search-suggestions.test.ts`                       |     6 |
| `src/ui/toast/toast.test.tsx`                                           |     6 |
| `src/hooks/useCookie/useCookie.test.ts`                                 |     5 |
| `src/hooks/useDisclosure/useDisclosure.test.ts`                         |     5 |
| `src/hooks/useEventListener/useEventListener.test.ts`                   |     5 |
| `src/hooks/useScrollPosition/useScrollPosition.test.ts`                 |     5 |
| `src/hooks/useTimeout/useTimeout.test.ts`                               |     5 |
| `src/ui/popover/popover.test.tsx`                                       |     5 |
| `src/ui/radio-group/radio-group.test.tsx`                               |     5 |
| `src/ui/toggle/toggle.test.tsx`                                         |     5 |
| `cli/index.test.ts`                                                     |     4 |
| `src/hooks/useBodyScrollLock/useBodyScrollLock.test.ts`                 |     4 |
| `src/hooks/useControllableState/useControllableState.test.ts`           |     4 |
| `src/hooks/useDebouncedValue/useDebouncedValue.test.ts`                 |     4 |
| `src/hooks/useInterval/useInterval.test.ts`                             |     4 |
| `src/hooks/useThrottledCallback/useThrottledCallback.test.ts`           |     4 |
| `src/hooks/useToggle/useToggle.test.ts`                                 |     4 |
| `src/ui/avatar/avatar.test.tsx`                                         |     4 |
| `src/ui/breadcrumb/breadcrumb.test.tsx`                                 |     4 |
| `src/ui/file-upload/file-upload.test.tsx`                               |     4 |
| `src/ui/tabs/tabs.test.tsx`                                             |     4 |
| `src/ui/tooltip/tooltip.test.tsx`                                       |     4 |
| `src/hooks/useClickOutside/useClickOutside.test.tsx`                    |     3 |
| `src/hooks/useDocumentTitle/useDocumentTitle.test.ts`                   |     3 |
| `src/hooks/useFocusManagement/useFocusManagement.test.tsx`              |     3 |
| `src/hooks/useIsMounted/useIsMounted.test.ts`                           |     3 |
| `src/hooks/usePrevious/usePrevious.test.ts`                             |     3 |
| `src/hooks/useSessionStorage/useSessionStorage.test.ts`                 |     3 |
| `src/hooks/useHover/useHover.test.ts`                                   |     2 |
| `src/hooks/useIntersectionObserver/useIntersectionObserver.test.ts`     |     2 |
| `src/hooks/useMediaQuery/useMediaQuery.test.ts`                         |     2 |
| `src/hooks/useNetworkStatus/useNetworkStatus.test.ts`                   |     2 |
| `src/hooks/useResizeObserver/useResizeObserver.test.ts`                 |     2 |
| `cli/props.test.ts`                                                     |     1 |
| `src/hooks/useInView/useInView.test.ts`                                 |     1 |
| `src/hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.test.ts` |     1 |
| `src/hooks/usePageVisibility/usePageVisibility.test.ts`                 |     1 |
| `src/hooks/usePrefersColorScheme/usePrefersColorScheme.test.ts`         |     1 |
| `src/hooks/usePrefersReducedMotion/usePrefersReducedMotion.test.ts`     |     1 |
| `src/hooks/useWindowSize/useWindowSize.test.ts`                         |     1 |
| `src/ui/search/search-suggestion-utils.test.ts`                         |     1 |

## Package exports

| Subpath                                               | Description                                                                                                                                                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@zentauri-ui/zentauri-components/ui/<name>`          | Single UI area: static primitives, compound parts, variants, and types. Does **not** include Framer Motion–based animated exports.                                                         |
| `@zentauri-ui/zentauri-components/ui/<name>/animated` | Motion entry for that area when published: animated components, motion presets, and related types (depends on **framer-motion**).                                                          |
| `@zentauri-ui/zentauri-components/animations/<name>`  | Standalone Motion wrapper and preset entry for reusable transitions such as `fade-in`, `scale-in`, and `blur-out` (depends on **framer-motion**).                                          |
| `@zentauri-ui/zentauri-components/charts/<type>`      | Responsive Recharts chart entry for `area`, `bar`, `stacked-bar`, `radar`, `scatter`, `bubble`, `funnel`, `line`, or `pie`, with shared variants, palettes, and exported chart prop types. |
| `@zentauri-ui/zentauri-components/hooks/<entry>`      | One hook module or `utils` (`cn`, `clampPage`, `range` from `src/lib/utils.ts`). Entries match files under `src/hooks/` (see **React hooks**).                                             |

The UI `<name>` segment matches the folder under `src/ui/` (for example `accordion`, `select`, `empty-state`, `buttons` for `Button`, `inputs` for `Input`, `typography` for `Heading` / `Text` and related primitives). The hooks `<entry>` is the file stem (for example `useMediaQuery`, `usePagination`) or `utils`.

Only a subset of UI areas publish a `/animated` entry (see **Components**). Some motion entries also re-export non-motion pieces from the same feature so you can import one motion subpath for a whole flow; others pair a base `ui/<name>` import with a small set of `*Animated` exports from `ui/<name>/animated`—use the `animated/index.ts` for that area as the source of truth.

## Animated components (`ui/<name>/animated`)

- **Why a separate subpath:** animated modules import **framer-motion**. Keeping them on `…/ui/<name>/animated` avoids pulling motion into pages that only use the static `…/ui/<name>` entry and keeps server/client boundaries predictable in app routers.
- **When to install `framer-motion`:** add it when your app imports any `@zentauri-ui/zentauri-components/ui/*/animated` path (see **Optional: animations, icons, and charts** under installation).

Published motion entries (same `<name>` as the base UI folder):

`accordion`, `alert`, `avatar`, `badge`, `buttons`, `card`, `checkbox`, `command`, `copy-button`, `divider`, `drawer`, `empty-state`, `inputs`, `kbd`, `modal`, `popover`, `progress`, `radio-group`, `skeleton`, `spinner`, `table`, `tabs`, `timeline`, `toast`, `toggle`, `tooltip`, `tree-view`

**Spinner:** only the motion entry is built—import from `@zentauri-ui/zentauri-components/ui/spinner/animated` (there is no separate `ui/spinner` static bundle).

## Animations

Standalone animations live outside `ui/*` under `@zentauri-ui/zentauri-components/animations/<name>`. They are small **framer-motion** wrappers around `motion.div`, designed for composing page sections, cards, panels, list items, and route-level content without coupling the motion preset to a UI primitive.

**Animation entries:** `fade-in`, `fade-out`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `scale-in`, `scale-out`, `pop-in`, `blur-in`, `blur-out`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `reveal-up`, `reveal-down`, `reveal-left`, `reveal-right`, `reveal-blur`, `text-reveal`, `text-shimmer`, `rotate-in`, `pulse`, `ping`, `shake`, `bounce`, `wiggle`, `float`, `spin`, `flip`, `flip-in`, `tilt`, `magnetic`, `hover-lift`, `hover-scale`, `press`, `reorder`, `skeleton-shimmer`, `progress`, `parallax`.

Each entry exports a named component and its preset object, for example `FadeIn` and `fadeInPreset`. Components accept regular `HTMLMotionProps<"div">`, so you can pass `className`, `transition`, `initial`, `animate`, `exit`, and accessibility attributes directly.

For lighter customization without replacing the whole Motion target, pass `from`, `to`, and `exitTo`. These override preset values for `opacity`, `x`, `y`, `scale`, `scaleX`, `scaleY`, `rotate`, `rotateX`, `rotateY`, and `blur`.

```tsx
import { FadeIn } from "@zentauri-ui/zentauri-components/animations/fade-in";
import { ScaleIn } from "@zentauri-ui/zentauri-components/animations/scale-in";

export function MotionPanel() {
  return (
    <FadeIn className="rounded-xl border border-white/10 bg-white/5 p-4">
      <ScaleIn
        from={{ scale: 0.92, blur: 8 }}
        to={{ scale: 1, blur: 0 }}
        transition={{ duration: 0.2 }}
      >
        Content with a nested scale entrance.
      </ScaleIn>
    </FadeIn>
  );
}
```

## Requirements

- **React** and **React DOM** `>= 18` (peer dependencies)
- A Tailwind pipeline that can **scan** this package (see Step 3 below)
- Tailwind dark-mode support through the standard `dark:` variant (`class` / selector or media strategy, depending on your app)

## Components

Import static primitives from `@zentauri-ui/zentauri-components/ui/<subpath>` when the **Base** column lists a path. Charts use `@zentauri-ui/zentauri-components/charts/<type>`. When the **Animated** column lists a path, motion components and preset helpers come from `@zentauri-ui/zentauri-components/ui/<subpath>/animated` (they are not exported from the base entry). **Spinner** has no static bundle—use only the animated subpath.

| Area            | Base subpath      | Animated subpath `…/ui/…/animated` |
| --------------- | ----------------- | ---------------------------------- |
| Accordion       | `accordion`       | `accordion/animated`               |
| Alert           | `alert`           | `alert/animated`                   |
| Animated number | `animated-number` | —                                  |
| Avatar          | `avatar`          | `avatar/animated`                  |
| Badge           | `badge`           | `badge/animated`                   |
| Breadcrumb      | `breadcrumb`      | —                                  |
| Button          | `buttons`         | `buttons/animated`                 |
| Card            | `card`            | `card/animated`                    |
| Checkbox        | `checkbox`        | `checkbox/animated`                |
| Charts          | `charts/<type>`   | —                                  |
| Command         | `command`         | `command/animated`                 |
| Context menu    | `context-menu`    | —                                  |
| Copy button     | `copy-button`     | `copy-button/animated`             |
| DataTable       | `data-table`      | —                                  |
| Divider         | `divider`         | `divider/animated`                 |
| Drawer          | `drawer`          | `drawer/animated`                  |
| Dropdown        | `dropdown`        | —                                  |
| Dynamic stepper | `dynamic-stepper` | —                                  |
| Empty state     | `empty-state`     | `empty-state/animated`             |
| File upload     | `file-upload`     | —                                  |
| Input           | `inputs`          | `inputs/animated`                  |
| Kbd             | `kbd`             | `kbd/animated`                     |
| Marquee         | `marquee`         | —                                  |
| Modal           | `modal`           | `modal/animated`                   |
| OTP input       | `otp-input`       | —                                  |
| Pagination      | `pagination`      | —                                  |
| Popover         | `popover`         | `popover/animated`                 |
| Progress        | `progress`        | `progress/animated`                |
| Rating          | `rating`          | —                                  |
| Radio group     | `radio-group`     | `radio-group/animated`             |
| Scroll area     | `scroll-area`     | —                                  |
| Search          | `search`          | —                                  |
| Select          | `select`          | —                                  |
| Skeleton        | `skeleton`        | `skeleton/animated`                |
| Slider          | `slider`          | —                                  |
| Spinner         | —                 | `spinner/animated`                 |
| Split button    | `split-button`    | —                                  |
| Table           | `table`           | `table/animated`                   |
| Tabs            | `tabs`            | `tabs/animated`                    |
| Timeline        | `timeline`        | `timeline/animated`                |
| Toast           | `toast`           | `toast/animated`                   |
| Toggle          | `toggle`          | `toggle/animated`                  |
| Tooltip         | `tooltip`         | `tooltip/animated`                 |
| Tree view       | `tree-view`       | `tree-view/animated`               |
| Typography      | `typography`      | —                                  |

## Typography

Import from `@zentauri-ui/zentauri-components/ui/typography`. This entry is **static only** (no `/animated` subpath).

**Components:** `Heading`, `Text`, `List` (with `List.Item`, also exported as `ListItem`), `Blockquote`, `InlineCode`, `CodeBlock`.

**Types:** `HeadingProps`, `TextProps`, `ListProps`, `ListItemProps`, `BlockquoteProps`, `InlineCodeProps`, `CodeBlockProps`, `HeadingLevel`, `TextElement`, `TypographyTone`, `UnorderedMarker`.

**Tone (`tone` prop):** `default`, `muted`, `primary`, `secondary`, `accent`, `destructive`, `info`, `success`, `warning`, `error`, and gradient presets: `gradient-pink-violet`, `gradient-cyan-violet`, `gradient-cyan-blue`, `gradient-cyan-green`, `gradient-cyan-orange`, `gradient-cyan-red`, `gradient-cyan-purple`, `gradient-cyan-pink`. Tones align with kit accent colors (slate / cyan / violet baseline).

**Heading:** `level` is required (`1`–`6`) and picks the semantic tag (`h1`–`h6`). Optional `displayLevel` overrides only the visual scale (still the same tag). Optional `bold`, `italic`, `underline`, `strikethrough`.

**Text:** Optional `as` (`p`, `span`, `div`, `label`; default `p`). `size` is `sm`, `base`, or `lg` (default `base`). Optional `highlight` plus the same emphasis flags as headings where applicable.

**List:** `ordered` renders an `<ol>` (decimal markers); omit or `false` for `<ul>`. Unordered lists accept `marker`: `disc`, `circle`, or `none`.

**Blockquote:** Optional `attribution` renders a footer label (separate from the HTML `cite` attribute).

**Code samples:** `InlineCode` styles inline `code`; `CodeBlock` renders a `pre` with an inner `code` (pass string or fragment children, not another `code` element) and optional `language` for `aria-label`.

**CVA helpers (composition):** `headingLevelVariants`, `textSizeVariants`, `typographyToneVariants`, `unorderedListMarkerVariants`, `orderedListVariants`.

```tsx
import {
  Blockquote,
  CodeBlock,
  Heading,
  InlineCode,
  List,
  Text,
} from "@zentauri-ui/zentauri-components/ui/typography";

export function ArticleIntro() {
  return (
    <>
      <Heading level={2} displayLevel={1} tone="gradient-cyan-violet">
        Feature title
      </Heading>
      <Text as="p" size="sm" tone="muted">
        Supporting copy with <InlineCode tone="accent">inline code</InlineCode>.
      </Text>
      <List marker="disc" tone="default">
        <List.Item>First item</List.Item>
        <List.Item>Second item</List.Item>
      </List>
      <List ordered tone="muted">
        <List.Item>Step one</List.Item>
        <List.Item>Step two</List.Item>
      </List>
      <Blockquote tone="secondary" attribution="Docs">
        Quoted guidance for the reader.
      </Blockquote>
      <CodeBlock language="tsx" tone="muted">
        {`export const app = () => null;`}
      </CodeBlock>
    </>
  );
}
```

## Charts

Import the chart you need from `@zentauri-ui/zentauri-components/charts/<type>`, or vendor it with `zentauri-components add charts/<type>`. It is built on **Recharts**, so install `recharts` when you use these entries.

**Components:** `AreaChart`, `BarChart`, `StackedBarChart`, `RadarChart`, `ScatterChart`, `BubbleChart`, `FunnelChart`, `LineChart`, `PieChart`.

**Types:** `AreaChartProps`, `BarChartProps`, `StackedBarChartProps`, `RadarChartProps`, `ScatterChartProps`, `BubbleChartProps`, `FunnelChartProps`, `LineChartProps`, `PieChartProps`, plus shared `ChartSeries`, `ChartDatum`, `ChartColor`, `ChartMargin`, and `ChartSharedStatic`.

**Chart entries:** `charts/area`, `charts/bar`, `charts/stacked-bar`, `charts/radar`, `charts/scatter`, `charts/bubble`, `charts/funnel`, `charts/line`, `charts/pie`.

**Variants:** `appearance` (`default`, `muted`, `outline`, `glass`) and `density` (`compact`, `comfortable`, `spacious`). Color presets are exported via `chartPalette` and `chartColorValues`.

```tsx
import {
  AreaChart,
  type ChartSeries,
} from "@zentauri-ui/zentauri-components/charts/area";

const data = [
  { month: "Jan", revenue: 4200, signups: 240 },
  { month: "Feb", revenue: 5100, signups: 280 },
  { month: "Mar", revenue: 6800, signups: 360 },
];

const series: ChartSeries[] = [
  { dataKey: "revenue", name: "Revenue", color: "cyan" },
  { dataKey: "signups", name: "Signups", color: "emerald" },
];

export function RevenueChart() {
  return (
    <AreaChart
      xKey="month"
      data={data}
      series={series}
      appearance="outline"
      showLegend
    />
  );
}
```

## Dynamic Stepper

Import the UI from **`@zentauri-ui/zentauri-components/ui/dynamic-stepper`**. This entry is **static only** (no `/animated` subpath) and is the recommended step-flow primitive for guided navigation.

**Component:** `DynamicStepper` — data-driven steps with Previous / Next controls backed by the **Button** component (`buttonAppearance`, `buttonSize`).

**Hook:** `useDynamicStepper` — `@zentauri-ui/zentauri-components/hooks/useDynamicStepper`. Holds a clamped 0-based active step, `goPrevious` / `goNext`, `canGoPrevious` / `canGoNext`, and controlled/uncontrolled wiring (`activeStep`, `defaultActiveStep`, `onActiveStepChange`, `onPrevious`, `onNext`). `DynamicStepper` uses this hook internally.

**Types (UI barrel):** `DynamicStepperProps`, `DynamicStepperStep`, `DynamicStepperOrientation`, `DynamicStepperButtonAppearance`, `DynamicStepperButtonSize`, `DynamicStepperIndicatorSize`, `DynamicStepperIndicatorToneAppearance`, `UseDynamicStepperParams`, `UseDynamicStepperResult`.

**Step items (`steps`):** optional `id`, `title`, `description`, `indicator` (defaults to a 1-based index).

**Indicator tones:** `indicatorCompleteAppearance`, `indicatorCurrentAppearance`, `indicatorUpcomingAppearance` — same keys as **Button** `appearance` except **`gradient-*`** values (defaults: `emerald`, `violet`, `outline`).

**Layout:** `orientation` (`horizontal` | `vertical`), `indicatorSize` (`sm` | `md` | `lg`).

**Stable targeting:** DOM **`id`** suffixes `-previous`, `-next`, `-mapper` (prefixed by React `useId`) and **`data-slot`** keys including `dynamic-stepper-previous`, `dynamic-stepper-next`, `dynamic-stepper-mapper`.

**CVA helpers:** `dynamicStepperRootVariants`, `dynamicStepperMapperVariants`, `dynamicStepperItemVariants`, `dynamicStepperIndicatorVariants`, `dynamicStepperIndicatorToneClass`.

```tsx
import {
  DynamicStepper,
  type DynamicStepperStep,
} from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";
import { useDynamicStepper } from "@zentauri-ui/zentauri-components/hooks/useDynamicStepper";

const steps: DynamicStepperStep[] = [
  { id: "cart", title: "Cart", description: "Review items" },
  { id: "pay", title: "Payment", description: "Enter details" },
];

export function CheckoutFlow() {
  return (
    <DynamicStepper
      steps={steps}
      defaultActiveStep={0}
      buttonAppearance="outline"
      indicatorCompleteAppearance="sky"
      indicatorCurrentAppearance="rose"
      indicatorUpcomingAppearance="outline"
    />
  );
}

/** Headless-only example */
export function useWizardSteps(stepCount: number) {
  return useDynamicStepper({
    stepCount,
    defaultActiveStep: 0,
  });
}
```

## React hooks

Hooks live in `src/hooks/`. Each hook is a separate published entry under `@zentauri-ui/zentauri-components/hooks/<name>` (same pattern as UI areas). Types are exported where the implementation defines them (for example `UseDisclosureResult`, `PaginationPageItem`). For class-name merging and pagination helpers used alongside hooks, import from `@zentauri-ui/zentauri-components/hooks/utils`.

| Hook / module               | Subpath `…/hooks/…`         | Notes (selected exports)                                                                  |
| --------------------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| `useBodyScrollLock`         | `useBodyScrollLock`         | Locks document scroll while open                                                          |
| `useClickOutside`           | `useClickOutside`           | `ClickOutsideEventType`, `UseClickOutsideParams`                                          |
| `useClipboard`              | `useClipboard`              | `UseClipboardResult`                                                                      |
| `useControllableState`      | `useControllableState`      | `UseControllableStateParams`                                                              |
| `useCookie`                 | `useCookie`                 | `CookieOptions`, `UseCookieResult`                                                        |
| `useCountdown`              | `useCountdown`              | `UseCountdownParams`, `UseCountdownResult`                                                |
| `useDebouncedValue`         | `useDebouncedValue`         | Debounced state from a value                                                              |
| `useDisclosure`             | `useDisclosure`             | `UseDisclosureParams`, `UseDisclosureResult`                                              |
| `useDocumentTitle`          | `useDocumentTitle`          | `UseDocumentTitleParams`                                                                  |
| `useDynamicStepper`         | `useDynamicStepper`         | `UseDynamicStepperParams`, `UseDynamicStepperResult` (types also on `ui/dynamic-stepper`) |
| `useEventListener`          | `useEventListener`          | `UseEventListenerTarget` — window / document / element / ref targets                      |
| `useFocusManagement`        | `useFocusManagement`        | Focus trap / focus moves for overlays                                                     |
| `useGeolocation`            | `useGeolocation`            | `UseGeolocationParams`, `UseGeolocationResult`, permission state                          |
| `useHotkeys`                | `useHotkeys`                | `HotkeyHandler`, `UseHotkeysOptions` — `mod+k` style combos                               |
| `useHover`                  | `useHover`                  | Pointer hover state                                                                       |
| `useIdleTimeout`            | `useIdleTimeout`            | `UseIdleTimeoutParams`, `UseIdleTimeoutResult`                                            |
| `useInterval`               | `useInterval`               | Declarative `setInterval`; `null` pauses                                                  |
| `useInView`                 | `useInView`                 | `UseInViewParams`                                                                         |
| `useIntersectionObserver`   | `useIntersectionObserver`   | `UseIntersectionObserverParams`                                                           |
| `useIsomorphicLayoutEffect` | `useIsomorphicLayoutEffect` | `useLayoutEffect` safe for SSR                                                            |
| `useIsMounted`              | `useIsMounted`              | Ref / flag after mount                                                                    |
| `useKeyPress`               | `useKeyPress`               | Held-key boolean for a key or key list                                                    |
| `useLocalStorage`           | `useLocalStorage`           | `UseLocalStorageResult`                                                                   |
| `useLongPress`              | `useLongPress`              | `UseLongPressHandlers`, `UseLongPressOptions`                                             |
| `useMediaQuery`             | `useMediaQuery`             | Match CSS media queries                                                                   |
| `useNetworkStatus`          | `useNetworkStatus`          | Online / offline                                                                          |
| `usePageVisibility`         | `usePageVisibility`         | Document visibility API                                                                   |
| `usePagination`             | `usePagination`             | `buildPaginationItems`, `BuildPaginationItemsParams`, `PaginationPageItem`                |
| `usePrefersColorScheme`     | `usePrefersColorScheme`     | `ColorSchemePreference`                                                                   |
| `usePrefersReducedMotion`   | `usePrefersReducedMotion`   | `prefers-reduced-motion`                                                                  |
| `usePrevious`               | `usePrevious`               | Value from the previous render                                                            |
| `useResizeObserver`         | `useResizeObserver`         | `ElementSize`                                                                             |
| `useScrollPosition`         | `useScrollPosition`         | `ScrollPosition`, `UseScrollPositionParams`                                               |
| `useSessionStorage`         | `useSessionStorage`         | `UseSessionStorageResult`                                                                 |
| `useTableFilter`            | `useTableFilter`            | `TableFilterState`, `UseTableFilterResult`                                                |
| `useTableSort`              | `useTableSort`              | `UseTableSortParams`, `UseTableSortResult`                                                |
| `useThrottledCallback`      | `useThrottledCallback`      | Throttled callback ref                                                                    |
| `useTimeout`                | `useTimeout`                | `UseTimeoutResult` — `clear` / `reset` controls                                           |
| `useToggle`                 | `useToggle`                 | Boolean toggle state                                                                      |
| `useVirtualList`            | `useVirtualList`            | `UseVirtualListParams`, `UseVirtualListResult`, `VirtualItem`                             |
| `useWindowSize`             | `useWindowSize`             | `WindowSize`                                                                              |
| `cn`, `clampPage`, `range`  | `utils`                     | Shared helpers from `src/lib/utils.ts`                                                    |

#### Hook import example

```tsx
import { useDisclosure } from "@zentauri-ui/zentauri-components/hooks/useDisclosure";
import { useDynamicStepper } from "@zentauri-ui/zentauri-components/hooks/useDynamicStepper";
import { useMediaQuery } from "@zentauri-ui/zentauri-components/hooks/useMediaQuery";
import {
  buildPaginationItems,
  usePagination,
} from "@zentauri-ui/zentauri-components/hooks/usePagination";
import { useTableFilter } from "@zentauri-ui/zentauri-components/hooks/useTableFilter";
import { useTableSort } from "@zentauri-ui/zentauri-components/hooks/useTableSort";
import { cn } from "@zentauri-ui/zentauri-components/hooks/utils";
```

Some UI packages re-export the hook that belongs to that component (for example `usePagination` from `@zentauri-ui/zentauri-components/ui/pagination`). **`dynamic-stepper`** exports hook-related **types** only; import **`useDynamicStepper`** from `hooks/useDynamicStepper`. Prefer `hooks/<name>` when you only need the hook without the UI primitives.

## Installation

**Getting started** — Add the package, install peer dependencies so primitives resolve correctly, point Tailwind at the library sources, then import from `ui/<name>` (static), `ui/<name>/animated` (motion, when published), and/or `hooks/<entry>` subpaths.

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

#### Optional: animations, icons, and charts

Add **`framer-motion`** when you import any `@zentauri-ui/zentauri-components/ui/<name>/animated` entry, any `@zentauri-ui/zentauri-components/animations/<name>` entry, or **Spinner** (which is only published under `ui/spinner/animated`). Add **`react-icons`** when using icon sets from that package. Add **`recharts`** when you import any `@zentauri-ui/zentauri-components/charts/<type>` entry or vendor charts with the CLI.

```bash
npm install framer-motion react-icons recharts
```

```bash
pnpm add framer-motion react-icons recharts
```

```bash
yarn add framer-motion react-icons recharts
```

Published `dist/` files **import** these packages; they are **not** vendored inside `@zentauri-ui/zentauri-components`. Static `ui/<name>` bundles do not depend on `framer-motion`; only `ui/<name>/animated` and `animations/<name>` entries do. Chart bundles are isolated to `charts/<type>` entries and depend on `recharts`. Your app installs peers via `dependencies` where needed, and your bundler resolves them from `node_modules`.

### Next.js: smaller route chunks

In **Next.js 13+**, enable [optimizePackageImports](https://nextjs.org/docs/app/api-reference/config/next-config-js/optimizePackageImports) so `framer-motion` and `react-icons` are resolved in a more tree-shakeable way:

```ts
// next.config.ts (example — API may be stable in your Next version)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons", "recharts"],
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

The package ships light-first styles with `dark:` overrides in the same class strings, so Tailwind must see both the base utilities and the dark variant utilities. With Tailwind v4, keep your app's existing dark-mode selector or media setup; the components respond wherever your app activates Tailwind's `dark:` variant.

```tsx
<main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
  <Button appearance="outline">Theme-aware action</Button>
</main>
```

### Optional — Override component CSS variables

Components expose **zui-scoped** CSS variables that you can override in `:root`, `.dark`, or a wrapper element. Each component preview in the [component library](https://zentauri-ui.vercel.app/) lists the variables available for that component.

**Naming:** variables follow `--zui-<component>-<slot?>-<variant?>-<property>-<state?>`. Dark theme values use the **same variable name** with `-dark` appended (for example `--zui-button-secondary-bg-dark` under `.dark`).

```css
:root {
  --zui-button-secondary-bg: #eef2ff;
  --zui-button-secondary-fg: #312e81;
  --zui-input-bg: #ffffff;
  --zui-input-default-border: #c7d2fe;
}

/* Dark theme variables follow the same names with -dark appended. */
.dark {
  --zui-button-secondary-bg-dark: #312e81;
  --zui-button-secondary-fg-dark: #eef2ff;
  /* ...same variables with -dark at the end */
}

/* Scope overrides to one product surface when needed. */
.billing-dashboard {
  --zui-button-default-bg: #0f766e;
  --zui-button-default-bg-hover: #115e59;
}
```

Place these rules in your global stylesheet (for example `globals.css`) after Tailwind’s `@import` so overrides apply before components render.

### Step 4 — Import and use components and hooks

Use **one subpath per UI area** (static and animated are separate entries: `ui/<name>` vs `ui/<name>/animated`), **one subpath per animation**, and **one subpath per hook module** so the bundler resolves only the entries you use.

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
import { AreaChart } from "@zentauri-ui/zentauri-components/charts/area";
```

#### Imports (animated / Framer Motion)

Use the `/animated` subpath for motion components and preset helpers. You can import static and motion entries from the same feature in one file when you compose them (names and re-exports differ per area).

```tsx
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";

import { Spinner } from "@zentauri-ui/zentauri-components/ui/spinner/animated";
```

#### Imports (standalone animations)

```tsx
import { FadeUp } from "@zentauri-ui/zentauri-components/animations/fade-up";
import { BlurIn } from "@zentauri-ui/zentauri-components/animations/blur-in";
```

#### Usage

```tsx
<div className="rounded-3xl border border-slate-900/10 bg-white p-5 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-slate-950/40">
  <Accordion
    type="single"
    defaultValue="item-1"
    appearance="separated"
    size="md"
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>Shipping</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-slate-900 dark:text-slate-300">
          Standard delivery in 3-5 business days. Express options at checkout.
        </p>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Returns</AccordionTrigger>
      <AccordionContent>
        <p className="text-sm text-slate-900 dark:text-slate-300">
          Free returns within 30 days of delivery in original condition.
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
```

## CLI — copy component source into your app

The package ships a small **Node CLI** (`zentauri-components` and `zentauri-ui` point to the same `cli/index.mjs`) that copies **selected** folders from this package’s `src/ui`, `src/animations`, `src/charts`, and `src/hooks` into your repository—similar to shadcn/ui. You keep the files, control paths via `components.json`, and imports are rewritten to your path aliases (`@/components/ui`, `@/components/animations`, `@/hooks`, `@/lib/utils`, and so on).

Which UI folders are valid for `add` is driven by **`cli/registry.json`**: a generated manifest listing every addable directory name (matching `src/ui/<name>`, animation entries like `animations/fade-in`, plus chart entries like `charts/area`) plus optional **`nameAliases`** so the CLI accepts friendly tokens (for example `button` → `buttons`).

### Commands

Call the published binary by name after the package (recommended so `npx` does not treat the first word as a shell command):

```bash
npx @zentauri-ui/zentauri-components init
npx @zentauri-ui/zentauri-components add buttons inputs
npx @zentauri-ui/zentauri-components add animations/fade-in
npx @zentauri-ui/zentauri-components add charts/area charts/line
npx @zentauri-ui/zentauri-components -h
```

**Hooks only** (copy `src/hooks/<name>` into your app, plus sibling hook dependencies such as `useMediaQuery` when needed):

```bash
npx @zentauri-ui/zentauri-components add hook useWindowSize
npx @zentauri-ui/zentauri-components add hook useToggle useDebouncedValue
```

The **`zentauri-ui`** binary is the same entry as **`zentauri-components`**. If `npx` still mis-resolves, pin the package:

```bash
npx --yes --package=@zentauri-ui/zentauri-components zentauri-components init
npx --yes --package=@zentauri-ui/zentauri-components zentauri-components add button
```

From a monorepo checkout you can run the script by path instead of `npx`:

```bash
node node_modules/@zentauri-ui/zentauri-components/cli/index.mjs init
node node_modules/@zentauri-ui/zentauri-components/cli/index.mjs add accordion
node node_modules/@zentauri-ui/zentauri-components/cli/index.mjs add hook useWindowSize
```

| Command               | What it does                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `init`                | Writes **`components.json`** in the current working directory (or `--cwd`) with default `aliases` and `resolvedPaths`. Refuses to overwrite an existing file.                                                                                                                                                                                                                             |
| `add <names...>`      | Walks up from `--cwd` (default `.`) to find `components.json`, then copies each resolved **UI** folder under `src/ui` or chart entry under `src/charts/<type>`, pulls in hooks those files depend on (including transitive hook imports), and creates **`lib/utils`** at `resolvedPaths.utils` from the package template if it is missing.                                                |
| `add hook <names...>` | Same config lookup; copies only **hook** folders listed under `registry.hooks` (from `hooksEntryNames` in `tsup.config.ts`), including transitive sibling-hook imports. Does not copy UI unless a hook’s imports require you to add a component separately (for example `usePagination` imports types from `ui/pagination`; `useDynamicStepper` imports types from `ui/dynamic-stepper`). |

Global flags: `-h` / `--help`, `-v` / `--version`, `--cwd <dir>` (relative to `process.cwd()`).

### `components.json` (created by `init`)

Defaults look like this; edit `resolvedPaths` and `aliases` so they match your app’s `tsconfig` / bundler paths.

```json
{
  "aliases": {
    "ui": "@/components/ui",
    "utils": "@/lib/utils",
    "hooks": "@/hooks"
  },
  "resolvedPaths": {
    "ui": "src/components/ui",
    "utils": "src/lib/utils.ts",
    "hooks": "src/hooks"
  }
}
```

### Registry (`cli/registry.json`)

- **`components`**: sorted list of folder names under **`src/ui/`**, plus chart entries from **`src/charts/<type>`**, that `add` may copy. The file is **generated**; the canonical build lists live in **`tsup.config.ts`** as `uiComponentNames`, `uiAnimatedComponentNames`, and `chartEntryNames`, so animated-only entries such as **`spinner`** stay aligned with the CLI.
- **`hooks`**: sorted list of folder names under **`src/hooks/`** that `add hook` may copy; generated from **`hooksEntryNames`** in **`tsup.config.ts`** (same entries as published `…/hooks/<name>` subpaths).
- **`nameAliases`**: optional map from a CLI token to a real folder name: `button` → `buttons`, `input` → `inputs` (singular forms while folders stay plural), and `chart-<type>` → `charts/<type>` for every chart (so `add chart-line` and `add charts/line` are equivalent).
- **`peerHints`**: generated map from a component/chart name to the **optional peer dependencies** its source imports (`framer-motion` for components that ship an `animated/` variant, `react-icons` where icons are used, `recharts` for every chart). After `add`, the CLI prints a deduplicated install hint built from this map, so you never have to guess which peers a vendored component needs.

Example: these are equivalent when `nameAliases` is configured:

```bash
zentauri-components add button
zentauri-components add buttons
```

After `add`, imports inside copied `.ts`/`.tsx` files are rewritten using your `aliases`; test files (`*.test.*`, `*.spec.*`) from the package are not copied.

### Worked examples

```bash
# A static UI primitive — copies src/ui/buttons plus the shared design-system tokens it imports.
zentauri-ui add button

# A chart — copies src/charts/line and the shared chart frame; CLI hints `recharts`.
zentauri-ui add charts/line

# A hook on its own — copies src/hooks/useClipboard (plus any sibling hooks it imports).
zentauri-ui add hook useClipboard
```

### Vendored destination structure

Given the default `components.json`, running `zentauri-ui add button charts/line` then `add hook useClipboard` produces:

```
your-app/
├── components.json
└── src/
    ├── components/
    │   ├── design-system/        # shared token + variant strings (copied once, never overwritten)
    │   │   └── button.ts
    │   └── ui/
    │       ├── buttons/          # the component folder (index.ts, button.tsx, variants.ts, …)
    │       └── charts/
    │           ├── shared/       # chart frame + helpers shared by every chart
    │           └── line/         # the requested chart entry only
    ├── hooks/
    │   └── useClipboard/         # hooks pulled in by components or `add hook`
    └── lib/
        └── utils.ts              # cn() helper, created from the package template if missing
```

- `design-system/` lands beside `ui/` (one level up from `resolvedPaths.ui`) so vendored components keep their `../../design-system/*` imports working without a new alias. Existing files there are left untouched on re-add.
- Charts always land under `<ui>/charts/`, with a single shared `charts/shared/` folder regardless of how many chart types you add.
- Re-adding a component overwrites that component's files but preserves your `design-system/` and `lib/utils.ts` edits.

### When to use the CLI vs npm imports

| Approach                                         | Best when                                                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **`npm` + package `exports`** (earlier sections) | You want versioned dependencies, smallest app-owned surface, and tree-shaken `dist/` entries.                               |
| **`init` / `add`**                               | You want vendored source under your repo (customize primitives, match shadcn-style workflows, or lock file-level behavior). |

Tailwind still needs to see the classes your **copied** files use—point `@source` at those paths (for example your `src/components/ui`) rather than only at `node_modules/@zentauri-ui/zentauri-components` if you no longer rely on scanning the published package. This matters for the light/dark variant pairs too: copied components keep their base light utilities and `dark:` overrides, and both need to be included in Tailwind's generated CSS.

## Checkout the components:

https://zentauri-ui.vercel.app/

## Accessibility checklist for contributors

Every new or changed component should clear this bar before it merges. The
highest-risk primitives (overlays and keyboard-heavy controls) are expected to
have explicit tests for the items below.

**Semantics & ARIA**

- [ ] Correct landmark/role for the pattern (`dialog`, `menu`/`menuitem`, `listbox`/`option`, `tab`/`tabpanel`, `slider`, `tree`/`treeitem`, …).
- [ ] State is announced: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-disabled`, `aria-current` as appropriate.
- [ ] Overlays set `aria-modal` and wire `aria-labelledby` / `aria-describedby` to the rendered title/description.
- [ ] Compound parts are linked by id (`aria-controls`, `aria-haspopup`) rather than relying on DOM proximity.

**Keyboard**

- [ ] All interactive parts are reachable and operable by keyboard (Enter/Space activate; Arrow keys navigate where the role implies it).
- [ ] Roving tabindex for composite widgets (one tab stop; arrows move within).
- [ ] Dismissible surfaces close on `Escape`.
- [ ] Focus moves into an opened overlay and **returns to the trigger** on close.

**Disabled & edge states**

- [ ] Disabled items are skipped by keyboard navigation and ignore pointer activation, and expose `aria-disabled`.
- [ ] SSR-safe: no access to `window`/`document` during render (guard effects; the package targets React 18+ server rendering).

**Motion**

- [ ] Animated entries respect `prefers-reduced-motion` (use `usePrefersReducedMotion` / Framer Motion's `useReducedMotion`).
- [ ] `framer-motion` stays out of static entries — enforced by `src/ui/peer-isolation.test.ts`. Charts stay isolated to `src/charts/*`.

Add or extend the component's `*.test.tsx` to cover the items that apply; see
`modal`, `select`, and `context-menu` tests for worked examples.

## Development

From this package directory in the monorepo:

- `pnpm build` (or `npm run build`) — production bundle via `tsup` (Rollup treeshake + `scripts/prepend-use-client.mjs` via `onSuccess` so each UI entry under `dist/ui/`, animation entry under `dist/animations/`, chart entry under `dist/charts/`, and `dist/ui/<name>/animated.*` starts with `"use client"` where needed)
- `pnpm dev` — `tsup` watch mode (same `onSuccess` hook after each rebuild)
- `pnpm test` / `pnpm test:watch` — **Vitest** and **Testing Library** unit tests // currently covered 836 test cases in total
- `pnpm test:a11y` — focused accessibility coverage for package-level UI primitives and compound components: **axe-core** audits for every interactive component plus **keyboard-interaction** tests (focus order, arrow-key nav, Home/End, Escape/Enter) for the compound components
- `pnpm check:tokens` — enforce the `--zui-*` token contract across design-system, variant, and local custom-property usage without generating a large checked-in token catalog
- **`pnpm run generate:registry`** — runs `scripts/generate-registry.mjs`, which reads **`uiComponentNames`**, **`uiAnimatedComponentNames`**, **`animationEntryNames`**, **`chartEntryNames`**, and **`hooksEntryNames`** from `tsup.config.ts`, applies fixed **`nameAliases`**, scans each component/chart source to build **`peerHints`**, and writes **`cli/registry.json`** (`components` + `animations` + `hooks` + `peerHints`). Run this after adding or renaming UI, animation, chart, or hook entries so the CLI stays in sync (the script prints counts).

## Release and Contribution

This package uses Changesets for npm versioning and changelog entries. Add a
changeset from the repository root for user-facing package changes:

```sh
pnpm changeset
```

Useful links:

- Package changelog: [`CHANGELOG.md`](CHANGELOG.md)
- Repository contribution guide: [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md)
- Security policy: [`../../SECURITY.md`](../../SECURITY.md)
- GitHub releases: <https://github.com/ShubhamTiwari909/zentauri-ui/releases>

## License

MIT. See [`LICENSE`](LICENSE).
