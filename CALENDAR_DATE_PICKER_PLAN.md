# Zentauri Calendar & Date Picker — Implementation Plan

**Two new components for `@zentauri-ui/zentauri-components`: `calendar` (a locale-aware, fully keyboard-navigable month grid — the engine) and `date-picker` (input + popover composition, single and range modes). Zero date-library dependencies — all date math is plain `Date` arithmetic and all localization comes from native `Intl`.**

This document is a self-contained implementation spec. It embeds every repo convention needed, so it can be handed to any AI coding tool (or a human) and executed without reading the codebase first. Repo: pnpm 9 + Turborepo monorepo at `zentauri-ui/`, library at `packages/components`, docs app at `apps/component-library` (Next.js 16, App Router).

> **Relationship to `INTL_TIME_PLAN.md`:** if the Intl & Time suite has landed, reuse its module-level formatter cache (`getCachedDateTimeFormat`) from `useDateTimeFormat`. If it has NOT landed, inline a private ~15-line memoized formatter cache in the calendar's utils — do not block on the other plan. Everything else here is independent.

---

## 1. The Idea

The calendar/date-picker is the most-requested component missing from the library (there is no date component at all among the ~60 existing ones). The differentiator, consistent with the library's positioning: **zero dependencies and locale support from the platform**. Month names, weekday headers, first-day-of-week, numbering systems (Arabic-Indic digits, etc.), and formatted values all come from `Intl.DateTimeFormat` / `Intl.Locale` — no date-fns, no dayjs, no react-day-picker.

### Deliverables

| Kind      | Name                     | One-liner                                                                                                         |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Component | `calendar`               | Standalone month grid; `single` / `multiple` / `range` selection; ARIA grid keyboard nav; 1–n months side by side |
| Component | `date-picker`            | Trigger input + popover + calendar; single and range modes; formatted display value via `Intl`                    |
| Internal  | `calendar/date-utils.ts` | Pure date math + Intl helpers (exported for tests, `@internal` for consumers)                                     |

**Packaging: two `src/ui/` components, no new category.** `date-picker` composes the existing `popover` component and `useControllableState` hook. Wildcard exports (`./ui/*`) mean no `package.json` changes; the CLI registry regenerates from `tsup.config.ts`.

**Build order matters:** `calendar` first — it is a complete, shippable component on its own (inline calendars, booking UIs). `date-picker` is a thin composition on top.

---

## 2. Repo Conventions (embedded so this doc stands alone)

### 2.1 Component layering — every `src/ui/<name>/` folder, read bottom-up

1. **`src/design-system/<name>.ts`** — pure string constants only (`zui<Name>Base`, `zui<Name>Appearances`, `zui<Name>Sizes`, …). Every themeable value is a CSS variable with a hardcoded fallback **and a paired `dark:` class in the same string**. House pattern (from `src/design-system/badge.ts`):
   ```ts
   blue: "bg-[var(--zui-calendar-blue-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-calendar-blue-bg-dark,var(--zui-color-blue-dark,#3b82f6))] text-[color:var(--zui-calendar-blue-fg,var(--zui-brand-fg,#ffffff))] dark:text-[color:var(--zui-calendar-blue-fg-dark,var(--zui-brand-fg-dark,#ffffff))]",
   ```
   Note the token chain: component token → shared `--zui-color-*` token → hardcoded fallback. Appearances follow the house set: `default`, `secondary`, `destructive`, `outline`, `ghost`, `glass`, plus the named-color palette (`blue`, `cyan`, `green`, `lime`, `mint`, `ocean`, `sapphire`, `lavender`, `ruby`, `red`, `slate`, `zinc`, `stone`, `royal`, `electric`, `forest`, `sunset`, `magenta`, `crimson`, `aqua`, `plum`, `emerald`, `indigo`, `purple`, `pink`, `rose`, `sky`, `teal`, `yellow`, `orange`) and `gradient-*` variants — copy the exact key list and color chains from `src/design-system/badge.ts` (or `buttons.ts`) and rename token prefixes.
2. **`variants.ts`** — wires those strings into `cva()` maps. No raw Tailwind here.
3. **`types.ts`** — props: `VariantProps<typeof …Variants>` + component fields.
4. **`<name>-base.tsx`** — real implementation. Compound components use React context + `data-slot` attributes + sub-component exports (study `src/ui/tabs/` or `src/ui/accordion/`).
5. **`<name>.tsx`** — static entry, re-exports base. **No framer-motion anywhere in this path.**
6. **`animated/`** — `animations.ts` (presets + types) + `<name>-animated.tsx`. Framer Motion is an optional peer dep; must never leak into the static entry (there is a `peer-isolation.test.ts` guarding this — new components must pass it).
7. **`index.ts`** — starts with `"use client"`, re-exports component + types + variants.
8. **`<name>.test.tsx`** — Vitest + Testing Library, jsdom.

### 2.2 Library registration (per component)

- Add `export * from "./<name>"` to `src/design-system/index.ts`.
- `packages/components/tsup.config.ts`: add to `uiComponentNames` (alphabetical — `calendar` after `buttons`, `date-picker` after `data-table`) and to `uiAnimatedComponentNames` for components with an `animated/` entry.
- **Never hand-edit `cli/registry.json`** — regenerated by `scripts/generate-registry.mjs` (`npm run generate:registry`, also on `prepack`). If a friendly alias is wanted (`datepicker` → `date-picker`), add it to `nameAliases` in the registry generation source, following how `button`→`buttons` is defined.

### 2.3 Docs app registration (per component)

- `app/preview/components/<slug>/page.tsx` — route; imports the preview page and `getPreviewSeo(slug)` (copy an existing component route file).
- `content/seo/preview/components/<slug>.json` — SEO document, **and** import + register it in `lib/preview-seo-registry.ts`.
- `components/preview/<name>/` — `sections/*.tsx` (hero, code examples, props) + `components/<name>-code-examples.{data,snippets}.ts` + `-demo.tsx` for `PreviewCodeShowcase`. Code-example section labels use `<p>` tags above each showcase row (template: `components/preview/accordion/sections/accordion-code-examples-section.tsx`).
- `components/sidebar/sidebar-data.ts` — nav entries (this also feeds the search index via `lib/site-search-entries.ts`; do not edit that separately).
- `lib/home-install-commands.ts` — add `date-picker` to the curated `CLI_ADD_COMMANDS` (calendar optional).

### 2.4 Commands

```sh
# use Node 20 first (default shell Node may be v14): nvm use 20.13.1
pnpm --filter @zentauri-ui/zentauri-components test
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/calendar/calendar.test.tsx
pnpm --filter @zentauri-ui/zentauri-components test:a11y      # accessibility suite (src/accessibility)
pnpm check-types && pnpm lint
pnpm exec turbo run dev --filter=component-library
pnpm --filter @zentauri-ui/zentauri-components update:test-health   # regenerate test-count surfaces (never hand-edit)
```

---

## 3. Foundation: `date-utils.ts` (build first)

Location: `src/ui/calendar/date-utils.ts`. Pure functions, no React, no browser APIs — exhaustively unit-testable. All functions treat days as **local-midnight `Date` objects**; time-of-day is always normalized away with `startOfDay`.

```ts
// Day math (all return new Date objects, never mutate)
export function startOfDay(d: Date): Date;
export function startOfMonth(d: Date): Date;
export function endOfMonth(d: Date): Date;
export function addDays(d: Date, n: number): Date;
export function addMonths(d: Date, n: number): Date; // clamps: Jan 31 + 1mo = Feb 28/29
export function addYears(d: Date, n: number): Date;
export function isSameDay(a: Date, b: Date): boolean;
export function isSameMonth(a: Date, b: Date): boolean;
export function isBefore(a: Date, b: Date): boolean; // day-granular
export function isAfter(a: Date, b: Date): boolean;
export function isBetween(d: Date, start: Date, end: Date): boolean; // inclusive
export function clampDate(d: Date, min?: Date, max?: Date): Date;

// Grid building — THE core function
export interface CalendarWeek {
  weekNumber: number;
  days: Date[];
} // days.length === 7
export function buildMonthGrid(params: {
  month: Date; // any day in the target month
  firstDayOfWeek: number; // 0 = Sunday … 6 = Saturday
  fixedWeeks?: boolean; // always 6 rows (stable height across months)
}): CalendarWeek[];

// Intl helpers (memoized via module-level formatter cache; see note in §1 header)
export function getWeekdayNames(
  locale: string | undefined,
  format: "long" | "short" | "narrow",
  firstDayOfWeek: number,
): string[]; // rotated to firstDayOfWeek
export function getMonthName(
  locale: string | undefined,
  month: Date,
  format?: "long" | "short",
): string;
export function getYearLabel(locale: string | undefined, month: Date): string; // respects numbering system
export function getDayNumber(locale: string | undefined, day: Date): string; // "17" or "١٧" — Intl numbering
export function getDefaultFirstDayOfWeek(locale?: string): number;
// via new Intl.Locale(locale).getWeekInfo?.() ?? .weekInfo — feature-detect BOTH the
// method (newer) and property (older) forms; map Intl's 1=Mon..7=Sun to 0=Sun..6=Sat;
// fall back to 0 (Sunday) when unavailable. Never throw.

// Types shared by both components
export type DateRange = { from: Date | undefined; to?: Date | undefined };
export type CalendarSelectionMode = "single" | "multiple" | "range";
export type DateMatcher =
  | Date
  | Date[]
  | DateRange
  | { before: Date }
  | { after: Date }
  | { dayOfWeek: number[] }
  | ((date: Date) => boolean);
export function matchesDate(
  date: Date,
  matcher: DateMatcher | DateMatcher[],
): boolean;
```

Implementation notes:

- `getWeekdayNames`: format 7 consecutive known days (e.g. 2024-01-07 Sun … 2024-01-13 Sat) with `weekday:` option, then rotate the array by `firstDayOfWeek`.
- Weekday/month formatters come from the shared cache (`getCachedDateTimeFormat`) or the inlined private cache — creating `Intl.DateTimeFormat` per cell per render is the classic calendar perf bug; **never construct formatters inside the day-cell render path**.
- Export everything from the component's `index.ts` under a documented `@internal`-tagged namespace only if the docs demos need it; otherwise keep exports to the two types `DateRange`, `DateMatcher` (these ARE public API — they appear in props).

Tests (`date-utils.test.ts`, table-driven, fixed dates): month-boundary and leap-year `addMonths` clamping (Jan 31 → Feb 29 2024 / Feb 28 2023), grid shape for months starting on every weekday × `firstDayOfWeek` 0/1/6, `fixedWeeks` always 42 cells, DST-transition weeks contain 7 valid days (use a zone-independent assertion: consecutive dates differ by 1 day via `isSameDay(addDays(prev,1), next)`), weekday rotation for `en-US` (Sun first) vs `de-DE` (Mon first), `matchesDate` for every matcher shape, `getDefaultFirstDayOfWeek` fallback path with `Intl.Locale` weekInfo deleted.

---

## 4. Component Spec: `calendar`

### 4.1 API

```tsx
export interface CalendarBaseProps extends VariantProps<typeof calendarVariants> {
  /** Selection mode. Default "single". Discriminates value/onValueChange types below. */
  mode?: CalendarSelectionMode;

  // Selection — controlled/uncontrolled via the existing useControllableState hook.
  // Model as a discriminated union on `mode` so TS infers the right value type:
  //   mode: "single"   → value?: Date;      onValueChange?: (d: Date | undefined) => void
  //   mode: "multiple" → value?: Date[];    onValueChange?: (d: Date[]) => void; max?: number
  //   mode: "range"    → value?: DateRange; onValueChange?: (r: DateRange | undefined) => void;
  //                      minRangeDays?: number; maxRangeDays?: number
  defaultValue?: /* same union */;
  required?: boolean;              // when false (default), clicking the selected day deselects

  // Month navigation (also controllable)
  month?: Date;                    // controlled visible month
  defaultMonth?: Date;             // default: selected value's month, else today
  onMonthChange?: (month: Date) => void;
  numberOfMonths?: number;         // side-by-side months, default 1 (cap at 3)
  minDate?: Date;                  // navigation + selection lower bound
  maxDate?: Date;
  disabled?: DateMatcher | DateMatcher[];   // disabled days (distinct from min/max)
  hidden?: DateMatcher | DateMatcher[];     // days rendered blank

  // Localization — all Intl-driven
  locale?: string;                 // default: runtime locale
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;  // default: getDefaultFirstDayOfWeek(locale)
  weekdayFormat?: "long" | "short" | "narrow";  // header labels, default "short"

  // Display
  showOutsideDays?: boolean;       // trailing/leading days of adjacent months, default true
  fixedWeeks?: boolean;            // always 6 rows, default false
  showWeekNumbers?: boolean;       // ISO week number column, default false
  captionLayout?: "label" | "dropdowns";  // month/year title vs select dropdowns, default "label"
  fromYear?: number; toYear?: number;      // dropdown range (default: currentYear ± 100)

  /** Per-day custom render (dots, prices, tooltips). Receives computed day state. */
  renderDay?: (day: Date, state: CalendarDayState) => React.ReactNode;
  /** Today's date override — REQUIRED for deterministic tests/SSR snapshots. Default: new Date(). */
  today?: Date;

  // variants: appearance (house palette — colors the selected day / range),
  //           size ("sm" | "md" | "lg" — cell dimensions & font),
}

export interface CalendarDayState {
  isSelected: boolean; isRangeStart: boolean; isRangeEnd: boolean; isRangeMiddle: boolean;
  isToday: boolean; isOutside: boolean; isDisabled: boolean; isHidden: boolean; isFocused: boolean;
}
```

### 4.2 Structure & behavior (`calendar-base.tsx`)

- **Compound structure with context** (house pattern): internal `CalendarProvider` holds mode, selection, visible month, focus date, and all callbacks. Rendered tree, each part with a `data-slot`:
  - `data-slot="calendar"` (root, one `<div>` per visible month inside)
  - `calendar-header` → `calendar-prev-button` / `calendar-caption` (label or two dropdowns reusing the existing `select` component) / `calendar-next-button`
  - `calendar-grid` (`<table role="grid">`) → `calendar-weekdays` (`<th scope="col" abbr={longName}>`) → `calendar-week` rows → `calendar-day` cells (`<td>` wrapping a `<button>`)
- **Selection logic**:
  - `single`: click selects; clicking the selected day deselects unless `required`.
  - `multiple`: toggles; respects `max` (further clicks no-op, `data-selection-full` on root).
  - `range`: first click sets `{ from }`; second click completes (swap if earlier than `from`); hovering between the two paints `isRangeMiddle` via a `hoverDate` in context; clicking while a complete range exists starts a new range. Enforce `minRangeDays`/`maxRangeDays` by disabling out-of-window days while `from` is pending.
- **Keyboard navigation — full ARIA grid pattern (the hard 30%)**:
  - Roving tabindex: exactly one day button has `tabIndex=0` (the focused day; initially the selected day or today).
  - `←`/`→` ±1 day, `↑`/`↓` ±7 days, `Home`/`End` start/end of week (respecting `firstDayOfWeek`), `PageUp`/`PageDown` ±1 month, `Shift+PageUp/Down` ±1 year, `Enter`/`Space` select.
  - Moving focus past the visible month(s) navigates the month and keeps focus on the day (focus the new button after the month renders — `useEffect` on focusDate + `ref.focus({ preventScroll: true })`).
  - Disabled days are focusable-but-not-selectable (`aria-disabled`, click/Enter no-op) so keyboard users can traverse them — this matches the ARIA APG date-grid guidance.
- **ARIA**: month caption `id` ↔ `aria-labelledby` on the grid; `aria-selected` on selected cells; `aria-current="date"` on today; prev/next buttons get `aria-label` built with Intl month names ("Go to April 2026" — localize via the caption formatter); selection announcements are the consumer's concern (document; no live region inside the grid).
- **State attributes for styling**: every day button sets `data-selected`, `data-today`, `data-outside`, `data-disabled`, `data-range-start`, `data-range-end`, `data-range-middle` — variants target these (`data-[selected=true]:…`) so appearance palettes only need to color a handful of attribute selectors.
- **SSR/hydration**: the only nondeterminism is "today" and the runtime locale. Default `today` to `new Date()` but compute it once in a lazy `useState` initializer; docs recommend passing explicit `today`/`locale` in SSR-critical paths. No `Date.now()` in render bodies.

### 4.3 Design-system file (`src/design-system/calendar.ts`)

Token groups (each: fallback + `-dark` pair in the same string, chained through `--zui-color-*` where a palette color applies):

- Root: `--zui-calendar-bg`, `--zui-calendar-fg`, `--zui-calendar-border`, `--zui-calendar-radius`, `--zui-calendar-p`
- Cells: `--zui-calendar-cell-size-{sm,md,lg}`, `--zui-calendar-cell-radius`, `--zui-calendar-cell-hover-bg`
- Selected (colored by appearance): `--zui-calendar-<appearance>-selected-bg`, `…-selected-fg`
- Range middle: `--zui-calendar-<appearance>-range-bg` (a soft tint; use the appearance color at low opacity as fallback), with `data-range-start`/`data-range-end` cells getting directional radius (rounded only on the outer edge)
- Today: `--zui-calendar-today-ring`
- Muted (outside/disabled): `--zui-calendar-muted-fg`
- Header: `--zui-calendar-nav-size`, `--zui-calendar-caption-font-size`

Constants: `zuiCalendarBase`, `zuiCalendarGrid`, `zuiCalendarWeekday`, `zuiCalendarDayBase`, `zuiCalendarDayAppearances` (the full house palette keyed like badge's), `zuiCalendarSizes`, `zuiCalendarNavButton`. Day numbers get `tabular-nums`.

### 4.4 Animated variant (`animated/`)

- `animations.ts`: presets `slide` (month content slides left/right by nav direction), `fade`, `zoom`; type `CalendarAnimationPreset`.
- `calendar-animated.tsx`: wrap the month grid in `AnimatePresence mode="popLayout"` keyed by `${year}-${month}`, direction from a ref comparing old/new month. Selection pulse on the day button (`whileTap`). Respect `usePrefersReducedMotion` (already a library hook) — swap to instant transitions.

### 4.5 Tests (`calendar.test.tsx`) — always pass `today` and `locale` explicitly for determinism

1. Renders the correct grid for a fixed month (`defaultMonth: new Date(2026, 6, 1)`, `today: new Date(2026, 6, 7)`): 5 rows, July 1 under the right weekday for `firstDayOfWeek` 0 and 1.
2. Localized weekday headers + month caption for `en-US` vs `de-DE`; day numbers in `ar-EG` render Arabic-Indic digits.
3. Single select/deselect; `required` blocks deselect; controlled mode fires `onValueChange` without internal state change.
4. Multiple mode with `max`.
5. Range mode: forward pick, backward pick swaps, hover paints middle `data-range-middle`, third click restarts.
6. `minDate`/`maxDate` clamp navigation (prev button disabled at the bound) and selection; `disabled` matcher (fn + `dayOfWeek`) blocks clicks but allows focus.
7. Full keyboard matrix: arrows/Home/End/PageUp/PageDown/Shift+PageUp move focus (assert `document.activeElement` day label); arrow past month edge flips month; Enter selects.
8. Roving tabindex: exactly one `tabIndex=0` at all times.
9. `numberOfMonths=2` renders consecutive months and one shared header nav; `showOutsideDays=false` hides adjacent-month days; `fixedWeeks` renders 6 rows for a 4-row February.
10. `captionLayout="dropdowns"` month/year selection navigates.
11. `renderDay` output appears in cells with correct state flags.
12. Appearance/size variant classes land on root and day cells; a11y suite entry added under `src/accessibility` (axe pass on a rendered calendar in all three modes).

---

## 5. Component Spec: `date-picker`

A composition layer: trigger button/input + the existing `popover` + `calendar`. Study `src/ui/combobox/` first — it is the closest existing composition (trigger + floating list) and its patterns for focus return and dismissal should be mirrored.

### 5.1 API

```tsx
export interface DatePickerProps
  extends
    VariantProps<typeof datePickerVariants>,
    Pick<
      CalendarBaseProps,
      | "locale"
      | "firstDayOfWeek"
      | "minDate"
      | "maxDate"
      | "disabled"
      | "numberOfMonths"
      | "captionLayout"
      | "showOutsideDays"
      | "fixedWeeks"
      | "today"
    > {
  mode?: "single" | "range"; // (no "multiple" in the picker — calendar covers it inline)
  value?: Date | DateRange; // discriminated by mode, as in calendar
  defaultValue?: Date | DateRange;
  onValueChange?: (value: Date | DateRange | undefined) => void;

  /** Display formatting — Intl options for the trigger text. Default { dateStyle: "medium" }. */
  formatOptions?: Intl.DateTimeFormatOptions;
  /** Range separator between formatted from/to. Default: Intl formatRange when available, " – " fallback join. */
  placeholder?: string; // default localized: format a reference date's skeleton? keep simple: "Pick a date"-style prop, docs show localization
  /** Close popover on selection. Default: true for single, "on-complete" behavior for range (closes when `to` is set). */
  closeOnSelect?: boolean;
  clearable?: boolean; // small clear affordance in the trigger, default false
  disabled?: boolean; // whole-control disabled (note: calendar's day-matcher `disabled` is threaded as `disabledDates`)
  name?: string; // renders <input type="hidden"> with ISO value(s) for form posts
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void; // controllable popover
  // variants: appearance, size — trigger styled consistently with the `inputs`/`select` trigger look
}
```

Naming collision to resolve explicitly: the calendar's `disabled` (DateMatcher) is exposed on the picker as **`disabledDates`**, because the picker's own `disabled` is the standard HTML control-disabled boolean.

### 5.2 Behavior

- **Trigger**: a button styled like the library's `select`/`inputs` trigger (`data-slot="date-picker-trigger"`), showing the formatted value via the formatter cache — `formatRange` for complete ranges (with the `typeof formatter.formatRange === "function"` guard and join fallback), placeholder otherwise. `aria-haspopup="dialog"`, `aria-expanded`.
- **Popover content**: `role="dialog"` with `aria-label` ("Choose date"), containing the calendar. On open, focus moves to the selected day (or today) in the grid; on close, focus returns to the trigger; `Escape` closes — reuse whatever the existing `popover` provides and fill gaps locally, mirroring combobox.
- **Selection flow**: single → select closes (per `closeOnSelect`); range → stays open until `to` is set, then closes. Clearing (when `clearable`) resets value and keeps focus on the trigger.
- **Form integration**: hidden input(s) named `name` / `name` + `"-end"` for ranges, `yyyy-MM-dd` (build with local getters — **never `toISOString()`**, which shifts across timezones).
- **State attributes**: `data-state="open|closed"`, `data-empty`, threading through to variants.
- **Animated variant**: compose the animated popover entry (the `popover/animated` already exists) + animated calendar; presets re-exported in its own `animations.ts`.

### 5.3 Design-system file (`src/design-system/date-picker.ts`)

Trigger tokens mirroring the select/input trigger set: `--zui-date-picker-trigger-bg/fg/border/radius/h-{sm,md,lg}/px`, placeholder color `--zui-date-picker-placeholder-fg`, focus ring `--zui-date-picker-ring`, and appearance palette applied to the ring/accents (the calendar inside carries its own appearance, threaded from the picker's `appearance` prop so both always match).

### 5.4 Tests (`date-picker.test.tsx`)

1. Opens on trigger click/Enter/Space/ArrowDown; focus lands in the grid; Escape closes and returns focus to trigger.
2. Single: pick a day → formatted trigger text (`en-US` fixed expectations, e.g. "Jul 7, 2026") → popover closed; `closeOnSelect={false}` keeps it open.
3. Range: from/to flow, trigger shows formatted range (assert via the same formatter the component uses, not a hardcoded string, to stay Node-ICU-proof), closes on completion.
4. Controlled value + controlled `open`; `onValueChange`/`onOpenChange` fire correctly.
5. `clearable` clears and sets `data-empty`.
6. Hidden inputs: correct `yyyy-MM-dd` values for single and range (assert a date whose UTC day differs from local day to catch `toISOString` regressions).
7. Whole-control `disabled` blocks opening; `disabledDates` threads to the calendar.
8. Locale threading: `de-DE` trigger format + calendar weekday headers.
9. Axe pass (dialog + grid) in the a11y suite.

---

## 6. Execution Phases (each shippable)

### Phase 1 — Foundation

1. `src/ui/calendar/date-utils.ts` + `date-utils.test.ts` (§3) — get this fully green before any JSX; it is where the correctness lives.

### Phase 2 — `calendar`

2. `src/design-system/calendar.ts` + export from `src/design-system/index.ts`.
3. `src/ui/calendar/` full layering: `variants.ts`, `types.ts`, `calendar-base.tsx`, `calendar.tsx`, `animated/`, `index.ts`, `calendar.test.tsx`.
4. Register in `tsup.config.ts` (`uiComponentNames` + `uiAnimatedComponentNames`); build once to verify entries, `"use client"` prepend, and registry generation.

### Phase 3 — `date-picker`

5. `src/design-system/date-picker.ts` + index export; `src/ui/date-picker/` full layering (composes `popover` + `calendar` + `useControllableState`), animated entry, tests; register in both tsup lists.

### Phase 4 — Docs app (per component: calendar, date-picker)

6. Preview folder with sections + code examples + demos. Demo ideas: inline booking calendar (range + `disabled={{ before: today }}` + `renderDay` price dots); locale showcase row (`en-US` / `de-DE` / `ar-EG` / `ja-JP` side by side — the zero-dependency Intl story in one image); form example with hidden inputs; dropdowns caption for birthday-style year jumps.
7. Routes, SEO JSONs + `preview-seo-registry.ts`, `sidebar-data.ts` entries, `date-picker` into `lib/home-install-commands.ts`.

### Phase 5 — Finalize

8. `pnpm --filter @zentauri-ui/zentauri-components test:all` green (unit + a11y, including peer-isolation).
9. `pnpm --filter @zentauri-ui/zentauri-components update:test-health`.
10. Root `pnpm build && pnpm check-types && pnpm lint`; manual pass in the docs dev server: keyboard-only date selection, dark mode tokens, RTL sanity check with `ar` locale (`dir="rtl"` flips arrow-key direction semantics — arrows should follow visual direction; document whichever behavior ships).

## 7. Acceptance Criteria

- [ ] `…/ui/calendar`, `…/ui/calendar/animated`, `…/ui/date-picker`, `…/ui/date-picker/animated` all importable; `zentauri-ui add calendar` / `add date-picker` vendor correctly from the regenerated registry.
- [ ] Zero new dependencies; static entries free of framer-motion (peer-isolation test passes).
- [ ] A keyboard-only user can open the picker, traverse months/years, select a range, and land back on the trigger — no mouse.
- [ ] Weekday headers, month captions, first-day-of-week, and digits all follow the `locale` prop with no config (verified for `en-US`, `de-DE`, `ar-EG`).
- [ ] `addMonths` clamping, leap years, and DST-transition weeks covered by passing table-driven tests.
- [ ] No `Intl.DateTimeFormat` constructed in the day-cell render path (cache verified by a construction-count spy test).
- [ ] Every `--zui-calendar-*` / `--zui-date-picker-*` token has a fallback and paired `-dark` class in the same string; appearance keys match the house palette.
- [ ] Hidden form inputs emit local-date `yyyy-MM-dd` (timezone-shift test passes).
- [ ] Docs pages live for both slugs; sidebar/search updated; test-health surfaces regenerated.

## 8. Out of Scope (explicitly)

- **Time selection** (time-picker / datetime-picker) — separate follow-up; the calendar API deliberately never touches hours.
- **Text-input date parsing** (typing "07/07/2026" into a free-text field) — locale-aware parsing is a project of its own; the trigger is a button, not an editable input, in v1.
- **Multi-calendar systems** (Buddhist, Hebrew, Islamic month grids) — `Intl` can format them, but grid _math_ assumes ISO/Gregorian; revisit with `Temporal`.
- **Presets panel** ("Last 7 days", "This month") — v2 sugar around `date-range` values; trivial for consumers to build today.
- **`Temporal` API** — not yet Baseline; `date-utils.ts` isolates all date math so internals can migrate later without public API changes.
