# RFC: Circular Menu

Version: 1.0
Library: Zentauri UI
Component: `circular-menu` · `CircularMenu` · "Circular Menu"
Token prefix: `--zui-circular-menu-*`
Category: Navigation
Animated entry: yes
Status: Planned

---

# 1. Overview

`CircularMenu` is a fully customizable radial (circular / arc) menu. A center
trigger opens N items laid out on a circle around it. Everything about the
layout is a prop **and** a CSS variable: item count, radius, container size,
start angle, arc sweep, direction, item size, continuous rotation, and how each
item orients itself while the ring spins.

Use cases:

- Radial quick-action launcher (Figma/Blender-style tool wheel)
- Floating action button that fans out into actions
- Game / creative-tool context wheel
- Dashboard "hub" navigation
- Share menu, emoji/reaction picker, color wheel picker
- Decorative orbit ring (`trigger="always"` + `spin`)

The starting point for this RFC is the prototype at
`packages/components/src/ui/circular-menu/circular-menu.tsx`. That file is a
scratch sketch and is **replaced** by this plan (see §11).

---

# 2. Goals / non-goals

**Goals**

- Pure-math layout in a testable helper — no magic numbers in JSX.
- Full arc control: full circle, half circle, quarter arc, any `startAngle`.
- Accessible menu semantics: real `button` trigger, `role="menu"`/`menuitem`,
  roving tabindex, arrow-key navigation around the ring, Escape to close.
- Static entry with **zero** framer-motion (CSS-only spin + transitions).
- Animated entry with staggered radial open/close and rAF-free spin.
- Every themeable value routed through the `--zui-*` contract, light + dark.
- Both a shorthand `items` API and a compound (`CircularMenu.Root`) API.

**Non-goals**

- Nested / multi-level radial submenus (future enhancement, §14).
- Drag-to-select gesture wheel (future enhancement).
- Portal/collision handling — the menu lays out inside its own box; consumers
  position that box.

---

# 3. Public API

## 3.1 Shorthand

```tsx
import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu";

<CircularMenu
  label="Actions"
  appearance="primary"
  size="md"
  items={[
    { id: "copy", label: "Copy", icon: <CopyIcon />, onSelect: () => copy() },
    { id: "share", label: "Share", icon: <ShareIcon />, href: "/share" },
    { id: "trash", label: "Delete", icon: <TrashIcon />, disabled: true },
  ]}
/>;
```

## 3.2 Compound

```tsx
<CircularMenu.Root radius={160} sweep={180} startAngle={-90} trigger="click">
  <CircularMenu.Trigger>Menu</CircularMenu.Trigger>
  <CircularMenu.List>
    <CircularMenu.Item onSelect={copy}>
      <CircularMenu.ItemIcon>
        <CopyIcon />
      </CircularMenu.ItemIcon>
      <CircularMenu.ItemLabel>Copy</CircularMenu.ItemLabel>
    </CircularMenu.Item>
    {/* … */}
  </CircularMenu.List>
</CircularMenu.Root>
```

`CircularMenu.List` assigns each child its ring index (via
`Children.toArray` + an index context), so `Item` never takes an index prop.

## 3.3 Animated

```tsx
import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu/animated";

<CircularMenu animation="pop" stagger={0.04} items={items} />;
```

## 3.4 Props — `CircularMenuRootProps`

Extends `Omit<ComponentPropsWithRef<"div">, "children" | "onSelect">`.

| Prop               | Type                                                  | Default       | Notes                                                                  |
| ------------------ | ----------------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| `appearance`       | `CircularMenuAppearance`                              | `"default"`   | 18 palettes (§4.3)                                                     |
| `size`             | `"sm" \| "md" \| "lg"`                                | `"md"`        | Sets radius / item / trigger token defaults                            |
| `radius`           | `number` (px)                                         | from `size`   | Emits `--zui-circular-menu-radius`                                     |
| `boxSize`          | `number` (px)                                         | auto          | Auto = `2 * (radius + itemSize / 2)`; emits `--zui-circular-menu-size` |
| `itemSize`         | `number` (px)                                         | from `size`   | Emits `--zui-circular-menu-item-size`                                  |
| `startAngle`       | `number` (deg)                                        | `0`           | `0` = 12 o'clock, positive = clockwise                                 |
| `sweep`            | `number` (deg)                                        | `360`         | `360` = closed ring; `<360` = open arc, endpoints inclusive            |
| `direction`        | `"clockwise" \| "counterclockwise"`                   | `"clockwise"` |                                                                        |
| `trigger`          | `"hover" \| "click" \| "always"`                      | `"click"`     | `hover` also opens on click/focus (a11y); `always` = static ring       |
| `open`             | `boolean`                                             | —             | Controlled                                                             |
| `defaultOpen`      | `boolean`                                             | `false`       |                                                                        |
| `onOpenChange`     | `(open: boolean) => void`                             | —             |                                                                        |
| `closeOnSelect`    | `boolean`                                             | `true`        |                                                                        |
| `closeOnEscape`    | `boolean`                                             | `true`        |                                                                        |
| `closeOnOutside`   | `boolean`                                             | `true`        | Uses `useClickOutside`                                                 |
| `spin`             | `boolean`                                             | `false`       | Continuous ring rotation                                               |
| `spinDuration`     | `number` (s)                                          | `12`          | Emits `--zui-circular-menu-spin-duration`                              |
| `spinPauseOnHover` | `boolean`                                             | `true`        |                                                                        |
| `itemRotation`     | `"upright" \| "follow"`                               | `"upright"`   | `upright` counter-rotates items while spinning                         |
| `showSpokes`       | `boolean`                                             | `false`       | Renders a line from center to each item                                |
| `labelPlacement`   | `"tooltip" \| "outside" \| "inside" \| "none"`        | `"tooltip"`   | Where `ItemLabel` sits. `tooltip` reveals it on hover and focus        |
| `label`            | `ReactNode`                                           | `"Menu"`      | Trigger content + accessible name for the menu                         |
| `items`            | `CircularMenuItemData[]`                              | —             | Shorthand only; ignored when composing children                        |
| `onSelect`         | `(item: CircularMenuItemData, index: number) => void` | —             | Fires after the item's own `onSelect`                                  |
| `disabled`         | `boolean`                                             | `false`       | Trigger + all items                                                    |

`CircularMenuItemData`:

```ts
type CircularMenuItemData = {
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  disabled?: boolean;
  appearance?: CircularMenuAppearance; // per-item override
  onSelect?: () => void;
};
```

`CircularMenuProps` = `CircularMenuRootProps` + `{ children?: ReactNode }`.

## 3.5 Sub-component props

`CircularMenuTriggerProps` (`button`), `CircularMenuListProps` (`div`),
`CircularMenuItemProps` (`button`, with `onSelect`, `disabled`, `href`),
`CircularMenuItemIconProps` (`span`), `CircularMenuItemLabelProps` (`span`),
`CircularMenuSpokeProps` (`span`).

## 3.6 Context

```ts
type CircularMenuContextValue = {
  isOpen: boolean;
  isDisabled: boolean;
  state: "open" | "closed";
  appearance: CircularMenuAppearance;
  size: CircularMenuSize;
  triggerMode: CircularMenuTriggerMode;
  activeIndex: number;
  spin: boolean;
  counterSpin: boolean;
  spinDuration: number;
  spinPauseOnHover: boolean;
  itemRotation: CircularMenuItemRotation;
  labelPlacement: CircularMenuLabelPlacement;
  showSpokes: boolean;
  triggerId: string;
  listId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setActiveIndex: (index: number) => void;
  registerItem: (index: number, node: HTMLElement | null) => void;
  focusItem: (index: number) => void;
  selectItem: (index: number, itemOnSelect?: () => void) => void;
  handleListKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  handleTriggerKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
};
```

Item count and solved positions are **not** on this context. Ring geometry is
owned by a second, layout context (`CircularMenuLayoutContextValue`: `radius`,
`startAngle`, `sweep`, `direction`, `itemSize`) that `CircularMenu.List` reads
to solve one position per child — so the count always matches what was actually
rendered, in both the shorthand and composed cases. `List` publishes each slot
through `CircularMenuItemSlot`, which is why `CircularMenu.Item` never takes an
index prop. Both `useCircularMenuContext` and `useCircularMenuLayout` are
exported for consumers building a custom ring body.

`selectItem` runs the item's own `onSelect`, then the root `onSelect`, then
closes when `closeOnSelect` is set. Composed items (no `items` array) are
reported to the root callback as `{ id: String(index) }`.

---

# 4. Geometry & layout

## 4.1 `geometry.ts` (pure, unit-tested)

```ts
const DEG = Math.PI / 180;

export type CircularMenuPosition = {
  index: number;
  angle: number; // degrees, 0 = 12 o'clock, positive clockwise
  x: number; // px offset from center
  y: number; // px offset from center (negative = up)
};

export function getCircularMenuPositions({
  count,
  radius,
  startAngle = 0,
  sweep = 360,
  direction = "clockwise",
}: {
  count: number;
  radius: number;
  startAngle?: number;
  sweep?: number;
  direction?: "clockwise" | "counterclockwise";
}): CircularMenuPosition[] {
  if (count <= 0) return [];
  const closed = Math.abs(sweep) >= 360;
  const span = closed ? 360 : sweep;
  // Closed ring: divide by count so first and last don't collide.
  // Open arc: divide by count - 1 so both endpoints land on the arc ends.
  const step = count === 1 ? 0 : closed ? span / count : span / (count - 1);
  const sign = direction === "counterclockwise" ? -1 : 1;

  return Array.from({ length: count }, (_, index) => {
    const angle = startAngle + sign * step * index;
    const rad = angle * DEG;
    return {
      index,
      angle,
      x: Math.sin(rad) * radius,
      y: -Math.cos(rad) * radius,
    };
  });
}

export function getCircularMenuBoxSize(radius: number, itemSize: number) {
  return Math.ceil(2 * (radius + itemSize / 2));
}
```

> **Hydration:** `angle`, `x`, and `y` are rounded to four decimals. `Math.sin`
> may differ in its last bits between Node and the browser, and an unrounded
> offset then serializes differently on the server and the client, which trips
> React's hydration check. Four decimals is far below one device pixel. For the
> same reason `--zui-circular-menu-item-index` is written as a string: React
> serializes numeric custom properties differently across the two passes.

> **Prototype fix:** the sketch used `y = Math.cos(angle) * radius`, which puts
> item 0 at **6 o'clock** and makes the ring run counterclockwise. Negating `y`
> gives the intuitive "first item at 12 o'clock, clockwise" default.

## 4.2 Positioning in the DOM

The root is `position: relative` with a square box (`--zui-circular-menu-size`).
Both trigger and each item are centered with `left/top: 50%` +
`translate(-50%, -50%)`, then displaced by their own offsets, which are passed
as **inline CSS variables** (not inline transforms) so consumers can override
per item with CSS:

```tsx
style={{
  "--zui-circular-menu-item-x": `${position.x}px`,
  "--zui-circular-menu-item-y": `${position.y}px`,
  "--zui-circular-menu-item-angle": `${position.angle}deg`,
}}
```

and the token string does:

```
translate-x-[var(--zui-circular-menu-item-x,0px)]
translate-y-[var(--zui-circular-menu-item-y,0px)]
```

(applied on an inner positioner element, so the item disc keeps its own
`scale`/`rotate` transforms free for open/close animation).

## 4.3 Appearances (18, house style)

`default`, `primary`, `secondary`, `success`, `destructive`, `warning`, `info`,
`blue`, `violet`, `emerald`, `amber`, `rose`, `slate`, `zinc`,
`gradient-blue`, `gradient-violet`, `gradient-rose`, `glass`.

## 4.4 Sizes

| size | radius | itemSize | triggerSize | text        |
| ---- | ------ | -------- | ----------- | ----------- |
| `sm` | 96px   | 32px     | 48px        | `text-xs`   |
| `md` | 132px  | 40px     | 64px        | `text-sm`   |
| `lg` | 180px  | 52px     | 80px        | `text-base` |

Sizes are emitted as arbitrary-property token setters, e.g.
`"[--zui-circular-menu-radius:132px] [--zui-circular-menu-item-size:40px] …"`,
so numeric props simply override the same variables inline.

---

# 5. Spin without framer-motion

The static entry must not import motion. Continuous rotation is CSS:

- `List` (the ring wrapper) gets Tailwind's `animate-spin` **plus** overrides:
  `[animation-duration:var(--zui-circular-menu-spin-duration,12s)]`,
  `[animation-timing-function:linear]`,
  and `motion-reduce:animate-none`.
- When `itemRotation="upright"`, each item's inner disc gets the same
  `animate-spin` with `[animation-direction:reverse]`, cancelling the ring
  rotation so icons/labels stay readable.
- `spinPauseOnHover` → `data-spin-paused` on the root plus
  `group-data-[spin-paused=true]/circular-menu:[animation-play-state:paused]`.

> **Tailwind gotcha:** use the real `animate-spin` utility and override its
> duration/direction. Writing the whole thing as an arbitrary property
> (`[animation:spin_12s_linear_infinite]`) does not guarantee Tailwind emits the
> `spin` keyframes, so the ring silently won't move in a consumer app.

> **Tailwind v4 gotcha (transitions):** v4 moved `scale`, `translate`, and
> `rotate` off `transform` and onto their own CSS properties. An explicit
> transition list that names only `transform` therefore never animates a
> `scale-*` or `translate-*` utility — the item positioner transitions
> `[translate,opacity]` and the discs and trigger name `scale` alongside
> `transform`.

> **Prototype fix:** the sketch drove rotation through `setRotation()` inside
> `requestAnimationFrame`, i.e. a React re-render every frame, and its
> `useEffect` had an empty dependency array while reading `isRotation`, so
> toggling never started or stopped the loop. CSS removes both problems.

---

# 6. Interaction & accessibility

- **Trigger**: `<button type="button">` with `aria-haspopup="menu"`,
  `aria-expanded`, `aria-controls={listId}`.
- **List**: `role="menu"`, `aria-labelledby={triggerId}`, `aria-orientation`
  omitted (radial). Kept mounted when closed but marked `inert` +
  `aria-hidden="true"` + `pointer-events-none` so animations can run and the
  closed ring never receives focus or clicks.
- **Items**: `role="menuitem"`, roving `tabIndex` (`0` for `activeIndex`, `-1`
  otherwise), `aria-disabled` for disabled items. `href` renders an `<a>` with
  `role="menuitem"`.
- **Keyboard**

  | Key                        | On trigger         | On item                         |
  | -------------------------- | ------------------ | ------------------------------- |
  | `Enter` / `Space`          | toggle             | select                          |
  | `ArrowDown` / `ArrowRight` | open + focus first | next item (wraps)               |
  | `ArrowUp` / `ArrowLeft`    | open + focus last  | previous item (wraps)           |
  | `Home` / `End`             | —                  | first / last item               |
  | `Escape`                   | —                  | close + return focus to trigger |
  | `Tab`                      | —                  | close, let focus move on        |

- `trigger="hover"` opens on `pointerenter` of the trigger and closes on
  `pointerleave` of the **root** (as in the prototype), but _also_ opens on
  click and on keyboard focus — hover alone is not operable by keyboard or
  touch.
- Respect `prefers-reduced-motion` everywhere (`motion-reduce:*`), including
  disabling `spin`.
- Disabled root: trigger `disabled`, all items `aria-disabled`, no open.

> **Prototype fix:** the sketch's trigger was a hover-only `<div>` with no role,
> no focus handling, and `class=` instead of `className`.

---

# 7. Data attributes

| Element         | `data-slot`                     | Other                                                                                          |
| --------------- | ------------------------------- | ---------------------------------------------------------------------------------------------- |
| root            | `circular-menu`                 | `data-state`, `data-appearance`, `data-size`, `data-spin`, `data-spin-paused`, `data-disabled` |
| trigger         | `circular-menu-trigger`         | `data-state`                                                                                   |
| list            | `circular-menu-list`            | `data-state`, `data-spin`                                                                      |
| item positioner | `circular-menu-item-positioner` | `data-index`, `data-angle`                                                                     |
| item            | `circular-menu-item`            | `data-index`, `data-active`, `data-disabled`                                                   |
| item icon       | `circular-menu-item-icon`       | —                                                                                              |
| item label      | `circular-menu-item-label`      | `data-placement`                                                                               |
| spoke           | `circular-menu-spoke`           | `data-index`                                                                                   |

---

# 8. Phase A — library package (`packages/components`)

### A1. `src/design-system/circular-menu.ts` (NEW)

Pure `const` string exports only — the file may import **only** from within
`src/design-system` (enforced by `scripts/check-design-tokens.mjs`).

```ts
export const zuiCircularMenuRootBase =
  "group/circular-menu relative isolate inline-block [block-size:var(--zui-circular-menu-size,300px)] [inline-size:var(--zui-circular-menu-size,300px)]";

export const zuiCircularMenuTriggerBase = "…";
export const zuiCircularMenuListBase = "…";
export const zuiCircularMenuItemPositionerBase = "…";
export const zuiCircularMenuItemBase = "…";
export const zuiCircularMenuItemIconBase = "…";
export const zuiCircularMenuItemLabelBase = "…";
export const zuiCircularMenuSpokeBase = "…";

export const zuiCircularMenuSizes = { sm: "…", md: "…", lg: "…" } as const;
export const zuiCircularMenuLabelPlacements = {
  inside: "…",
  outside: "…",
  tooltip: "…",
  none: "sr-only",
} as const;

export const zuiCircularMenuTriggerAppearances = {
  /* 18 keys */
} as const;
export const zuiCircularMenuItemAppearances = {
  /* 18 keys */
} as const;
export const zuiCircularMenuSpokeAppearances = {
  /* 18 keys */
} as const;

// Alias used by the public appearance type.
export const zuiCircularMenuAppearances = zuiCircularMenuItemAppearances;
```

Token contract rules the guard enforces — bake them in from the first line:

1. Every `var(--zui-…)` needs a **fallback**: `var(--zui-x, var(--zui-color-blue, #2563eb))`.
2. Every colour-bearing appearance entry must reference `--zui-*` **and**
   include dark coverage (`dark:` classes / `-dark` token names) in the
   _same_ string.
3. No raw Tailwind colour utilities (`bg-blue-500`) and no raw colour
   functions outside the fallback position.
4. Every `--zui-circular-menu-*` token you define must be **read** somewhere in
   package source — orphan tokens fail `check-design-tokens`.

Roles per appearance (each with a `-dark` twin):
`trigger-bg`, `trigger-border`, `trigger-fg`, `item-bg`, `item-border`,
`item-fg`, `item-hover-bg`, `item-active-bg`, `label-fg`, `spoke-bg`.
Plus non-appearance tokens: `size`, `radius`, `item-size`, `trigger-size`,
`item-x`, `item-y`, `item-angle`, `spin-duration`, `transition-duration`,
`stagger`, `focus-ring`.

### A2. `src/design-system/index.ts` (EDIT)

Add `export * from "./circular-menu";` between `./checkbox` and `./code-block`
(line ~14).

### A3. `src/ui/circular-menu/geometry.ts` (NEW)

The pure helpers from §4.1. No React, no Tailwind.

### A4. `src/ui/circular-menu/variants.ts` (NEW)

`cva()` wiring only, importing exclusively from
`../../design-system/circular-menu`:

`circularMenuVariants` (root: `size`), `circularMenuTriggerVariants`
(`appearance`), `circularMenuListVariants`, `circularMenuItemVariants`
(`appearance`), `circularMenuItemIconVariants`,
`circularMenuItemLabelVariants` (`placement`), `circularMenuSpokeVariants`
(`appearance`).

### A5. `src/ui/circular-menu/types.ts` (NEW)

Everything in §3.4–3.6, plus:

```ts
export type CircularMenuCssProperties = CSSProperties & {
  "--zui-circular-menu-size"?: string;
  "--zui-circular-menu-radius"?: string;
  "--zui-circular-menu-item-size"?: string;
  "--zui-circular-menu-spin-duration"?: string;
  "--zui-circular-menu-item-x"?: string;
  "--zui-circular-menu-item-y"?: string;
  "--zui-circular-menu-item-angle"?: string;
};
export type CircularMenuRef = HTMLDivElement;
```

Use `ComponentPropsWithRef<…>` (React 19 style ref-in-props) — match
`slide-to-complete/types.ts`; no `forwardRef`.

### A6. `src/ui/circular-menu/circular-menu-base.tsx` (NEW)

`"use client"` first line. Contains:

- `CircularMenuContext` + `useCircularMenuContext(component)` that throws
  `must be used within <CircularMenu.Root>`.
- `CircularMenuItemIndexContext` (default `0`).
- `composeRefs` helper (copy the shape used in `slide-to-complete-base.tsx`).
- `CircularMenuRoot` — owns open state (controlled/uncontrolled via
  `useControllableState`), `activeIndex`, item node registry, geometry memo,
  inline CSS-variable style, pointer/keyboard handlers, outside-click close.
- `CircularMenuTrigger`, `CircularMenuList` (injects index context per child),
  `CircularMenuItem`, `CircularMenuItemIcon`, `CircularMenuItemLabel`,
  `CircularMenuSpoke` — each stamping its `data-slot` and setting
  `displayName`.
- `CircularMenuImpl` — the shorthand that renders trigger + list from `items`.
- `export const CircularMenu = Object.assign(CircularMenuImpl, { Root, Trigger, List, Item, ItemIcon, ItemLabel, Spoke })`
  with `CircularMenuImpl.displayName = "CircularMenu"`.
- `export { useCircularMenuContext }`.

Root skeleton (abbreviated):

```tsx
const positions = useMemo(
  () =>
    getCircularMenuPositions({ count, radius, startAngle, sweep, direction }),
  [count, radius, startAngle, sweep, direction],
);

const resolvedBoxSize = boxSize ?? getCircularMenuBoxSize(radius, itemSize);

return (
  <div
    ref={composeRefs(ref, registerRoot)}
    data-slot="circular-menu"
    data-state={isOpen ? "open" : "closed"}
    data-appearance={appearance}
    data-size={size}
    data-spin={spin || undefined}
    data-disabled={disabled || undefined}
    className={cn(circularMenuVariants({ size }), className)}
    style={
      {
        "--zui-circular-menu-size": `${resolvedBoxSize}px`,
        "--zui-circular-menu-radius": `${radius}px`,
        "--zui-circular-menu-item-size": `${itemSize}px`,
        "--zui-circular-menu-spin-duration": `${spinDuration}s`,
        ...style,
      } as CircularMenuCssProperties
    }
    onPointerEnter={trigger === "hover" ? open : undefined}
    onPointerLeave={trigger === "hover" ? close : undefined}
    {...rest}
  >
    <CircularMenuContext.Provider value={ctx}>
      {children}
    </CircularMenuContext.Provider>
  </div>
);
```

`List` index injection:

```tsx
{
  Children.toArray(children).map((child, index) => (
    <CircularMenuItemIndexContext.Provider key={index} value={index}>
      {child}
    </CircularMenuItemIndexContext.Provider>
  ));
}
```

### A7. `src/ui/circular-menu/circular-menu.tsx` (REPLACE the prototype)

```ts
// circular-menu.tsx — default static entry (no framer-motion)
export { CircularMenu } from "./circular-menu-base";
```

### A8. `src/ui/circular-menu/animated/` (NEW)

- `animations.ts`

  ```ts
  export type CircularMenuAnimation =
    | "none"
    | "fade"
    | "scale"
    | "pop"
    | "spiral";

  export type CircularMenuAnimationPreset = {
    transition: Transition;
    // Resolved targets rather than variant labels: the ring body is itself a
    // motion component, so concrete targets keep each disc's reveal
    // independent of framer-motion's variant propagation.
    states: Record<"closed" | "open", TargetAndTransition>;
  };

  export const circularMenuItemAnimationPresets: CircularMenuAnimationPresets =
    {
      /* closed/open variants; `pop` uses a spring, `spiral` animates rotate + radius */
    };
  ```

- `types.ts` — `CircularMenuAnimatedProps = CircularMenuRootProps & { animation?: CircularMenuAnimation; stagger?: number; ref?: Ref<HTMLDivElement> }`.
- `circular-menu-animated.tsx` — `"use client"`, `import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from "framer-motion"`.
  Items are `motion.button` with `custom={index}` and
  `transition={{ delay: index * stagger }}`; spin uses `useAnimationFrame` +
  a `MotionValue` rotation (no per-frame React state), gated on
  `usePrefersReducedMotion()`.
  Reuses the base's variants and `CircularMenuItemIcon`/`ItemLabel`/`Spoke`.
- `index.ts` — `"use client"` + re-export `CircularMenu` (animated), prop types,
  `CircularMenuAnimation`, presets, and the shared sub-components from
  `../circular-menu-base`.

### A9. `src/ui/circular-menu/index.ts` (NEW)

`"use client"` then re-export the component, every prop/variant/context type,
the `circularMenu*Variants`, and the geometry helpers (`getCircularMenuPositions`,
`getCircularMenuBoxSize`, `CircularMenuPosition`) — they're genuinely useful to
consumers building custom rings.

### A10. Tests — `src/ui/circular-menu/circular-menu.test.tsx` (NEW)

Target ~16 tests:

1. `CircularMenu.displayName === "CircularMenu"`.
2. Root stamps `data-slot="circular-menu"`.
3. `ref` forwards to the root element.
4. `className` passthrough.
5. Closed by default: trigger has `aria-expanded="false"`, list is `inert`.
6. Click on trigger opens (`aria-expanded="true"`, `data-state="open"`).
7. Renders one `role="menuitem"` per `items` entry.
8. Geometry: first item at 12 o'clock (`x≈0`, `y≈-radius`), clockwise order.
9. Geometry: `sweep={180}` places the last item at the arc end; `count === 1`
   sits at `startAngle`; `count === 0` returns `[]`.
10. `boxSize` auto-derives to `2 * (radius + itemSize / 2)`.
11. `ArrowRight`/`ArrowLeft` move roving focus and wrap.
12. `Escape` closes and returns focus to the trigger.
13. Selecting an item calls the item's `onSelect`, then root `onSelect`, and
    closes when `closeOnSelect`.
14. A `disabled` item is `aria-disabled` and does not fire `onSelect`.
15. `spin` sets `data-spin` on root/list and the list carries `animate-spin`
    plus `motion-reduce:animate-none`.
16. Compound composition renders the same slots as the shorthand.
17. Animated entry smoke test: render the animated `CircularMenu` and assert
    the same slots. Follow `bento-grid.test.tsx` — framer-motion's
    `useReducedMotion` caches `matchMedia` **once per module**, so the
    `window.matchMedia` stub must be installed in `beforeAll` before the first
    animated render, and reduced-motion behaviour belongs in a separate
    `circular-menu.reduced-motion.test.tsx` (same split as
    `bento-grid.reduced-motion.test.tsx`).

### A11. `tsup.config.ts` (EDIT)

- `uiComponentNames`: add `"circular-menu"` after `"checkbox"`.
- `uiAnimatedComponentNames`: add `"circular-menu"` after `"checkbox"`.

No `package.json` `exports` edit — `./ui/*` and `./ui/*/animated` are wildcards.

### A12. `packages/components/package.json` (EDIT)

`2.11.0` → `2.12.0` (new component = minor).

---

# 9. Phase B — generated artifacts (run, never hand-edit)

```bash
pnpm --filter @zentauri-ui/zentauri-components run generate:registry
```

```bash
pnpm --filter @zentauri-ui/zentauri-components run generate:props
```

```bash
pnpm --filter @zentauri-ui/zentauri-components run update:test-health
```

Then confirm the guards pass (they also run on `prepack`):

```bash
pnpm --filter @zentauri-ui/zentauri-components exec node scripts/check-design-tokens.mjs
```

Generated files to commit, unedited: `cli/registry.json` (should list
`circular-menu` with `framer-motion` under `peerHints` for the animated entry),
`cli/props.json`, `apps/component-library/components/home/marketing/package-health-data.ts`,
and the marked test tables in `packages/components/README.md` +
`apps/component-library/README.md`.

---

# 10. Phase C — docs app (`apps/component-library`)

| #   | File                                                             | Action                                                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C1  | `app/preview/components/circular-menu/page.tsx`                  | NEW — `getPreviewSeo("circular-menu")`, `previewSeoDocumentToMetadata`, render `<CircularMenuPreviewPage seo={seo} />`                                                                                                                                       |
| C2  | `components/preview/circular-menu/index.tsx`                     | NEW — `PreviewPageShell` → hero, code examples, `<PreviewApiSection slug="circular-menu" />`, `<PreviewSeoDoc doc={seo} />`                                                                                                                                  |
| C3  | `components/preview/circular-menu/sections/hero.tsx`             | NEW — `Section variant="hero"` + `PreviewHeroSeoBlock` + 2–3 live rings (full circle, half arc, spinning)                                                                                                                                                    |
| C4  | `components/preview/circular-menu/sections/snippet-sections.tsx` | NEW — `<h2>`, intro `<p>`, `<CircularMenuPlayground />`, then labelled `<p>` + `PreviewCodeShowcase` rows for the extra demos                                                                                                                                |
| C5  | `…/sections/components/data.ts`                                  | NEW — `CIRCULAR_MENU_APPEARANCES`, `_SIZES`, `_TRIGGERS`, `_SWEEPS`, `_ITEM_ROTATIONS`, each `as const satisfies readonly NonNullable<CircularMenuProps["…"]>[]`                                                                                             |
| C6  | `…/sections/components/types.ts`                                 | NEW — demo prop types derived from library types                                                                                                                                                                                                             |
| C7  | `…/sections/components/demo.tsx`                                 | NEW — renders static vs animated based on the `animation` prop                                                                                                                                                                                               |
| C8  | `…/sections/components/snippets.ts`                              | NEW — `circularMenuSnippet(opts)` using `variantLeadComment`, omitting default-valued attributes; plus `circularMenuArcSnippet()`, `circularMenuControlledSnippet()`                                                                                         |
| C9  | `…/sections/components/playground.tsx`                           | NEW — `"use client"`; `Select`-driven controls for appearance / size / trigger / sweep / itemRotation, numeric controls for item count (3–12) and radius, toggles for `spin` / `showSpokes` / `disabled`, then `PreviewCodeShowcase` + an appearance gallery |
| C10 | `…/sections/components/arc-demo.tsx`                             | NEW — quarter/half-arc FAB example                                                                                                                                                                                                                           |
| C11 | `content/seo/preview/components/circular-menu.json`              | NEW — `category: "Navigation"`, one `h1` (hero) + `h2[]`, `intro`, `useCases`, `faqs`, `sections`, `useCasesSectionHeading`                                                                                                                                  |
| C12 | `lib/preview-seo-registry.ts`                                    | EDIT — `import circularMenu from "@/content/seo/preview/components/circular-menu.json";` + `"circular-menu": circularMenu as PreviewSeoDocument,`                                                                                                            |
| C13 | `components/css-variables/data/circular-menu.ts`                 | NEW — `defineCssVariableReference({ title, description, lightVariables, darkExamples, darkVariableCount })`; `darkVariableCount` **must** equal the number of dark entries                                                                                   |
| C14 | `components/css-variables/reference-data.ts`                     | EDIT — import + `"circular-menu": circularMenuCssVariables,`                                                                                                                                                                                                 |
| C15 | `components/sidebar/sidebar-data.ts`                             | EDIT — `{ title: "Circular Menu", href: "/preview/components/circular-menu" }` between **Checkbox** and **Code Block** (line ~220)                                                                                                                           |
| C16 | `components/introduction/data.ts`                                | EDIT — `{ id, name: "Circular Menu", description, href, badge: "Navigation" }` in alphabetical position                                                                                                                                                      |
| C17 | `lib/site-search-entries.ts`                                     | **NO EDIT** — derived from `sidebar*Data`                                                                                                                                                                                                                    |
| C18 | `lib/home-install-commands.ts`                                   | **Decision: skip.** `CLI_ADD_COMMANDS` is a curated shortlist; add `circular-menu` only if it should be promoted on the homepage                                                                                                                             |

Playground gotcha (learned from the slide-to-complete page): `CircularMenu`
renders its own `<button>` elements, so the appearance-gallery tiles must be
`role="button"` `div`s wrapping an `inert` `pointer-events-none` preview — a
`<button>` cannot nest inside a `<button>`.

---

# 11. The prototype file

`packages/components/src/ui/circular-menu/circular-menu.tsx` is currently an
untracked sketch (`export default function App()`, `class=` instead of
`className`, untyped params, control form inline). It is **not** shippable and
gets overwritten by A7. Its useful content — the `Array.from` ring math and the
hover-to-open idea — is carried into `geometry.ts` and the root's trigger
handling. The three prototype controls (`itemsCount`, `radius`, `size`) become
docs-app **playground** controls (C9), not library props on a control form.

Concrete prototype→plan fixes: `y` sign (§4.1), rAF-in-state spin and the
empty-dependency effect (§5), hover-only non-semantic trigger (§6), and
`size` no longer needing to be set by hand (auto box size, §4.1).

---

# 12. Phase D — verification

```bash
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/circular-menu/circular-menu.test.tsx
```

```bash
pnpm --filter @zentauri-ui/zentauri-components build
```

```bash
pnpm check-types
```

```bash
pnpm lint
```

```bash
pnpm format
```

Then run the docs app and check `/preview/components/circular-menu` in **light
and dark**: ring geometry at several item counts, arc mode, spin (and that it
stops under reduced motion), Show output / Show code toggle, keyboard walk
around the ring, sidebar link, in-site search hit, and the CSS-variable
reference table.

> Node quirk: the default shell Node is v14 — `nvm use v20.13.1` before any
> pnpm / turbo / vitest command.

---

# 13. Folder structure

```
packages/components/src/
  design-system/
    circular-menu.ts            (NEW)
    index.ts                    (EDIT)
  ui/circular-menu/
    geometry.ts                 (NEW)
    variants.ts                 (NEW)
    types.ts                    (NEW)
    circular-menu-base.tsx      (NEW)
    circular-menu.tsx           (REPLACE prototype)
    circular-menu.test.tsx      (NEW)
    circular-menu.reduced-motion.test.tsx (NEW)
    index.ts                    (NEW)
    animated/
      animations.ts             (NEW)
      types.ts                  (NEW)
      circular-menu-animated.tsx(NEW)
      index.ts                  (NEW)
  tsup.config.ts                (EDIT: both name lists)
packages/components/package.json (EDIT: 2.12.0)
```

---

# 14. Future enhancements

- Nested radial submenus (`CircularMenu.Sub`) that expand to an outer ring.
- Drag-to-select gesture wheel (press center, drag toward a sector, release).
- `sweep` auto-fit: solve the arc from item count and item size so discs never
  overlap.
- Pointer-follow rotation (ring eases so the nearest item faces the cursor).
- `useCircularLayout` hook exported from `src/hooks/` for arbitrary radial
  layouts (charts, avatars, orbit decorations).
