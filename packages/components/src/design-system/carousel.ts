export const zuiCarouselRootBase = [
  "relative flex w-full flex-col",
  "gap-[var(--zui-carousel-stack-gap,0.75rem)]",
  "text-[color:var(--zui-carousel-fg,var(--zui-fg,#0f172a))] dark:text-[color:var(--zui-carousel-fg-dark,var(--zui-fg-dark,#f8fafc))]",
] as const;

/**
 * Accent palettes.
 *
 * Each entry only publishes `--carousel-accent`, which the active indicator and
 * the progress bar read as a `background` value. Keeping the accent to a single
 * background-only slot is what lets the `gradient-*` entries share the exact
 * same contract as the solid ones.
 */
export const zuiCarouselAppearances = {
  default:
    "[--carousel-accent:var(--zui-carousel-default-accent,var(--zui-brand,#0f172a))] dark:[--carousel-accent:var(--zui-carousel-default-accent-dark,var(--zui-brand-dark,#f8fafc))]",
  secondary:
    "[--carousel-accent:var(--zui-carousel-secondary-accent,var(--zui-fg,#475569))] dark:[--carousel-accent:var(--zui-carousel-secondary-accent-dark,var(--zui-fg-dark,#94a3b8))]",
  destructive:
    "[--carousel-accent:var(--zui-carousel-destructive-accent,var(--zui-status-error,#dc2626))] dark:[--carousel-accent:var(--zui-carousel-destructive-accent-dark,var(--zui-status-error-dark,#ef4444))]",
  blue: "[--carousel-accent:var(--zui-carousel-blue-accent,var(--zui-color-blue,#2563eb))] dark:[--carousel-accent:var(--zui-carousel-blue-accent-dark,var(--zui-color-blue-dark,#3b82f6))]",
  cyan: "[--carousel-accent:var(--zui-carousel-cyan-accent,var(--zui-color-cyan,#0891b2))] dark:[--carousel-accent:var(--zui-carousel-cyan-accent-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  green:
    "[--carousel-accent:var(--zui-carousel-green-accent,var(--zui-color-green,#16a34a))] dark:[--carousel-accent:var(--zui-carousel-green-accent-dark,var(--zui-color-green-dark,#22c55e))]",
  lime: "[--carousel-accent:var(--zui-carousel-lime-accent,var(--zui-color-lime,#65a30d))] dark:[--carousel-accent:var(--zui-carousel-lime-accent-dark,var(--zui-color-lime-dark,#a3e635))]",
  mint: "[--carousel-accent:var(--zui-carousel-mint-accent,var(--zui-color-mint,#10b981))] dark:[--carousel-accent:var(--zui-carousel-mint-accent-dark,var(--zui-color-mint-dark,#6ee7b7))]",
  ocean:
    "[--carousel-accent:var(--zui-carousel-ocean-accent,var(--zui-color-ocean,#0284c7))] dark:[--carousel-accent:var(--zui-carousel-ocean-accent-dark,var(--zui-color-ocean-dark,#38bdf8))]",
  sapphire:
    "[--carousel-accent:var(--zui-carousel-sapphire-accent,var(--zui-color-sapphire,#1d4ed8))] dark:[--carousel-accent:var(--zui-carousel-sapphire-accent-dark,var(--zui-color-sapphire-dark,#60a5fa))]",
  lavender:
    "[--carousel-accent:var(--zui-carousel-lavender-accent,var(--zui-color-lavender,#8b5cf6))] dark:[--carousel-accent:var(--zui-carousel-lavender-accent-dark,var(--zui-color-lavender-dark,#a78bfa))]",
  ruby: "[--carousel-accent:var(--zui-carousel-ruby-accent,var(--zui-color-ruby,#be123c))] dark:[--carousel-accent:var(--zui-carousel-ruby-accent-dark,var(--zui-color-ruby-dark,#fb7185))]",
  red: "[--carousel-accent:var(--zui-carousel-red-accent,var(--zui-color-red,#dc2626))] dark:[--carousel-accent:var(--zui-carousel-red-accent-dark,var(--zui-color-red-dark,#ef4444))]",
  slate:
    "[--carousel-accent:var(--zui-carousel-slate-accent,var(--zui-color-slate,#475569))] dark:[--carousel-accent:var(--zui-carousel-slate-accent-dark,var(--zui-color-slate-dark,#64748b))]",
  zinc: "[--carousel-accent:var(--zui-carousel-zinc-accent,var(--zui-color-zinc,#52525b))] dark:[--carousel-accent:var(--zui-carousel-zinc-accent-dark,var(--zui-color-zinc-dark,#71717a))]",
  royal:
    "[--carousel-accent:var(--zui-carousel-royal-accent,var(--zui-color-royal,#4338ca))] dark:[--carousel-accent:var(--zui-carousel-royal-accent-dark,var(--zui-color-royal-dark,#818cf8))]",
  electric:
    "[--carousel-accent:var(--zui-carousel-electric-accent,var(--zui-color-electric,#0ea5e9))] dark:[--carousel-accent:var(--zui-carousel-electric-accent-dark,var(--zui-color-electric-dark,#38bdf8))]",
  forest:
    "[--carousel-accent:var(--zui-carousel-forest-accent,var(--zui-color-forest,#166534))] dark:[--carousel-accent:var(--zui-carousel-forest-accent-dark,var(--zui-color-forest-dark,#4ade80))]",
  sunset:
    "[--carousel-accent:var(--zui-carousel-sunset-accent,var(--zui-color-sunset,#ea580c))] dark:[--carousel-accent:var(--zui-carousel-sunset-accent-dark,var(--zui-color-sunset-dark,#fb923c))]",
  magenta:
    "[--carousel-accent:var(--zui-carousel-magenta-accent,var(--zui-color-magenta,#c026d3))] dark:[--carousel-accent:var(--zui-carousel-magenta-accent-dark,var(--zui-color-magenta-dark,#e879f9))]",
  crimson:
    "[--carousel-accent:var(--zui-carousel-crimson-accent,var(--zui-color-crimson,#b91c1c))] dark:[--carousel-accent:var(--zui-carousel-crimson-accent-dark,var(--zui-color-crimson-dark,#f87171))]",
  emerald:
    "[--carousel-accent:var(--zui-carousel-emerald-accent,var(--zui-color-emerald,#059669))] dark:[--carousel-accent:var(--zui-carousel-emerald-accent-dark,var(--zui-color-emerald-dark,#34d399))]",
  indigo:
    "[--carousel-accent:var(--zui-carousel-indigo-accent,var(--zui-color-indigo,#4f46e5))] dark:[--carousel-accent:var(--zui-carousel-indigo-accent-dark,var(--zui-color-indigo-dark,#6366f1))]",
  purple:
    "[--carousel-accent:var(--zui-carousel-purple-accent,var(--zui-color-purple,#7c3aed))] dark:[--carousel-accent:var(--zui-carousel-purple-accent-dark,var(--zui-color-purple-dark,#8b5cf6))]",
  pink: "[--carousel-accent:var(--zui-carousel-pink-accent,var(--zui-color-pink,#db2777))] dark:[--carousel-accent:var(--zui-carousel-pink-accent-dark,var(--zui-color-pink-dark,#ec4899))]",
  rose: "[--carousel-accent:var(--zui-carousel-rose-accent,var(--zui-color-rose,#e11d48))] dark:[--carousel-accent:var(--zui-carousel-rose-accent-dark,var(--zui-color-rose-dark,#f43f5e))]",
  sky: "[--carousel-accent:var(--zui-carousel-sky-accent,var(--zui-color-sky,#0284c7))] dark:[--carousel-accent:var(--zui-carousel-sky-accent-dark,var(--zui-color-sky-dark,#38bdf8))]",
  teal: "[--carousel-accent:var(--zui-carousel-teal-accent,var(--zui-color-teal,#0d9488))] dark:[--carousel-accent:var(--zui-carousel-teal-accent-dark,var(--zui-color-teal-dark,#2dd4bf))]",
  yellow:
    "[--carousel-accent:var(--zui-carousel-yellow-accent,var(--zui-color-yellow,#ca8a04))] dark:[--carousel-accent:var(--zui-carousel-yellow-accent-dark,var(--zui-color-yellow-dark,#eab308))]",
  orange:
    "[--carousel-accent:var(--zui-carousel-orange-accent,var(--zui-color-orange,#ea580c))] dark:[--carousel-accent:var(--zui-carousel-orange-accent-dark,var(--zui-color-orange-dark,#f97316))]",
  "gradient-blue":
    "[--carousel-accent:var(--zui-carousel-gradient-blue-accent,linear-gradient(90deg,#2563eb,#7c3aed))] dark:[--carousel-accent:var(--zui-carousel-gradient-blue-accent-dark,linear-gradient(90deg,#3b82f6,#8b5cf6))]",
  "gradient-green":
    "[--carousel-accent:var(--zui-carousel-gradient-green-accent,linear-gradient(90deg,#16a34a,#0d9488))] dark:[--carousel-accent:var(--zui-carousel-gradient-green-accent-dark,linear-gradient(90deg,#22c55e,#2dd4bf))]",
  "gradient-red":
    "[--carousel-accent:var(--zui-carousel-gradient-red-accent,linear-gradient(90deg,#dc2626,#db2777))] dark:[--carousel-accent:var(--zui-carousel-gradient-red-accent-dark,linear-gradient(90deg,#ef4444,#ec4899))]",
  "gradient-yellow":
    "[--carousel-accent:var(--zui-carousel-gradient-yellow-accent,linear-gradient(90deg,#ca8a04,#ea580c))] dark:[--carousel-accent:var(--zui-carousel-gradient-yellow-accent-dark,linear-gradient(90deg,#eab308,#f97316))]",
  "gradient-purple":
    "[--carousel-accent:var(--zui-carousel-gradient-purple-accent,linear-gradient(90deg,#7c3aed,#db2777))] dark:[--carousel-accent:var(--zui-carousel-gradient-purple-accent-dark,linear-gradient(90deg,#8b5cf6,#ec4899))]",
  "gradient-teal":
    "[--carousel-accent:var(--zui-carousel-gradient-teal-accent,linear-gradient(90deg,#0d9488,#0284c7))] dark:[--carousel-accent:var(--zui-carousel-gradient-teal-accent-dark,linear-gradient(90deg,#2dd4bf,#38bdf8))]",
  "gradient-indigo":
    "[--carousel-accent:var(--zui-carousel-gradient-indigo-accent,linear-gradient(90deg,#4f46e5,#7c3aed))] dark:[--carousel-accent:var(--zui-carousel-gradient-indigo-accent-dark,linear-gradient(90deg,#6366f1,#8b5cf6))]",
  "gradient-pink":
    "[--carousel-accent:var(--zui-carousel-gradient-pink-accent,linear-gradient(90deg,#db2777,#e11d48))] dark:[--carousel-accent:var(--zui-carousel-gradient-pink-accent-dark,linear-gradient(90deg,#ec4899,#f43f5e))]",
  "gradient-orange":
    "[--carousel-accent:var(--zui-carousel-gradient-orange-accent,linear-gradient(90deg,#ea580c,#ca8a04))] dark:[--carousel-accent:var(--zui-carousel-gradient-orange-accent-dark,linear-gradient(90deg,#f97316,#eab308))]",
} as const;

/**
 * Size scale.
 *
 * `--carousel-gap` is the single source of truth for inter-slide spacing: the
 * track uses it as its flex `gap`, and the base component folds the very same
 * variable into the slide width and the track offset so the transform always
 * lands exactly on a slide boundary.
 */
export const zuiCarouselSizes = {
  sm: "[--carousel-gap:0.5rem] [--carousel-control:1.75rem] text-xs",
  md: "[--carousel-gap:0.75rem] [--carousel-control:2.25rem] text-sm",
  lg: "[--carousel-gap:1rem] [--carousel-control:2.75rem] text-base",
} as const;

export const zuiCarouselViewportBase = [
  "relative w-full overflow-hidden",
  // Slides are sized with a percentage `flex-basis`, which intrinsic sizing
  // resolves against content — so without containment every slide's width sums
  // into the carousel's min-content width, and any ancestor that sizes to
  // content (a one-column grid on a phone, say) inherits that demand and
  // overflows the screen. `min-width: 0` cannot fix this; size containment can.
  // Only the inline axis is contained, so height still comes from the slides.
  "[contain:inline-size]",
  "rounded-[var(--zui-carousel-radius,var(--zui-radius,0.75rem))]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "focus-visible:ring-[var(--zui-carousel-focus-ring,var(--zui-focus-ring,#475569))] dark:focus-visible:ring-[var(--zui-carousel-focus-ring-dark,var(--zui-focus-ring-dark,#dbe3ec))]",
  "ring-offset-[var(--zui-carousel-ring-offset,var(--zui-ring-offset,#f8fafc))] dark:ring-offset-[var(--zui-carousel-ring-offset-dark,var(--zui-ring-offset-dark,#020618))]",
] as const;

/**
 * A vertical carousel needs a definite main-axis size before percentage slide
 * widths can resolve, so the viewport carries a themeable default height that
 * consumers can replace with the token or a plain `className`.
 */
export const zuiCarouselViewportOrientations = {
  horizontal: "",
  vertical: "h-[var(--zui-carousel-vertical-height,18rem)]",
} as const;

export const zuiCarouselFrames = {
  none: "",
  bordered:
    "border border-[color:var(--zui-carousel-frame-border,var(--zui-border,#e2e8f0))] dark:border-[color:var(--zui-carousel-frame-border-dark,var(--zui-border-dark,#1e293b))]",
  card: "border border-[color:var(--zui-carousel-frame-border,var(--zui-border,#e2e8f0))] dark:border-[color:var(--zui-carousel-frame-border-dark,var(--zui-border-dark,#1e293b))] bg-[var(--zui-carousel-frame-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-carousel-frame-bg-dark,var(--zui-surface-dark,#0f172a))] p-[var(--zui-carousel-frame-padding,0.75rem)] shadow-[var(--zui-carousel-frame-shadow,var(--zui-shadow,0_1px_2px_#0f172a14))] dark:shadow-[var(--zui-carousel-frame-shadow-dark,var(--zui-shadow-dark,0_1px_2px_#0f172a1f))]",
  glass:
    "border border-[color:var(--zui-carousel-glass-border,#ffffff33)] dark:border-[color:var(--zui-carousel-glass-border-dark,#ffffff1a)] bg-[var(--zui-carousel-glass-bg,#ffffff14)] dark:bg-[var(--zui-carousel-glass-bg-dark,#0f172a52)] p-[var(--zui-carousel-frame-padding,0.75rem)] backdrop-blur-md",
} as const;

export const zuiCarouselTrackBase = [
  "flex h-full w-full will-change-transform",
  "gap-[var(--carousel-gap,0.75rem)]",
  "transition-transform duration-[var(--zui-carousel-duration,320ms)] ease-[var(--zui-carousel-easing,cubic-bezier(0.22,1,0.36,1))]",
  "data-[dragging=true]:transition-none motion-reduce:transition-none",
] as const;

/**
 * The offset is applied as an explicit `transform` rather than a `translate-*`
 * utility so `transition-transform` above is guaranteed to animate it on every
 * Tailwind version.
 */
export const zuiCarouselTrackOrientations = {
  horizontal: "flex-row [transform:translateX(var(--carousel-offset,0px))]",
  vertical: "flex-col [transform:translateY(var(--carousel-offset,0px))]",
} as const;

export const zuiCarouselItemBase = [
  "relative min-h-0 min-w-0 shrink-0 grow-0",
  "basis-[var(--carousel-item-size,100%)]",
] as const;

export const zuiCarouselDragModes = {
  none: "",
  horizontal: "touch-pan-y select-none data-[dragging=true]:cursor-grabbing",
  vertical: "touch-pan-x select-none data-[dragging=true]:cursor-grabbing",
} as const;

export const zuiCarouselControlsBase =
  "flex items-center justify-between gap-[var(--zui-carousel-controls-gap,0.75rem)]";

export const zuiCarouselControlBase = [
  "inline-flex shrink-0 cursor-pointer items-center justify-center",
  "size-[var(--carousel-control,2.25rem)]",
  "rounded-[var(--zui-carousel-control-radius,9999px)]",
  "border border-[color:var(--zui-carousel-control-border,var(--zui-border,#e2e8f0))] dark:border-[color:var(--zui-carousel-control-border-dark,var(--zui-border-dark,#1e293b))]",
  "bg-[var(--zui-carousel-control-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-carousel-control-bg-dark,var(--zui-surface-dark,#0f172a))]",
  "text-[color:var(--zui-carousel-control-fg,var(--zui-fg,#0f172a))] dark:text-[color:var(--zui-carousel-control-fg-dark,var(--zui-fg-dark,#f8fafc))]",
  "shadow-[var(--zui-carousel-control-shadow,var(--zui-shadow,0_1px_2px_#0f172a14))] dark:shadow-[var(--zui-carousel-control-shadow-dark,var(--zui-shadow-dark,0_1px_2px_#0f172a1f))]",
  "transition-colors",
  "hover:bg-[var(--zui-carousel-control-bg-hover,var(--zui-surface-hover,#f1f5f9))] dark:hover:bg-[var(--zui-carousel-control-bg-hover-dark,var(--zui-surface-hover-dark,#1e293b))]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "focus-visible:ring-[var(--zui-carousel-focus-ring,var(--zui-focus-ring,#475569))] dark:focus-visible:ring-[var(--zui-carousel-focus-ring-dark,var(--zui-focus-ring-dark,#dbe3ec))]",
  "ring-offset-[var(--zui-carousel-ring-offset,var(--zui-ring-offset,#f8fafc))] dark:ring-offset-[var(--zui-carousel-ring-offset-dark,var(--zui-ring-offset-dark,#020618))]",
  "disabled:pointer-events-none disabled:opacity-40",
] as const;

/**
 * Control placement, keyed by `<placement>-<orientation>-<side>`.
 *
 * `outside` collapses to a single entry because a control rendered in the
 * controls row is laid out by that row, not by itself.
 */
export const zuiCarouselControlPositions = {
  "inside-horizontal-previous":
    "absolute top-1/2 left-[var(--zui-carousel-control-inset,0.75rem)] z-10 -translate-y-1/2",
  "inside-horizontal-next":
    "absolute top-1/2 right-[var(--zui-carousel-control-inset,0.75rem)] z-10 -translate-y-1/2",
  "inside-vertical-previous":
    "absolute left-1/2 top-[var(--zui-carousel-control-inset,0.75rem)] z-10 -translate-x-1/2",
  "inside-vertical-next":
    "absolute left-1/2 bottom-[var(--zui-carousel-control-inset,0.75rem)] z-10 -translate-x-1/2",
  outside: "relative",
} as const;

export const zuiCarouselDotsBase =
  "flex items-center justify-center gap-[var(--zui-carousel-dots-gap,0.375rem)]";

export const zuiCarouselDotsOrientations = {
  horizontal: "flex-row",
  vertical: "flex-col",
} as const;

export const zuiCarouselDotBase = [
  "shrink-0 cursor-pointer rounded-full",
  "bg-[var(--zui-carousel-dot-bg,var(--zui-fg-muted,#94a3b8))] dark:bg-[var(--zui-carousel-dot-bg-dark,var(--zui-fg-muted-dark,#64748b))]",
  "opacity-40 transition-[opacity,transform,background] duration-[var(--zui-carousel-duration,320ms)] motion-reduce:transition-none",
  "hover:opacity-70",
  "data-[active=true]:opacity-100 data-[active=true]:scale-125 data-[active=true]:[background:var(--carousel-accent,#0f172a)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "focus-visible:ring-[var(--zui-carousel-focus-ring,var(--zui-focus-ring,#475569))] dark:focus-visible:ring-[var(--zui-carousel-focus-ring-dark,var(--zui-focus-ring-dark,#dbe3ec))]",
  "ring-offset-[var(--zui-carousel-ring-offset,var(--zui-ring-offset,#f8fafc))] dark:ring-offset-[var(--zui-carousel-ring-offset-dark,var(--zui-ring-offset-dark,#020618))]",
] as const;

export const zuiCarouselDotSizes = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
} as const;

export const zuiCarouselCounterBase =
  "tabular-nums font-medium text-[color:var(--zui-carousel-counter-fg,var(--zui-fg-muted,#64748b))] dark:text-[color:var(--zui-carousel-counter-fg-dark,var(--zui-fg-muted-dark,#94a3b8))]";

export const zuiCarouselProgressBase =
  "relative h-[var(--zui-carousel-progress-height,0.25rem)] w-full overflow-hidden rounded-full bg-[var(--zui-carousel-progress-track-bg,var(--zui-surface-muted,#e2e8f0))] dark:bg-[var(--zui-carousel-progress-track-bg-dark,var(--zui-surface-muted-dark,#1e293b))]";

export const zuiCarouselProgressBarBase =
  "h-full w-[var(--carousel-progress,0%)] rounded-full [background:var(--carousel-accent,#0f172a)] transition-[width] duration-[var(--zui-carousel-duration,320ms)] ease-[var(--zui-carousel-easing,cubic-bezier(0.22,1,0.36,1))] motion-reduce:transition-none";
