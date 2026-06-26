export const zuiHashGeneratorBase = [
  "rounded-lg border border-[color:var(--zui-hash-generator-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-hash-generator-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-hash-generator-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-hash-generator-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-hash-generator-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-hash-generator-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiHashGeneratorHeaderBase =
  "flex items-center justify-between border-b border-[color:var(--zui-hash-generator-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-hash-generator-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-hash-generator-header-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-hash-generator-header-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] px-4 py-2";

export const zuiHashGeneratorLabelBase =
  "text-xs font-medium text-[color:var(--zui-hash-generator-label-fg,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:text-[color:var(--zui-hash-generator-label-fg-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))]";

export const zuiHashGeneratorInputBase = [
  "w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[color:var(--zui-hash-generator-placeholder,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:placeholder:text-[color:var(--zui-hash-generator-placeholder-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))]",
  "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--zui-hash-generator-ring-focus,var(--zui-focus-ring,#0000004d))] dark:focus-visible:ring-[var(--zui-hash-generator-ring-focus-dark,var(--zui-focus-ring-dark,#ffffff4d))]",
] as const;

export const zuiHashGeneratorOutputBase = [
  "relative border-t border-[color:var(--zui-hash-generator-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-hash-generator-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-hash-generator-output-bg,oklch(96.8%_0.007_247.896))] dark:bg-[var(--zui-hash-generator-output-bg-dark,oklch(18.5%_0.037_264.653))]",
] as const;

export const zuiHashGeneratorOutputTextBase =
  "font-mono text-xs break-all px-4 py-3 text-[color:var(--zui-hash-generator-output-fg,var(--zui-brand-fg,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-hash-generator-output-fg-dark,var(--zui-brand-fg-dark,oklch(86.9%_0.022_252.894)))]";

export const zuiHashGeneratorSizes = {
  sm: "",
  md: "",
  lg: "",
} as const;

export const zuiHashGeneratorAppearances = {
  default: "",
} as const;
