/**
 * Terminal Emulator design tokens.
 *
 * A code/data-display surface (like `json-viewer`): a small set of chrome
 * appearances over a themeable terminal surface, plus a window header bar with
 * traffic-light dots and a copy action, and semantic line-color tokens for the
 * command / output / error / comment line types. Every color routes through a
 * `--zui-terminal-emulator-*` custom property with a hardcoded fallback and a
 * paired `dark:` variant.
 */

export const zuiTerminalEmulatorBase = [
  "relative overflow-hidden rounded-lg border font-mono",
  "border-[color:var(--zui-terminal-emulator-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-terminal-emulator-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-terminal-emulator-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-terminal-emulator-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-terminal-emulator-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-terminal-emulator-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiTerminalEmulatorSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiTerminalEmulatorAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-terminal-emulator-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-terminal-emulator-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-terminal-emulator-contrast-bg,#ffffff)] dark:bg-[var(--zui-terminal-emulator-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-terminal-emulator-glass-bg,#ffffffcc)] dark:bg-[var(--zui-terminal-emulator-glass-bg-dark,#0f172acc)] border-[color:var(--zui-terminal-emulator-glass-border,#ffffff66)] dark:border-[color:var(--zui-terminal-emulator-glass-border-dark,#ffffff1a)]",
} as const;

/** Window header bar with traffic-light dots, centered title, and copy action. */
export const zuiTerminalEmulatorHeaderBase =
  "flex items-center gap-2 border-b px-3 py-2 border-[color:var(--zui-terminal-emulator-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-terminal-emulator-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-terminal-emulator-header-bg,var(--zui-surface-muted,oklch(96.8%_0.007_247.896)))] dark:bg-[var(--zui-terminal-emulator-header-bg-dark,var(--zui-surface-muted-dark,oklch(20.8%_0.042_265.755)))] text-[color:var(--zui-terminal-emulator-header-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-terminal-emulator-header-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

/** Centered window title within the header bar. */
export const zuiTerminalEmulatorTitle =
  "min-w-0 flex-1 truncate text-center text-xs font-medium text-[color:var(--zui-terminal-emulator-title-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-terminal-emulator-title-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))]";

/** A single decorative traffic-light dot in the header. */
export const zuiTerminalEmulatorDot =
  "size-3 rounded-full bg-[var(--zui-terminal-emulator-dot,#cbd5e1)] dark:bg-[var(--zui-terminal-emulator-dot-dark,#475569)]";

/** Copy action button in the header. */
export const zuiTerminalEmulatorActionBase =
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-terminal-emulator-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-terminal-emulator-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-terminal-emulator-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-terminal-emulator-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--zui-terminal-emulator-prompt-fg,#16a34a)]";

/** Scrollable padded container that holds the terminal lines. */
export const zuiTerminalEmulatorBodyBase = "overflow-auto p-3 sm:p-4";

/** Prompt symbol shown before each command line. */
export const zuiTerminalEmulatorPrompt =
  "select-none text-[color:var(--zui-terminal-emulator-prompt-fg,#16a34a)] dark:text-[color:var(--zui-terminal-emulator-prompt-fg-dark,#4ade80)]";

/** Per-line-type colors. Keys match the `TerminalLine["type"]` members. */
export const zuiTerminalEmulatorLineTones = {
  command:
    "text-[color:var(--zui-terminal-emulator-command-fg,#0f172a)] dark:text-[color:var(--zui-terminal-emulator-command-fg-dark,#e2e8f0)]",
  output:
    "text-[color:var(--zui-terminal-emulator-output-fg,#475569)] dark:text-[color:var(--zui-terminal-emulator-output-fg-dark,#94a3b8)]",
  error:
    "text-[color:var(--zui-terminal-emulator-error-fg,#dc2626)] dark:text-[color:var(--zui-terminal-emulator-error-fg-dark,#f87171)]",
  comment:
    "italic text-[color:var(--zui-terminal-emulator-comment-fg,#16a34a)] dark:text-[color:var(--zui-terminal-emulator-comment-fg-dark,#4ade80)]",
} as const;
