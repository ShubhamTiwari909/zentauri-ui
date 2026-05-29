# Zentauri UI — Feature Roadmap

> **Baseline audit** — `packages/components` v1.7.0  
> Written: May 2026

---

## What Exists Today

### UI Components (29)
`accordion` · `alert` · `avatar` · `badge` · `breadcrumb` · `buttons` · `card` · `divider` · `drawer` · `dropdown` · `dynamic-stepper` · `empty-state` · `file-upload` · `inputs` (text / textarea / checkbox / radio / date as variants) · `modal` · `pagination` · `progress` · `search` · `select` · `skeleton` · `slider` · `spinner` · `stepper` · `table` · `tabs` · `toast` · `toggle` · `tooltip` · `typography`

### Charts (5)
`AreaChart` · `BarChart` · `BubbleChart` · `LineChart` · `PieChart`

### Hooks (27)
`useBodyScrollLock` · `useClickOutside` · `useClipboard` · `useControllableState` · `useDebouncedValue` · `useDisclosure` · `useDocumentTitle` · `useDynamicStepper` · `useFocusManagement` · `useHover` · `useInView` · `useIntersectionObserver` · `useIsMounted` · `useIsomorphicLayoutEffect` · `useLocalStorage` · `useMediaQuery` · `useNetworkStatus` · `usePageVisibility` · `usePagination` · `usePrefersColorScheme` · `usePrefersReducedMotion` · `useResizeObserver` · `useSessionStorage` · `useThrottledCallback` · `useToggle` · `useWindowSize`

### Architecture strengths
- Full light/dark mode via scoped CSS variables (`--zui-*`)
- Per-component `animated/` split — Framer Motion is optional
- CVA-based variants; 15+ colour palettes + gradient + glass on most components
- ESM + CJS dual build with granular exports
- CLI (`zentauri-ui add …`) to vendor source into the consumer app
- Recharts wrapper for charts, well-typed generics

---

## What's Missing (Gap Analysis)

The sections below are grouped by **impact tier** — roughly how much end-product quality a feature unlocks versus implementation effort.

---

## Tier 1 — High Impact, Foundational Gaps

These are primitives that almost every real app needs and that competitors (shadcn/ui, Radix, Mantine) already ship.

### 1. `Checkbox` & `RadioGroup` — standalone components

**Gap:** `Input` bundles `as="checkbox"` and `as="radio"` as variants but there's no dedicated `Checkbox` or `RadioGroup` with group state, indeterminate support, or composable layout.

**Why now:** Every form in existence uses one of these. Keeping them inside `Input` forces consumers to work around the API. Standalone components can have their own design tokens (`--zui-checkbox-*`), their own animated variant (animated check-draw via Framer Motion), and a `RadioGroup` compound that handles exclusive selection internally.

**Proposed API:**
```tsx
<Checkbox checked={checked} onCheckedChange={setChecked} indeterminate>
  Accept terms
</Checkbox>

<RadioGroup value={val} onValueChange={setVal}>
  <RadioGroupItem value="a" label="Option A" />
  <RadioGroupItem value="b" label="Option B" />
</RadioGroup>
```

**Animated variant idea:** SVG path animation for the checkmark stroke on mount, spring-based thumb movement for radio selection.

---

### 2. `Calendar` & `DatePicker`

**Gap:** Not present at all. `Input as="date"` defers to the browser's native picker which looks different across every OS/browser.

**Why now:** Date selection is one of the most common pain points in UI kits. A headless calendar grid with a popover trigger is table stakes in 2025–2026.

**Proposed API:**
```tsx
<DatePicker value={date} onValueChange={setDate} />

<Calendar
  mode="single" | "range" | "multiple"
  selected={date}
  onSelect={setDate}
  disabledDates={[…]}
/>
```

**Differentiator:** Use the `Intl.DateTimeFormat` API (no external dependency) for locale-aware month/day names. Add a `CalendarAnimated` variant with a slide + fade between months. Support `--zui-calendar-*` tokens so consumers can theme header, day cells, and selected state independently.

---

### 3. `Popover`

**Gap:** Only `Tooltip` exists (non-interactive, hover-only). There's no `Popover` for interactive floating content (forms, menus, rich info panels).

**Why now:** Popovers are one of the most-reached-for primitives. Tooltip's semantics (non-focusable, hover-triggered) are wrong for any interactive content.

**Proposed API:**
```tsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent side="bottom" align="start">
    <p>Rich interactive content here</p>
  </PopoverContent>
</Popover>
```

**Implementation note:** Can reuse the position logic from `Tooltip`. Use the `Floating UI` micro-library (or a minimal custom hook) for placement — it handles viewport overflow, flipping, and arrow positioning. Add `PopoverAnimated` with scale + fade entry.

---

### 4. `CommandPalette` (`Cmd+K`)

**Gap:** Not present. This is arguably the most coveted modern UI pattern of 2024–2026 (pioneered by Linear, adopted everywhere from Vercel to Figma).

**Why now:** It's a differentiator that immediately makes the library feel "2025." Combining the existing `useClickOutside`, `useDisclosure`, and `search/filter-search-suggestions` utilities with a modal overlay produces a world-class result.

**Proposed API:**
```tsx
<Command>
  <CommandInput placeholder="Search commands…" />
  <CommandList>
    <CommandGroup heading="Navigation">
      <CommandItem onSelect={() => router.push("/")}>Home</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Actions">
      <CommandItem>Create new project</CommandItem>
    </CommandGroup>
    <CommandEmpty>No results found.</CommandEmpty>
  </CommandList>
</Command>
```

**Animated variant idea:** Full-screen dimmed backdrop with the palette dropping in via spring (`y: -20 → 0`, opacity fade). Keyboard navigation (↑ ↓ Enter Esc) built-in via `useFocusManagement`.

---

### 5. `OTPInput`

**Gap:** Not present. One-time password inputs have exploded in usage (auth flows, 2FA, payment verification).

**Why now:** It's a focused, self-contained component with a very clear UX contract. Extremely popular in design system showcases. Easy to make distinctive with animated per-cell focus rings.

**Proposed API:**
```tsx
<OTPInput
  length={6}
  value={otp}
  onComplete={(value) => verify(value)}
  appearance="default" | "outline" | "glass"
/>
```

**Differentiator:** Animated caret that slides between cells. Auto-advance on input, auto-backspace on delete. Paste detection that fills all cells at once. Accessible `role="group"` with individual `aria-label` per cell.

---

### 6. `ScrollArea`

**Gap:** Not present. The browser default scrollbar is ugly and platform-inconsistent. Table already has `overflow-x-auto` baked in but there's no reusable, themeable scroll container.

**Proposed API:**
```tsx
<ScrollArea className="h-72">
  <div>…long content…</div>
</ScrollArea>
```

**Implementation:** Pure CSS custom scrollbar via `--zui-scrollbar-*` tokens + thin overlay scrollbars. No JavaScript dependency. Add `ScrollAreaAnimated` for a hide/show thumb animation on hover.

---

## Tier 2 — Experience & Delight

These add meaningful UX surface area and are the features that make a library stand out visually.

### 7. `TagInput` / `MultiSelect`

**Gap:** `Select` is single-value only. There's no way to select and display multiple values as removable chips/tags.

**Proposed API:**
```tsx
<TagInput
  value={tags}
  onValueChange={setTags}
  suggestions={allOptions}
  maxTags={10}
  allowCreate
/>

<MultiSelect
  options={options}
  value={selected}
  onValueChange={setSelected}
  placeholder="Select frameworks…"
/>
```

**Differentiator:** Tag add/remove animations (scale in, slide out). The `allowCreate` prop lets users mint new tags on Enter. Uses the existing `Badge` component for tag display, maintaining visual consistency.

---

### 8. `ContextMenu` (Right-click)

**Gap:** Not present. Right-click menus are underserved in most libraries despite being very common in dashboards and data-heavy UIs.

**Proposed API:**
```tsx
<ContextMenu>
  <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>More actions</ContextMenuSubTrigger>
      <ContextMenuSubContent>…</ContextMenuSubContent>
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>
```

Shares the same variants and tokens as `Dropdown`, so adding this is mostly a matter of swapping the trigger mechanism.

---

### 9. `NavigationMenu` & `Sidebar`

**Gap:** No navigation primitives. Every app has a nav; forcing consumers to build their own from scratch from `Dropdown` is friction.

**NavigationMenu** — horizontal mega-menu bar with flyout panel support:
```tsx
<NavigationMenu>
  <NavigationMenuItem>
    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
    <NavigationMenuContent>…rich panel…</NavigationMenuContent>
  </NavigationMenuItem>
</NavigationMenu>
```

**Sidebar** — collapsible side navigation with icon-only collapsed state, group headers, and active-item highlighting. Pairs with `useLocalStorage` (already present) to persist collapsed state.

---

### 10. `Timeline`

**Gap:** Not present. Timelines are common in changelogs, activity feeds, and project trackers — and visually impressive in showcases.

**Proposed API:**
```tsx
<Timeline>
  <TimelineItem>
    <TimelineIndicator />
    <TimelineContent>
      <TimelineTitle>Deployed v2.0</TimelineTitle>
      <TimelineDescription>2026-05-01</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

**Animated variant:** Each item fades in with a staggered delay using Framer Motion's `staggerChildren`. The connector line draws from top to bottom as items enter the viewport (tie into the existing `useInView` hook).

---

### 11. `TreeView`

**Gap:** Not present. File explorers, org charts, nested config — tree views recur constantly in developer tools and enterprise dashboards.

**Proposed API:**
```tsx
<TreeView
  data={nodes}
  defaultExpanded={["root"]}
  onSelect={(node) => …}
  renderNode={({ node, depth, isExpanded }) => …}
/>
```

Keyboard navigation (arrow keys to expand/collapse, Enter to select), `aria-tree` semantics, animated expand/collapse via `AnimatePresence`.

---

### 12. `ResizablePanels`

**Gap:** Not present. Split-pane layouts (code editor + preview, sidebar + main) are core to many developer tools.

**Proposed API:**
```tsx
<ResizableGroup direction="horizontal">
  <ResizablePanel defaultSize={30} minSize={20}>
    Left panel
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Right panel</ResizablePanel>
</ResizableGroup>
```

Uses a `useResizeObserver` (already present) + pointer events approach. Persist sizes via `useLocalStorage`.

---

### 13. `Rating`

**Gap:** Not present. Stars, thumbs, and emoji ratings are everywhere — reviews, feedback forms, surveys.

**Proposed API:**
```tsx
<Rating value={3.5} max={5} onValueChange={setRating} allowHalf />
```

**Differentiator:** Animated fill on hover using a clip-path transition. Supports custom icons (star, heart, flame). Accessible with `role="radiogroup"`.

---

### 14. Enhanced Charts

**Gap:** The current 5 charts (Area, Bar, Bubble, Line, Pie) cover the basics but miss:

- **Donut Chart** — `PieChart` with `innerRadius` works but deserves a first-class `DonutChart` component with a center slot for a metric value.
- **Radar / Spider Chart** — common in analytics dashboards.
- **Scatter Plot** — distinct from Bubble; used for correlation analysis.
- **Heatmap** — calendar heatmaps (GitHub-style contribution graphs) are visually iconic and frequently requested.
- **Sparkline** — tiny inline charts for data tables and KPI cards. No axis, no legend — just a trend line.

**Donut example:**
```tsx
<DonutChart data={data} dataKey="value" nameKey="label" centerLabel="Total" centerValue={1200} />
```

**Sparkline example:**
```tsx
<Sparkline data={data} dataKey="revenue" color="emerald" height={32} />
```

---

## Tier 3 — Micro-Interactions & "Wow Factor"

These are the features that make developers tweet about a library. They require moderate effort but deliver outsized visual impact.

### 15. `AnimatedNumber` / `CountUp`

A single-purpose component that animates a number from a start value to an end value using a spring or easing curve. Pairs perfectly with the existing charts and KPI card patterns.

```tsx
<AnimatedNumber value={12_450} duration={1.2} format={(n) => `$${n.toLocaleString()}`} />
```

Implemented as a pure Framer Motion `useSpring` wrapper. Zero external dependencies beyond what's already peer-installed.

---

### 16. `Marquee` / Infinite Ticker

A horizontal (or vertical) auto-scrolling ticker — infinite logos, testimonials, notification banners. Exploded in 2024 landing pages and shows no sign of slowing.

```tsx
<Marquee speed={40} pauseOnHover gap={24}>
  {logos.map((l) => <img key={l} src={l} />)}
</Marquee>
```

Pure CSS `animation: marquee` with a duplicated children trick for seamless looping. No Framer Motion needed. Extremely low bundle cost.

---

### 17. `AnimatedGradientText`

A text component with an animated moving gradient — very popular in hero sections and feature callouts in 2025.

```tsx
<AnimatedGradientText gradient="blue-purple" animate speed={3}>
  Introducing Zentauri UI v2
</AnimatedGradientText>
```

Implemented with a CSS `background-size: 200%` + `@keyframes gradient-shift` animation. Pure CSS — zero JS overhead.

---

### 18. `Spotlight` / `GlowCard` Effect

Interactive glow that follows the mouse cursor across a card or panel — popularised by Linear's homepage, widely copied since.

```tsx
<SpotlightCard>
  <Card>Normal card content, but with cursor-following glow</Card>
</SpotlightCard>
```

Uses `useHover` + `useRef` to track `mousemove`, updates a CSS custom property `--mouse-x / --mouse-y`, and paints a radial gradient via `::before`. Zero runtime dependencies.

---

### 19. `CopyButton`

A small button that copies text to the clipboard and transitions through idle → copying → copied states with animated icon swap. The `useClipboard` hook is already present — this is just the UI layer on top.

```tsx
<CopyButton value={codeString} timeout={2000} />
```

Animated icon transition: clipboard icon → checkmark with a quick spring scale.

---

### 20. `Kbd` (Keyboard Key)

A display component for keyboard shortcuts. Simple but absent from most libraries, yet essential for command palette UIs, tooltip hints, and documentation.

```tsx
<Kbd keys={["⌘", "K"]} />
<Kbd keys={["Ctrl", "Shift", "P"]} />
```

Styled to match OS-native key caps. Pairs naturally with `CommandPalette` and `Tooltip`.

---

## Tier 4 — Developer Experience & Architecture

These aren't visual components but multiply the value of everything else.

### 21. `Form` Primitive (Validation-agnostic)

**Gap:** No `Form`, `FormField`, `FormLabel`, `FormMessage`, or `FormDescription` components. Every consumer is gluing these together manually with their own spacing and error-display logic.

The form layer should be library-agnostic — working with React Hook Form, Zod, or plain `useState`. Think of it as layout + semantics, not validation logic.

```tsx
<Form onSubmit={handleSubmit}>
  <FormField name="email">
    <FormLabel>Email</FormLabel>
    <Input type="email" />
    <FormDescription>We'll never share your email.</FormDescription>
    <FormMessage>{errors.email?.message}</FormMessage>
  </FormField>
</Form>
```

---

### 22. `useVirtualList` Hook

**Gap:** No virtualization hook or component. Long lists (1000+ items) rendered naively tank performance. The existing `useIntersectionObserver` is a building block but not a full solution.

```ts
const { virtualItems, totalHeight, containerRef } = useVirtualList({
  items,
  itemHeight: 48,
  overscan: 5,
});
```

A from-scratch implementation requires ~80 lines. No external dependency needed given the already-present `useResizeObserver` and `useScrollPosition`.

---

### 23. `useFormField` Hook

Pairs with the `Form` primitive above. Provides `id`, `name`, `error`, `isDirty`, `isTouched` to any consumer via context — so custom inputs can wire up ARIA attributes correctly without prop drilling.

---

### 24. Compound Pattern Audit

Several components — `Drawer`, `Modal`, `Tabs`, `Accordion` — already use compound component patterns. But `Dropdown`, `Select`, and `Tooltip` still have monolithic APIs. Refactoring these to expose their sub-parts (trigger, content, item, separator) would make them far more composable without breaking the default export.

---

### 25. `useScrollSpy` Hook

Tracks which section is currently in the viewport for sticky navigation highlights. Works with the existing `useIntersectionObserver` as a thin wrapper. Very useful for documentation sites and landing pages built on this library.

---

## Implementation Priority Order

| Priority | Feature | Effort | Why first |
|----------|---------|--------|-----------|
| 1 | `Checkbox` + `RadioGroup` | Low | Fills a foundational gap; every form needs these |
| 2 | `Popover` | Low | Reuses Tooltip positioning; unblocks 4+ other components |
| 3 | `OTPInput` | Low | High showcase value, self-contained |
| 4 | `CopyButton` + `Kbd` | Low | Hooks already exist; mostly styling |
| 5 | `ScrollArea` | Low | Pure CSS, zero deps |
| 6 | `AnimatedNumber` | Low | Uses existing Framer Motion peer dep |
| 7 | `Marquee` + `AnimatedGradientText` | Low | Pure CSS, huge landing-page wow factor |
| 8 | `CommandPalette` | Medium | Combines existing hooks + search utils |
| 9 | `Calendar` + `DatePicker` | Medium | No dep (Intl API), high demand |
| 10 | `TagInput` / `MultiSelect` | Medium | Reuses Badge + Dropdown patterns |
| 11 | `ContextMenu` | Medium | Shares Dropdown tokens |
| 12 | `Form` primitive | Medium | Multiplies value of all input components |
| 13 | `Timeline` | Medium | Great for showcases + real apps |
| 14 | `Donut` + `Sparkline` charts | Medium | Low marginal cost on top of existing chart infra |
| 15 | `Rating` | Medium | Visually distinctive, accessible |
| 16 | `TreeView` | Medium–High | Keyboard nav + accessibility is non-trivial |
| 17 | `NavigationMenu` + `Sidebar` | Medium–High | High breadth; needs responsive design decisions |
| 18 | `SpotlightCard` / `GlowCard` | Low | Pure CSS + existing useHover hook |
| 19 | `ResizablePanels` | High | Pointer events + persistence logic |
| 20 | `useVirtualList` | Medium | Algorithm correctness + edge cases |

---

## Differentiation Strategy

Most component libraries in 2025–2026 converge on the same set of primitives. Zentauri UI's current strengths — the `--zui-*` CSS variable token system, the `animated/` split, and the massive colour palette — are already distinctive. The additions above should double down on that identity:

1. **Every new component gets a `animated/` variant** — not just fade, but purposeful motion (check-draw, counter spring, marquee glide, staggered list entry).
2. **The CSS variable contract is sacred** — every new component documents its tokens so consumers can theme without touching source.
3. **AI-era components** — consider a `StreamingText` component (character-by-character reveal with a blinking cursor) and a `ThinkingIndicator` (animated dots/pulse) — these are immediately relevant in 2026 as every app ships some LLM feature.
4. **Keep zero mandatory JS deps** — the `Marquee`, `AnimatedGradientText`, `Kbd`, and `CopyButton` can all be pure CSS + the existing peer deps. That keeps the base bundle minimal for consumers who opt out of Framer Motion.
5. **CLI-first** — every new component should be `zentauri-ui add calendar` ready from day one. Consumers who vendor source get full ownership; consumers who import from the package get the themed defaults. This is the developer experience moat.
