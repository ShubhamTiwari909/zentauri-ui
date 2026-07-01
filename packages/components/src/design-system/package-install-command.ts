/**
 * Package Install Command design tokens.
 *
 * A compact command-display surface showing a package-manager install command
 * with a copy button and package-manager tab switcher. Every color routes
 * through a `--zui-package-install-command-*` custom property with a hardcoded
 * fallback and a paired `dark:` variant.
 */

export const zuiPackageInstallCommandBase = [
  "relative rounded-lg border font-mono",
  "border-[color:var(--zui-package-install-command-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-package-install-command-border-dark,var(--zui-border-dark,#ffffff1a))]",
  "bg-[var(--zui-package-install-command-bg,var(--zui-surface,oklch(98.4%_0.003_247.858)))] dark:bg-[var(--zui-package-install-command-bg-dark,var(--zui-surface-dark,oklch(12.9%_0.042_264.695)))]",
  "text-[color:var(--zui-package-install-command-fg,var(--zui-fg,oklch(20.8%_0.042_265.755)))] dark:text-[color:var(--zui-package-install-command-fg-dark,var(--zui-fg-dark,oklch(98.4%_0.003_247.858)))]",
] as const;

export const zuiPackageInstallCommandSizes = {
  sm: "text-xs leading-5",
  md: "text-sm leading-6",
  lg: "text-base leading-7",
} as const;

/** Chrome appearances. `default` keeps the base surface; others override bg/border. */
export const zuiPackageInstallCommandAppearances = {
  default: "",
  subtle:
    "bg-[var(--zui-package-install-command-subtle-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-package-install-command-subtle-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] border-transparent dark:border-transparent",
  contrast:
    "bg-[var(--zui-package-install-command-contrast-bg,#ffffff)] dark:bg-[var(--zui-package-install-command-contrast-bg-dark,oklch(16.8%_0.04_265.755))]",
  glass:
    "backdrop-blur-md bg-[var(--zui-package-install-command-glass-bg,#ffffffcc)] dark:bg-[var(--zui-package-install-command-glass-bg-dark,#0f172acc)] border-[color:var(--zui-package-install-command-glass-border,#ffffff66)] dark:border-[color:var(--zui-package-install-command-glass-border-dark,#ffffff1a)]",
} as const;

/** Package-manager tabs row. */
export const zuiPackageInstallCommandTabsBase =
  "flex items-center gap-1 border-b px-2 pt-2 border-[color:var(--zui-package-install-command-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-package-install-command-border-dark,var(--zui-border-dark,#ffffff1a))]";

/** A single package-manager tab button. */
export const zuiPackageInstallCommandTabBase =
  "inline-flex items-center rounded-t-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2";

export const zuiPackageInstallCommandTabStates = {
  inactive:
    "text-[color:var(--zui-package-install-command-tab-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-package-install-command-tab-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-package-install-command-tab-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-package-install-command-tab-hover-bg-dark,#ffffff14)]",
  active:
    "bg-[var(--zui-package-install-command-tab-active-bg,#ffffff)] dark:bg-[var(--zui-package-install-command-tab-active-bg-dark,#1e293b)] text-[color:var(--zui-package-install-command-tab-active-fg,#7c3aed)] dark:text-[color:var(--zui-package-install-command-tab-active-fg-dark,#c4b5fd)]",
} as const;

/** Command display area. */
export const zuiPackageInstallCommandBodyBase =
  "flex items-center gap-3 px-3 py-2.5 sm:px-4";

/** The actual command text. */
export const zuiPackageInstallCommandCode =
  "min-w-0 flex-1 break-all text-[color:var(--zui-package-install-command-code-fg,#16a34a)] dark:text-[color:var(--zui-package-install-command-code-fg-dark,#4ade80)]";

/** Copy action button. */
export const zuiPackageInstallCommandActionBase =
  "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer text-[color:var(--zui-package-install-command-action-fg,var(--zui-fg-muted,oklch(44.6%_0.043_257.281)))] dark:text-[color:var(--zui-package-install-command-action-fg-dark,var(--zui-fg-muted-dark,oklch(86.9%_0.022_252.894)))] hover:bg-[var(--zui-package-install-command-action-hover-bg,#0000000d)] dark:hover:bg-[var(--zui-package-install-command-action-hover-bg-dark,#ffffff14)] focus-visible:outline-none focus-visible:ring-2";
