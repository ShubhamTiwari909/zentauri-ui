export const zuiInputGroupBase =
  "flex items-center gap-2 rounded-xl border bg-[var(--zui-input-group-bg,#ffffff)] dark:bg-[var(--zui-input-group-bg-dark,#0f172a)] text-[color:var(--zui-input-group-fg,#0f172a)] dark:text-[color:var(--zui-input-group-fg-dark,#f8fafc)] border-[color:var(--zui-input-group-border,#cbd5e1)] dark:border-[color:var(--zui-input-group-border-dark,#475569)] focus-within:ring-2 focus-within:ring-[color:var(--zui-input-group-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-input-group-ring-dark,#60a5fa)] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiInputGroupSizes = {
  sm: "min-h-9 px-2.5 py-1.5 text-sm",
  md: "min-h-11 px-3 py-2 text-sm",
  lg: "min-h-13 px-4 py-2.5 text-base",
} as const;

export const zuiInputGroupAppearances = {
  default:
    "bg-[var(--zui-input-group-default-bg,#ffffff)] dark:bg-[var(--zui-input-group-default-bg-dark,#0f172a)] border-[color:var(--zui-input-group-default-border,#cbd5e1)] dark:border-[color:var(--zui-input-group-default-border-dark,#475569)] text-[color:var(--zui-input-group-default-fg,#0f172a)] dark:text-[color:var(--zui-input-group-default-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-input-group-default-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-input-group-default-ring-dark,#60a5fa)]",
  outline:
    "bg-[var(--zui-input-group-outline-bg,transparent)] dark:bg-[var(--zui-input-group-outline-bg-dark,transparent)] border-[color:var(--zui-input-group-outline-border,#64748b)] dark:border-[color:var(--zui-input-group-outline-border-dark,#94a3b8)] text-[color:var(--zui-input-group-outline-fg,#0f172a)] dark:text-[color:var(--zui-input-group-outline-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-input-group-outline-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-input-group-outline-ring-dark,#60a5fa)]",
  subtle:
    "bg-[var(--zui-input-group-subtle-bg,#f1f5f9)] dark:bg-[var(--zui-input-group-subtle-bg-dark,#1e293b)] border-[color:var(--zui-input-group-subtle-border,#e2e8f0)] dark:border-[color:var(--zui-input-group-subtle-border-dark,#334155)] text-[color:var(--zui-input-group-subtle-fg,#0f172a)] dark:text-[color:var(--zui-input-group-subtle-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-input-group-subtle-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-input-group-subtle-ring-dark,#60a5fa)]",
  contrast:
    "bg-[var(--zui-input-group-contrast-bg,#0f172a)] dark:bg-[var(--zui-input-group-contrast-bg-dark,#f8fafc)] border-[color:var(--zui-input-group-contrast-border,#334155)] dark:border-[color:var(--zui-input-group-contrast-border-dark,#cbd5e1)] text-[color:var(--zui-input-group-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-input-group-contrast-fg-dark,#0f172a)] focus-within:ring-[color:var(--zui-input-group-contrast-ring,#f8fafc)] dark:focus-within:ring-[color:var(--zui-input-group-contrast-ring-dark,#60a5fa)]",
  glass:
    "backdrop-blur-md bg-[var(--zui-input-group-glass-bg,#ffffffcc)] dark:bg-[var(--zui-input-group-glass-bg-dark,#0f172acc)] border-[color:var(--zui-input-group-glass-border,#cbd5e1)] dark:border-[color:var(--zui-input-group-glass-border-dark,#475569)] text-[color:var(--zui-input-group-glass-fg,#0f172a)] dark:text-[color:var(--zui-input-group-glass-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-input-group-glass-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-input-group-glass-ring-dark,#60a5fa)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-input-group-gradient-blue-from,#dbeafe)] dark:from-[var(--zui-input-group-gradient-blue-from-dark,#1e3a8a)] to-[var(--zui-input-group-gradient-blue-to,#e0f2fe)] dark:to-[var(--zui-input-group-gradient-blue-to-dark,#0f172a)] bg-[var(--zui-input-group-gradient-blue-bg,#eff6ff)] dark:bg-[var(--zui-input-group-gradient-blue-bg-dark,#172554)] border-[color:var(--zui-input-group-gradient-blue-border,#93c5fd)] dark:border-[color:var(--zui-input-group-gradient-blue-border-dark,#3b82f6)] text-[color:var(--zui-input-group-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-input-group-gradient-blue-fg-dark,#eff6ff)] focus-within:ring-[color:var(--zui-input-group-gradient-blue-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-input-group-gradient-blue-ring-dark,#60a5fa)]",
  error:
    "bg-[var(--zui-input-group-error-bg,#fff1f2)] dark:bg-[var(--zui-input-group-error-bg-dark,#4c0519)] border-[color:var(--zui-input-group-error-border,#fb7185)] dark:border-[color:var(--zui-input-group-error-border-dark,#fb7185)] text-[color:var(--zui-input-group-error-fg,#0f172a)] dark:text-[color:var(--zui-input-group-error-fg-dark,#ffe4e6)] focus-within:ring-[color:var(--zui-input-group-error-ring,#e11d48)] dark:focus-within:ring-[color:var(--zui-input-group-error-ring-dark,#fb7185)]",
} as const;

export const zuiInputGroupAddon =
  "shrink-0 text-[color:var(--zui-input-group-addon,currentColor)] dark:text-[color:var(--zui-input-group-addon-dark,currentColor)]";
export const zuiInputGroupAction =
  "rounded-md px-2 py-1 hover:bg-[var(--zui-input-group-action-hover,#e2e8f0)] dark:hover:bg-[var(--zui-input-group-action-hover-dark,#334155)] focus-visible:outline-2 focus-visible:outline-offset-2";
