export const zuiNumberInputBase =
  "flex items-center gap-2 rounded-xl border bg-[var(--zui-number-input-bg,#ffffff)] dark:bg-[var(--zui-number-input-bg-dark,#0f172a)] text-[color:var(--zui-number-input-fg,#0f172a)] dark:text-[color:var(--zui-number-input-fg-dark,#f8fafc)] border-[color:var(--zui-number-input-border,#cbd5e1)] dark:border-[color:var(--zui-number-input-border-dark,#475569)] focus-within:ring-2 focus-within:ring-[color:var(--zui-number-input-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-number-input-ring-dark,#60a5fa)] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiNumberInputSizes = {
  sm: "min-h-9 px-2.5 py-1.5 text-sm",
  md: "min-h-11 px-3 py-2 text-sm",
  lg: "min-h-13 px-4 py-2.5 text-base",
} as const;

export const zuiNumberInputAppearances = {
  default:
    "bg-[var(--zui-number-input-default-bg,#ffffff)] dark:bg-[var(--zui-number-input-default-bg-dark,#0f172a)] border-[color:var(--zui-number-input-default-border,#cbd5e1)] dark:border-[color:var(--zui-number-input-default-border-dark,#475569)] text-[color:var(--zui-number-input-default-fg,#0f172a)] dark:text-[color:var(--zui-number-input-default-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-number-input-default-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-number-input-default-ring-dark,#60a5fa)]",
  outline:
    "bg-[var(--zui-number-input-outline-bg,transparent)] dark:bg-[var(--zui-number-input-outline-bg-dark,transparent)] border-[color:var(--zui-number-input-outline-border,#64748b)] dark:border-[color:var(--zui-number-input-outline-border-dark,#94a3b8)] text-[color:var(--zui-number-input-outline-fg,#0f172a)] dark:text-[color:var(--zui-number-input-outline-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-number-input-outline-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-number-input-outline-ring-dark,#60a5fa)]",
  subtle:
    "bg-[var(--zui-number-input-subtle-bg,#f1f5f9)] dark:bg-[var(--zui-number-input-subtle-bg-dark,#1e293b)] border-[color:var(--zui-number-input-subtle-border,#e2e8f0)] dark:border-[color:var(--zui-number-input-subtle-border-dark,#334155)] text-[color:var(--zui-number-input-subtle-fg,#0f172a)] dark:text-[color:var(--zui-number-input-subtle-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-number-input-subtle-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-number-input-subtle-ring-dark,#60a5fa)]",
  contrast:
    "bg-[var(--zui-number-input-contrast-bg,#0f172a)] dark:bg-[var(--zui-number-input-contrast-bg-dark,#f8fafc)] border-[color:var(--zui-number-input-contrast-border,#334155)] dark:border-[color:var(--zui-number-input-contrast-border-dark,#cbd5e1)] text-[color:var(--zui-number-input-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-number-input-contrast-fg-dark,#0f172a)] focus-within:ring-[color:var(--zui-number-input-contrast-ring,#f8fafc)] dark:focus-within:ring-[color:var(--zui-number-input-contrast-ring-dark,#60a5fa)]",
  glass:
    "backdrop-blur-md bg-[var(--zui-number-input-glass-bg,#ffffffcc)] dark:bg-[var(--zui-number-input-glass-bg-dark,#0f172acc)] border-[color:var(--zui-number-input-glass-border,#cbd5e1)] dark:border-[color:var(--zui-number-input-glass-border-dark,#475569)] text-[color:var(--zui-number-input-glass-fg,#0f172a)] dark:text-[color:var(--zui-number-input-glass-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-number-input-glass-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-number-input-glass-ring-dark,#60a5fa)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-number-input-gradient-blue-from,#dbeafe)] dark:from-[var(--zui-number-input-gradient-blue-from-dark,#1e3a8a)] to-[var(--zui-number-input-gradient-blue-to,#e0f2fe)] dark:to-[var(--zui-number-input-gradient-blue-to-dark,#0f172a)] bg-[var(--zui-number-input-gradient-blue-bg,#eff6ff)] dark:bg-[var(--zui-number-input-gradient-blue-bg-dark,#172554)] border-[color:var(--zui-number-input-gradient-blue-border,#93c5fd)] dark:border-[color:var(--zui-number-input-gradient-blue-border-dark,#3b82f6)] text-[color:var(--zui-number-input-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-number-input-gradient-blue-fg-dark,#eff6ff)] focus-within:ring-[color:var(--zui-number-input-gradient-blue-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-number-input-gradient-blue-ring-dark,#60a5fa)]",
  error:
    "bg-[var(--zui-number-input-error-bg,#fff1f2)] dark:bg-[var(--zui-number-input-error-bg-dark,#4c0519)] border-[color:var(--zui-number-input-error-border,#fb7185)] dark:border-[color:var(--zui-number-input-error-border-dark,#fb7185)] text-[color:var(--zui-number-input-error-fg,#0f172a)] dark:text-[color:var(--zui-number-input-error-fg-dark,#ffe4e6)] focus-within:ring-[color:var(--zui-number-input-error-ring,#e11d48)] dark:focus-within:ring-[color:var(--zui-number-input-error-ring-dark,#fb7185)]",
} as const;
