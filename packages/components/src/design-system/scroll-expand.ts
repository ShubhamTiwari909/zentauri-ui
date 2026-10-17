// Public tokens are --zui-scroll-expand-*; --_se-* properties are private.
// Layout is pure CSS: a tall track holds a sticky stage, so the section has
// its final height before any script runs. Scripts only write clip-path,
// transforms and opacity. Reduced motion shows the expanded state without
// pinning or scroll-linked movement.

export const zuiScrollExpandBase =
  "group/se relative isolate block w-full [--_se-radius:var(--zui-scroll-expand-radius,24px)] dark:[--_se-radius:var(--zui-scroll-expand-radius-dark,var(--zui-scroll-expand-radius,24px))] bg-[color:var(--zui-scroll-expand-bg,transparent)] dark:bg-[color:var(--zui-scroll-expand-bg-dark,transparent)]";

export const zuiScrollExpandScrollers = {
  window: "[container-type:inline-size] [--_se-stage:100svh]",
  self: "h-full overflow-x-hidden overflow-y-auto overscroll-contain [container-type:size] [scrollbar-width:thin] [--_se-stage:100cqh] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[color:var(--zui-scroll-expand-focus-ring,#0369a1)] dark:focus-visible:outline-[color:var(--zui-scroll-expand-focus-ring-dark,#38bdf8)] forced-colors:focus-visible:outline-[Highlight]",
} as const;

// Scrim gradient, headline/overlay colour and hint colour per appearance.
export const zuiScrollExpandAppearances = {
  default:
    "[--_se-scrim:var(--zui-scroll-expand-scrim,linear-gradient(to_top,#020617d9,#0206171f_45%,#02061766))] dark:[--_se-scrim:var(--zui-scroll-expand-scrim-dark,linear-gradient(to_top,#000000d9,#0000001f_45%,#00000066))] [--_se-fg:var(--zui-scroll-expand-fg,#ffffff)] dark:[--_se-fg:var(--zui-scroll-expand-fg-dark,#ffffff)] [--_se-hint:var(--zui-scroll-expand-hint,#475569)] dark:[--_se-hint:var(--zui-scroll-expand-hint-dark,#ffffff8c)]",
  light:
    "[--_se-scrim:var(--zui-scroll-expand-light-scrim,linear-gradient(to_top,#ffffffe6,#ffffff26_45%,#ffffff73))] dark:[--_se-scrim:var(--zui-scroll-expand-light-scrim-dark,linear-gradient(to_top,#f8fafce6,#f8fafc26_45%,#f8fafc73))] [--_se-fg:var(--zui-scroll-expand-light-fg,#0f172a)] dark:[--_se-fg:var(--zui-scroll-expand-light-fg-dark,#0f172a)] [--_se-hint:var(--zui-scroll-expand-light-hint,#475569)] dark:[--_se-hint:var(--zui-scroll-expand-light-hint-dark,#cbd5e1)]",
  contrast:
    "[--_se-scrim:var(--zui-scroll-expand-contrast-scrim,linear-gradient(to_top,#000000f2,#00000066_50%,#000000a6))] dark:[--_se-scrim:var(--zui-scroll-expand-contrast-scrim-dark,linear-gradient(to_top,#000000f2,#00000066_50%,#000000a6))] [--_se-fg:var(--zui-scroll-expand-contrast-fg,#ffffff)] dark:[--_se-fg:var(--zui-scroll-expand-contrast-fg-dark,#ffffff)] [--_se-hint:var(--zui-scroll-expand-contrast-hint,#0f172a)] dark:[--_se-hint:var(--zui-scroll-expand-contrast-hint-dark,#ffffffb3)]",
  tint: "[--_se-scrim:var(--zui-scroll-expand-tint-scrim,linear-gradient(to_top,#312e81e6,#4338ca33_45%,#1e1b4b80))] dark:[--_se-scrim:var(--zui-scroll-expand-tint-scrim-dark,linear-gradient(to_top,#1e1b4bf2,#4338ca40_45%,#1e1b4b8c))] [--_se-fg:var(--zui-scroll-expand-tint-fg,#eef2ff)] dark:[--_se-fg:var(--zui-scroll-expand-tint-fg-dark,#eef2ff)] [--_se-hint:var(--zui-scroll-expand-tint-hint,#4338ca)] dark:[--_se-hint:var(--zui-scroll-expand-tint-hint-dark,#a5b4fc)]",
} as const;

export const zuiScrollExpandTrack =
  "relative w-full motion-reduce:h-[var(--_se-stage)]!";

export const zuiScrollExpandStage =
  "sticky top-0 h-[var(--_se-stage)] w-full overflow-hidden";

export const zuiScrollExpandFrame =
  "absolute inset-0 overflow-hidden motion-reduce:[clip-path:none]!";

export const zuiScrollExpandMedia =
  "pointer-events-none absolute inset-0 block size-full max-w-none object-cover select-none [transform-origin:50%_50%] [-webkit-user-drag:none] motion-reduce:[transform:none]!";

export const zuiScrollExpandScrim =
  "pointer-events-none absolute inset-0 [background:var(--_se-scrim)] opacity-0 motion-reduce:opacity-100!";

export const zuiScrollExpandOverlay =
  "absolute inset-0 flex flex-col items-center justify-center gap-3 p-[6%] text-center text-[color:var(--_se-fg)] opacity-0 motion-reduce:justify-end motion-reduce:opacity-100! motion-reduce:[transform:none]!";

export const zuiScrollExpandTitle =
  "pointer-events-none absolute inset-0 m-0 flex items-center justify-center px-[6%] text-center leading-none text-[color:var(--_se-fg)] font-[number:var(--zui-scroll-expand-title-weight,700)] dark:font-[number:var(--zui-scroll-expand-title-weight-dark,var(--zui-scroll-expand-title-weight,700))] tracking-[var(--zui-scroll-expand-title-tracking,-0.03em)] dark:tracking-[var(--zui-scroll-expand-title-tracking-dark,var(--zui-scroll-expand-title-tracking,-0.03em))] text-[length:var(--zui-scroll-expand-title-size,clamp(1.75rem,7.5cqi,5.25rem))] dark:text-[length:var(--zui-scroll-expand-title-size-dark,var(--zui-scroll-expand-title-size,clamp(1.75rem,7.5cqi,5.25rem)))] [text-shadow:var(--zui-scroll-expand-title-shadow,0_2px_24px_#00000073)] dark:[text-shadow:var(--zui-scroll-expand-title-shadow-dark,var(--zui-scroll-expand-title-shadow,0_2px_24px_#00000073))] motion-reduce:items-start motion-reduce:pt-[12%] motion-reduce:opacity-100! motion-reduce:[transform:none]!";

export const zuiScrollExpandHint =
  "pointer-events-none absolute inset-x-0 bottom-5 text-center text-[0.8125rem] tracking-[0.02em] text-[color:var(--_se-hint)] motion-reduce:hidden";
