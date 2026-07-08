# Zentauri Intl & Time — Implementation Plan

**A zero-dependency date/time & internationalization suite for `@zentauri-ui/zentauri-components`, built entirely on the native JS `Intl` APIs. No date-fns, no dayjs, no moment — the platform is the dependency.**

This document is a self-contained implementation spec. It embeds every repo convention needed, so it can be handed to any AI coding tool (or a human) and executed without reading the codebase first. Repo: pnpm 9 + Turborepo monorepo at `zentauri-ui/`, library at `packages/components`, docs app at `apps/component-library` (Next.js 16, App Router).

---

## 1. The Idea

Zentauri UI currently ships 42 hooks and ~60 components, but the only time-related primitive is `useCountdown`. Meanwhile every real app renders dates constantly — and most teams pull in a 70kb date library just to print "3 minutes ago". The modern `Intl` APIs (`Intl.RelativeTimeFormat`, `Intl.DateTimeFormat`, `Intl.NumberFormat` unit style, `Intl.supportedValuesOf`) cover the 90% case natively, with locale support in every language for free.

**The pitch: "Dates and timezones, from the platform."** Four hooks + three components that make Intl ergonomic, live-updating, SSR-safe, and themed with the `--zui-*` token contract. It slots perfectly next to the existing dev-tool components (json-viewer, hash-generator, http-status-badge) and gives the library a marketing hook no competitor kit has: _zero-dependency internationalized time_.

### Deliverables at a glance

| Kind      | Name                | One-liner                                                                                              |
| --------- | ------------------- | ------------------------------------------------------------------------------------------------------ |
| Hook      | `useDateTimeFormat` | Memoized `Intl.DateTimeFormat` with a formatter cache; `format`, `formatRange`, `formatToParts`        |
| Hook      | `useRelativeTime`   | Live "3 minutes ago" with automatic unit selection and adaptive tick intervals                         |
| Hook      | `useTimezone`       | Detect the user's zone, enumerate all zones, get wall-clock time + GMT offset in any zone              |
| Hook      | `useDurationFormat` | Humanize milliseconds → "1h 24m 30s" (localized) via `Intl.NumberFormat` unit style                    |
| Component | `relative-time`     | Semantic `<time>` that live-updates, with absolute-time tooltip; animated variant crossfades on change |
| Component | `timezone-select`   | Searchable, region-grouped timezone picker showing live local time + offset per zone                   |
| Component | `world-clock`       | Card grid of live clocks across zones with day/night indicator and "±Xh from local" badge              |

**Packaging decision: no new category.** Hooks go in `src/hooks/`, components in `src/ui/`. The `package.json` exports already use wildcards (`./ui/*`, `./hooks/*`), so nothing new is needed there, and the CLI registry is generated from `tsup.config.ts` automatically. In the docs app, group them under a new sidebar section labeled **"Intl & Time"** — that gives the category branding without any build-system risk. (A dedicated `src/intl/` entry tree can come later if the suite grows.)

---

## 2. Repo Conventions You Must Follow (embedded so this doc stands alone)

### 2.1 Component layering — every `src/ui/<name>/` folder

1. `src/design-system/<name>.ts` — **pure string constants only** (`zui<Name>Base`, `zui<Name>Appearances`, `zui<Name>Sizes`, …). Every themeable value is a CSS variable with a hardcoded fallback **and a paired `dark:` class in the same string**, e.g. `text-[color:var(--zui-relative-time-fg,#111827)] dark:text-[color:var(--zui-relative-time-fg-dark,#f9fafb)]`. The `--zui-*` token names are public API. House style: ~15+ color "appearance" palettes plus `gradient-*` and `glass` variants — copy the appearance list from an existing design-system file (e.g. `src/design-system/badge.ts`) and adapt token names.
2. `src/ui/<name>/variants.ts` — wires the token strings into `cva()` maps. **No raw Tailwind here**; import everything from the design-system file.
3. `src/ui/<name>/types.ts` — props: `VariantProps<typeof …Variants>` + component-specific fields.
4. `src/ui/<name>/<name>-base.tsx` — the real implementation. Compound components use React context + `data-slot` attributes.
5. `src/ui/<name>/<name>.tsx` — static entry re-exporting the base. **No framer-motion imports anywhere in this path.**
6. `src/ui/<name>/animated/` (optional) — `animations.ts` (transition presets + types) and `<name>-animated.tsx`. Framer Motion is an optional peer dep and must never leak into the static entry.
7. `src/ui/<name>/index.ts` — starts with `"use client"`, re-exports component + types + variants.
8. `src/ui/<name>/<name>.test.tsx` — Vitest + Testing Library (jsdom).

### 2.2 Registration when adding a component

- Add `export * from "./<name>"` to `src/design-system/index.ts`.
- In `packages/components/tsup.config.ts`: add the name to the `uiComponentNames` array (alphabetical), and to `uiAnimatedComponentNames` if it has an `animated/` entry. This single list drives both build entries and the generated CLI registry.
- **Never hand-edit `cli/registry.json`** — it regenerates via `scripts/generate-registry.mjs` (`npm run generate:registry`, also on `prepack`).

### 2.3 Registration when adding a hook

- Create `src/hooks/<hookName>/index.ts` (+ implementation + test in the same folder, matching existing hooks like `src/hooks/useCountdown/`).
- Add the hook name to `hooksEntryNames` in `tsup.config.ts` (alphabetical).
- Re-export from `src/hooks/index.ts` if the existing hooks do so (check and match).

### 2.4 Docs app registration (per component/hook preview page)

- `apps/component-library/app/preview/components/<slug>/page.tsx` — route; imports the preview page and `getPreviewSeo(slug)`. (Hooks likely live under an analogous `app/preview/hooks/<slug>/` route — check the existing hook preview routes and mirror them.)
- `apps/component-library/content/seo/preview/components/<slug>.json` — SEO doc, **plus** import + register it in `lib/preview-seo-registry.ts`.
- `apps/component-library/components/preview/<name>/` — `sections/*.tsx` (hero, code examples, props), `components/<name>-code-examples.{data,snippets}.ts` + `-demo.tsx` for `PreviewCodeShowcase`. Code-example section labels use `<p>` tags above each showcase row (see `components/preview/accordion/sections/accordion-code-examples-section.tsx` as the template).
- `components/sidebar/sidebar-data.ts` — add a new **"Intl & Time"** group with entries for all 7 items. This also feeds the in-site search index automatically (`lib/site-search-entries.ts` derives from `sidebar*Data` — do not edit it separately).
- `lib/home-install-commands.ts` — add `relative-time` and `timezone-select` to the curated `CLI_ADD_COMMANDS` list (skip the rest; the list is curated, not exhaustive).

### 2.5 Commands

```sh
# dev (docs app + tsup --watch)
pnpm exec turbo run dev --filter=component-library
# tests (library only)
pnpm --filter @zentauri-ui/zentauri-components test
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/relative-time/relative-time.test.tsx
# types + lint
pnpm check-types && pnpm lint
# after tests change, regenerate test-health surfaces (never hand-edit them)
pnpm --filter @zentauri-ui/zentauri-components update:test-health
```

Note: the default shell Node may be old — use Node 20 (`nvm use 20.13.1`) before running pnpm/turbo/vitest.

---

## 3. Hook Specs

All hooks: client-only (`"use client"` in index.ts), zero runtime deps, TypeScript strict, JSDoc on every exported symbol. Shared internal helpers may live in a `src/hooks/<hook>/` folder each or in `src/lib/` if genuinely shared — prefer duplication over a new shared module unless 3+ hooks need it.

### 3.1 `useDateTimeFormat`

The foundation hook. `Intl.DateTimeFormat` construction is expensive (~0.5–2ms each); this hook memoizes formatters in a module-level cache keyed by `locale + JSON.stringify(options)`.

```ts
export interface UseDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  /** BCP 47 locale(s). Defaults to the runtime locale; pass explicitly for SSR determinism. */
  locale?: string | string[];
}

export interface UseDateTimeFormatReturn {
  format: (date: Date | number) => string;
  formatRange: (start: Date | number, end: Date | number) => string;
  formatToParts: (date: Date | number) => Intl.DateTimeFormatPart[];
  /** The resolved locale actually in use, e.g. "en-IN". */
  resolvedLocale: string;
  /** The underlying cached formatter, for advanced use. */
  formatter: Intl.DateTimeFormat;
}

export function useDateTimeFormat(
  options?: UseDateTimeFormatOptions,
): UseDateTimeFormatReturn;
```

Implementation notes:

- Module-level `Map<string, Intl.DateTimeFormat>` cache with a soft cap (~50 entries, evict oldest) — export a `getCachedDateTimeFormat(locale, options)` helper so the components below reuse the same cache.
- Stable function identities via `useMemo` on the cache key so consumers can put `format` in dependency arrays.
- `formatRange` needs a runtime guard (`typeof formatter.formatRange === "function"`) with fallback `` `${format(start)} – ${format(end)}` ``.

Tests: caching (same key → same formatter instance), format output for a fixed locale (`en-US`) and fixed dates, formatRange fallback, formatToParts shape.

### 3.2 `useRelativeTime`

Live-updating relative time with automatic unit selection and **adaptive tick scheduling** — this is the piece naive implementations get wrong (a 1-second interval for a "3 years ago" label is wasteful).

```ts
export type RelativeTimeUnit =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

export interface UseRelativeTimeOptions {
  locale?: string | string[];
  /** Intl.RelativeTimeFormat style: "long" | "short" | "narrow". Default "long". */
  style?: Intl.RelativeTimeFormatStyle;
  /** "auto" gives "yesterday"/"tomorrow"; "always" gives "1 day ago". Default "auto". */
  numeric?: Intl.RelativeTimeFormatNumeric;
  /** Disable live updates (render once). Default true (live). */
  live?: boolean;
  /** Below this threshold (ms), render the `justNowLabel` instead of "0 seconds ago". Default 10_000. */
  justNowThresholdMs?: number;
  justNowLabel?: string; // default: localized — see note below
  /** Past this cutoff, switch to an absolute date string via useDateTimeFormat. Optional. */
  absoluteAfter?: { unit: RelativeTimeUnit; count: number };
  absoluteFormatOptions?: Intl.DateTimeFormatOptions;
}

export interface UseRelativeTimeReturn {
  /** e.g. "3 minutes ago", "in 2 hours", "just now", or absolute fallback */
  text: string;
  /** The unit currently in use — lets UIs style seconds differently from years. */
  unit: RelativeTimeUnit | "just-now" | "absolute";
  /** Numeric value passed to Intl.RelativeTimeFormat (negative = past). */
  value: number;
  /** ISO string for <time dateTime>. */
  isoString: string;
  /** Force a re-render/re-computation now. */
  refresh: () => void;
}

export function useRelativeTime(
  date: Date | number | string,
  options?: UseRelativeTimeOptions,
): UseRelativeTimeReturn;
```

Implementation notes:

- Unit thresholds: <60s → second, <60m → minute, <24h → hour, <7d → day, <~30.44d → week, <365.25d → month, else year.
- **Adaptive ticking**: schedule the next update exactly when the label would change (next second boundary while in seconds; next minute boundary while in minutes; etc.), via `setTimeout` re-armed on each tick — not a fixed `setInterval`. Cap the delay at 1 hour.
- Pause ticking when the tab is hidden and refresh immediately on visibility regain — reuse the existing `usePageVisibility` hook internally.
- `justNowLabel` default: don't hardcode English; derive from `numeric: "auto"` (`rtf.format(0, "second")` yields "now" in most locales) and only use the option as an override.
- SSR: on the server there are no timers; compute once from the passed date. Document that for exact server/client parity users should render inside the `RelativeTime` component (which handles hydration, §4.1).

Tests (use `vi.useFakeTimers()` and `vi.setSystemTime()`): unit selection at each threshold, live tick flips "59 seconds ago" → "1 minute ago" at the boundary, `just now` window, `absoluteAfter` cutoff, no timer leaks on unmount, `live: false` renders once.

### 3.3 `useTimezone`

```ts
export interface TimezoneInfo {
  /** IANA id, e.g. "Asia/Kolkata" */
  id: string;
  /** "Asia" — first path segment */
  region: string;
  /** "Kolkata" → "Kolkata" (underscores → spaces) */
  city: string;
  /** "GMT+5:30" — via formatToParts timeZoneName: "shortOffset" */
  offsetLabel: string;
  /** Offset in minutes from UTC at the reference instant (handles DST). */
  offsetMinutes: number;
}

export interface UseTimezoneReturn {
  /** The user's zone from Intl.DateTimeFormat().resolvedOptions().timeZone */
  localTimezone: string;
  /** All zones via Intl.supportedValuesOf("timeZone"); [] + `supported:false` if unavailable. */
  timezones: TimezoneInfo[];
  /** Whether Intl.supportedValuesOf exists in this runtime. */
  supported: boolean;
  /** Wall-clock string for a date in a zone. */
  formatInZone: (
    date: Date | number,
    timeZone: string,
    options?: Intl.DateTimeFormatOptions,
  ) => string;
  /** Offset difference in minutes between a zone and the local zone (positive = ahead). */
  offsetFromLocal: (timeZone: string) => number;
  getTimezoneInfo: (timeZone: string) => TimezoneInfo | null;
}

export function useTimezone(options?: { locale?: string }): UseTimezoneReturn;
```

Implementation notes:

- `offsetMinutes` without a date library: format the instant twice with `timeZoneName: "longOffset"` (`GMT+05:30`) and parse, or diff two `Date` objects built from `toLocaleString("en-US", { timeZone })` — pick the offset-label parsing approach; it's DST-correct and allocation-light.
- Compute the `timezones` array lazily and memoize module-level (it's ~420 entries and static per session).
- Guard `Intl.supportedValuesOf` with `typeof` — it's ES2022; set `supported: false` and return `[]` rather than throwing.

Tests: local zone detection (jsdom default is UTC unless configured — set `TZ=UTC` expectations), `formatInZone` for two known zones on a fixed instant, `offsetFromLocal` sign convention, `supported:false` path by temporarily deleting `Intl.supportedValuesOf`.

### 3.4 `useDurationFormat`

```ts
export interface UseDurationFormatOptions {
  locale?: string | string[];
  /** "long" ("1 hour, 24 minutes"), "short" ("1 hr, 24 min"), "narrow" ("1h 24m"). Default "narrow". */
  style?: "long" | "short" | "narrow";
  /** Largest → smallest units to show. Default ["hour","minute","second"]. Supports day/week too. */
  units?: Array<"day" | "hour" | "minute" | "second" | "millisecond">;
  /** Max number of units in output, e.g. 2 → "1h 24m". Default: all non-zero. */
  maxUnits?: number;
  /** Render zero-value leading units? Default false. */
  showZeroUnits?: boolean;
}

export interface UseDurationFormatReturn {
  format: (durationMs: number) => string;
  formatParts: (
    durationMs: number,
  ) => Array<{ unit: string; value: number; text: string }>;
}

export function useDurationFormat(
  options?: UseDurationFormatOptions,
): UseDurationFormatReturn;
```

Implementation notes:

- Primary path: `Intl.NumberFormat(locale, { style: "unit", unit, unitDisplay })` per unit (universally supported), joined with the locale list separator via `Intl.ListFormat` when style is `long`/`short`, plain space for `narrow`.
- If `Intl.DurationFormat` exists at runtime, prefer it (feature-detect; it's Baseline 2025) — keep the NumberFormat path as the fallback and test both.
- Negative durations: format absolute value; document the sign is the caller's concern.
- Pairs naturally with the existing `useCountdown` — add a docs example composing them.

Tests: fixed durations across the three styles in `en-US`, `maxUnits` truncation, zero handling, DurationFormat vs fallback parity (skip DurationFormat test when the runtime lacks it).

---

## 4. Component Specs

All three follow the full §2.1 layering. Appearance palettes: copy the house set (primary, secondary, success, danger, warning, info, neutral, + the `gradient-*` and `glass` set) from `src/design-system/badge.ts`, renaming tokens to the component's prefix.

### 4.1 `relative-time`

```tsx
export interface RelativeTimeProps
  extends
    Omit<React.TimeHTMLAttributes<HTMLTimeElement>, "dateTime">,
    VariantProps<typeof relativeTimeVariants> {
  /** The instant to describe. Required. */
  date: Date | number | string;
  /** Everything from UseRelativeTimeOptions is accepted and forwarded. */
  locale?: string | string[];
  style?: Intl.RelativeTimeFormatStyle; // note: rename prop to `formatStyle` to avoid clashing with HTML `style`
  numeric?: Intl.RelativeTimeFormatNumeric;
  live?: boolean;
  absoluteAfter?: { unit: RelativeTimeUnit; count: number };
  /** Show absolute datetime in a native title tooltip. Default true. */
  withTooltip?: boolean;
  tooltipFormatOptions?: Intl.DateTimeFormatOptions;
  /** Fallback rendered on the server / before hydration. Default: absolute date string. */
  ssrFallback?: React.ReactNode;
  // variants: appearance (house palette set), size ("sm" | "md" | "lg"), weight?
}
```

- Renders `<time dateTime={iso} title={absolute}>` — semantic HTML is the differentiator vs. a plain span.
- **Hydration strategy (critical for Next.js consumers):** server time ≠ client time, so the live text would mismatch. Render the deterministic absolute string (or `ssrFallback`) initially, then swap to relative text after mount using the existing `useIsMounted` hook. Do **not** rely on `suppressHydrationWarning` alone. Document this in the docs page.
- `data-slot="relative-time"`; expose `data-unit={unit}` for CSS targeting.
- **Animated variant** (`animated/`): crossfade/slide the text when it changes (`AnimatePresence` keyed on `text`), with transition presets in `animations.ts` (`fade`, `slide-up`, `blur`) — respect `usePrefersReducedMotion`.

Tokens (design-system file `src/design-system/relative-time.ts`): `--zui-relative-time-fg`, `--zui-relative-time-bg` (for badge-like appearances), `--zui-relative-time-radius`, `--zui-relative-time-px/py`, `--zui-relative-time-font-size-{sm,md,lg}` — each with fallback + `-dark` pair.

Tests: renders `<time>` with correct `dateTime`, shows fallback pre-mount then relative text (use `act` + fake timers), tooltip attribute, `formatStyle="narrow"` output, appearance class application, animated entry renders without framer errors (and static entry has no framer import — the repo has a `peer-isolation.test.ts` pattern; make sure the new components pass it).

### 4.2 `timezone-select`

A searchable, grouped picker. **Reuse the existing `combobox` primitives/patterns** (`src/ui/combobox/`) rather than reimplementing listbox behavior — study its base and mirror its context/`data-slot` structure, or compose it directly if its API allows custom option rendering.

```tsx
export interface TimezoneSelectProps extends VariantProps<
  typeof timezoneSelectVariants
> {
  value?: string; // controlled IANA id
  defaultValue?: string; // uncontrolled (use the existing useControllableState hook)
  onValueChange?: (timeZone: string, info: TimezoneInfo) => void;
  locale?: string;
  /** Group options by region ("Asia", "Europe", …). Default true. */
  groupByRegion?: boolean;
  /** Show live current time per option row. Default true. */
  showTime?: boolean;
  /** Show "GMT+5:30" offset label per row. Default true. */
  showOffset?: boolean;
  /** Pin these zones to the top ("Local time" + favorites). */
  pinnedTimezones?: string[];
  placeholder?: string;
  disabled?: boolean;
  // variants: appearance, size
}
```

- Option row layout: city name (bold) + region (muted) on the left, live time + `GMT±X` chip on the right, `tabular-nums`.
- Search matches city, region, and IANA id, case/underscore-insensitive ("new york" → `America/New_York`).
- Live times in the open list tick once per minute (single shared interval for the whole list, not per row).
- Falls back gracefully when `useTimezone().supported === false`: render a plain text input with a note, never crash.
- First option group: "Local" with the detected zone pre-labeled.

Tests: filters by search, selects and fires `onValueChange` with `TimezoneInfo`, controlled/uncontrolled, pinned zones ordering, unsupported-runtime fallback.

### 4.3 `world-clock`

Presentational card grid — the visual showpiece for the docs homepage.

```tsx
export interface WorldClockZone {
  timeZone: string;
  label?: string;
}

export interface WorldClockProps extends VariantProps<
  typeof worldClockVariants
> {
  zones: Array<string | WorldClockZone>;
  locale?: string;
  hourCycle?: "h12" | "h23"; // default: locale default
  showSeconds?: boolean; // default false (minute ticks)
  showDate?: boolean; // default true ("Mon, Jul 7")
  /** Show "+9½h" / "-4h" difference vs local zone. Default true. */
  showOffsetFromLocal?: boolean;
  /** Day/night indicator (sun/moon icon from react-icons/hi2, already a dep) based on 6am–6pm local hour. Default true. */
  showDayNight?: boolean;
  // variants: appearance, size, layout: "grid" | "row" | "list"
}
```

- One shared ticking timer for all zones (1s if `showSeconds`, else aligned to the next minute boundary).
- Time digits use `tabular-nums`; `<time dateTime>` per card.
- Day/night drives a `data-daytime="true|false"` attribute so tokens can restyle cards (e.g. subtle darker card for night zones).
- Compound structure: `WorldClock` (grid + shared clock context) and `WorldClock.Zone` internal card — export both, `data-slot="world-clock"` / `"world-clock-zone"`.
- **Animated variant**: flip/slide digit transition on minute change, presets in `animations.ts`.

Tests: renders N cards for N zones, time strings match `formatInZone` for a frozen system time, offset badge sign, day/night attribute at fixed instants, single timer (spy on `setTimeout` count), unmount cleanup.

---

## 5. Cross-Cutting Requirements

1. **Zero new dependencies.** Everything from `Intl` + existing deps (cva, clsx, react-icons already present). Framer-motion only inside `animated/` entries.
2. **SSR safety.** No `window`/`document`/`Intl.supportedValuesOf` access at module top level. Time-dependent text renders a deterministic fallback until mounted (`useIsMounted`). All components work in Next.js 16 App Router server-rendered pages when imported into client boundaries.
3. **Feature detection, never assumption.** `Intl.supportedValuesOf` (ES2022), `formatRange`, `Intl.DurationFormat`, `Intl.ListFormat` — each behind `typeof` guards with documented fallbacks.
4. **Timer hygiene.** Every hook/component clears timeouts on unmount; shared timers where lists render many live values; pause on hidden tabs via `usePageVisibility`.
5. **Accessibility.** `<time dateTime>` everywhere a time is rendered; live regions are NOT used for ticking clocks (screen-reader spam) — document that deliberately; timezone-select keyboard nav follows the combobox pattern; a11y tests added to the `src/accessibility` suite (`test:a11y`).
6. **Locale prop threading.** Every hook/component takes `locale`; default is runtime locale. Documented recommendation for SSR apps: pass an explicit locale.

---

## 6. Execution Phases (each phase is shippable)

### Phase 1 — Foundation hooks

1. `useDateTimeFormat` (folder, impl, index, tests) — the cache is used by everything else.
2. `useRelativeTime` (uses `usePageVisibility`).
3. `useTimezone`.
4. `useDurationFormat`.
5. Register all four in `hooksEntryNames` in `tsup.config.ts`; mirror any `src/hooks/index.ts` re-export pattern.
6. `pnpm --filter @zentauri-ui/zentauri-components test` green; `pnpm check-types` green.

### Phase 2 — `relative-time` component

1. `src/design-system/relative-time.ts` + export from `src/design-system/index.ts`.
2. `src/ui/relative-time/` full layering incl. `animated/` + tests.
3. Add to `uiComponentNames` **and** `uiAnimatedComponentNames` in `tsup.config.ts`.
4. Build once (`pnpm --filter @zentauri-ui/zentauri-components build`) to confirm entries + `"use client"` prepend + registry generation work.

### Phase 3 — `timezone-select` and `world-clock`

Same checklist as Phase 2 per component (`world-clock` gets an `animated/` entry; decide for `timezone-select` — static-only is fine initially).

### Phase 4 — Docs app

For each of the 7 items: preview page folder (`components/preview/<name>/` with sections, code-example data/snippets/demo), route (`app/preview/components/<slug>/page.tsx` — hooks under the hooks route pattern), SEO JSON + `preview-seo-registry.ts` registration, sidebar entry under a new **"Intl & Time"** group in `sidebar-data.ts`. Add `relative-time` + `timezone-select` to `lib/home-install-commands.ts`. Demo ideas: a "comment feed" with live `RelativeTime` stamps; a meeting-planner strip pairing `timezone-select` + `world-clock`; `useDurationFormat` composed with the existing `useCountdown`.

### Phase 5 — Finalize

1. `pnpm --filter @zentauri-ui/zentauri-components test:all` (unit + a11y) green.
2. `pnpm --filter @zentauri-ui/zentauri-components update:test-health` (regenerates the four test-count surfaces — never hand-edit them).
3. `pnpm build && pnpm check-types && pnpm lint` at the root.
4. Verify in the running docs app (`pnpm exec turbo run dev --filter=component-library`): each new page renders, live times tick, dark mode tokens apply, search finds the new entries.

---

## 7. Acceptance Criteria

- [ ] All 4 hooks + 3 components importable via subpaths: `@zentauri-ui/zentauri-components/hooks/useRelativeTime`, `…/ui/relative-time`, `…/ui/relative-time/animated`, etc.
- [ ] `zentauri-ui add relative-time` vendors the source correctly (registry regenerated, not hand-edited).
- [ ] Static entries contain no framer-motion (passes the existing peer-isolation test pattern).
- [ ] No hydration warnings in the docs app for `relative-time` / `world-clock` pages.
- [ ] "59 seconds ago" flips to "1 minute ago" at the boundary without a page interaction (fake-timer test + manual check).
- [ ] Every `--zui-*` token has a fallback and a paired `-dark` token in the same class string.
- [ ] Runtime without `Intl.supportedValuesOf` degrades gracefully (no throw).
- [ ] Test-health surfaces regenerated via the script; docs sidebar/search show the "Intl & Time" group.

## 8. Out of Scope (explicitly)

- Full calendar / date-range **picker** (large, separate project — natural follow-up).
- Date parsing/arithmetic library surface (the suite formats and displays; it does not do date math beyond offsets).
- `Temporal` API usage (not yet Baseline; revisit when it is — the token/API surface here is designed so internals can swap to Temporal later without breaking changes).
- Locale switcher context/provider (v2 candidate: a `ZentauriIntlProvider` that threads `locale` to all hooks).
