export const zuiCodeDiffBase = [
  "relative overflow-auto rounded-lg border border-[color:var(--zui-code-diff-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-code-diff-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-code-diff-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-code-diff-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-code-diff-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-code-diff-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiCodeDiffSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

export const zuiCodeDiffHeaderBase =
  "sticky top-0 z-10 flex items-center justify-between border-b border-[color:var(--zui-code-diff-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-code-diff-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-code-diff-header-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-code-diff-header-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] px-4 py-2";

export const zuiCodeDiffTableBase = "w-full border-collapse table-fixed";

export const zuiCodeDiffLineNumberBase =
  "select-none text-right align-top whitespace-nowrap border-r border-[color:var(--zui-code-diff-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-code-diff-border-dark,var(--zui-border-dark,#ffffff1a))] px-3 text-[color:var(--zui-code-diff-line-number-fg,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:text-[color:var(--zui-code-diff-line-number-fg-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))]";

export const zuiCodeDiffLineContentBase =
  "whitespace-pre-wrap break-all px-4 align-top";

export const zuiCodeDiffLineAdded =
  "bg-[var(--zui-code-diff-added-bg,oklch(92.8%_0.109_150.96))] dark:bg-[var(--zui-code-diff-added-bg-dark,oklch(26.8%_0.077_146.44))] text-[color:var(--zui-code-diff-added-fg,oklch(29.1%_0.065_148.99))] dark:text-[color:var(--zui-code-diff-added-fg-dark,oklch(74%_0.131_149.02))]";

export const zuiCodeDiffLineRemoved =
  "bg-[var(--zui-code-diff-removed-bg,oklch(93.1%_0.08_22.4))] dark:bg-[var(--zui-code-diff-removed-bg-dark,oklch(26.9%_0.07_22.54))] text-[color:var(--zui-code-diff-removed-fg,oklch(30.7%_0.06_28.07))] dark:text-[color:var(--zui-code-diff-removed-fg-dark,oklch(74.2%_0.127_24.75))]";

export const zuiCodeDiffLineUnchanged = "";

export const zuiCodeDiffGutterMarker =
  "inline-block w-4 text-center select-none";

export const zuiCodeDiffAppearances = {
  default: "",
} as const;
