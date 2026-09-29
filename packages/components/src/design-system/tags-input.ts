export const zuiTagsInputBase =
  "flex items-center gap-2 rounded-xl border bg-[var(--zui-tags-input-bg,#ffffff)] dark:bg-[var(--zui-tags-input-bg-dark,#0f172a)] text-[color:var(--zui-tags-input-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-fg-dark,#f8fafc)] border-[color:var(--zui-tags-input-border,#cbd5e1)] dark:border-[color:var(--zui-tags-input-border-dark,#475569)] focus-within:ring-2 focus-within:ring-[color:var(--zui-tags-input-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-tags-input-ring-dark,#60a5fa)] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiTagsInputSizes = {
  sm: "min-h-9 px-2.5 py-1.5 text-sm",
  md: "min-h-11 px-3 py-2 text-sm",
  lg: "min-h-13 px-4 py-2.5 text-base",
} as const;

export const zuiTagsInputAppearances = {
  default:
    "bg-[var(--zui-tags-input-default-bg,#ffffff)] dark:bg-[var(--zui-tags-input-default-bg-dark,#0f172a)] border-[color:var(--zui-tags-input-default-border,#cbd5e1)] dark:border-[color:var(--zui-tags-input-default-border-dark,#475569)] text-[color:var(--zui-tags-input-default-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-default-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-tags-input-default-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-tags-input-default-ring-dark,#60a5fa)]",
  outline:
    "bg-[var(--zui-tags-input-outline-bg,transparent)] dark:bg-[var(--zui-tags-input-outline-bg-dark,transparent)] border-[color:var(--zui-tags-input-outline-border,#64748b)] dark:border-[color:var(--zui-tags-input-outline-border-dark,#94a3b8)] text-[color:var(--zui-tags-input-outline-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-outline-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-tags-input-outline-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-tags-input-outline-ring-dark,#60a5fa)]",
  subtle:
    "bg-[var(--zui-tags-input-subtle-bg,#f1f5f9)] dark:bg-[var(--zui-tags-input-subtle-bg-dark,#1e293b)] border-[color:var(--zui-tags-input-subtle-border,#e2e8f0)] dark:border-[color:var(--zui-tags-input-subtle-border-dark,#334155)] text-[color:var(--zui-tags-input-subtle-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-subtle-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-tags-input-subtle-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-tags-input-subtle-ring-dark,#60a5fa)]",
  contrast:
    "bg-[var(--zui-tags-input-contrast-bg,#0f172a)] dark:bg-[var(--zui-tags-input-contrast-bg-dark,#f8fafc)] border-[color:var(--zui-tags-input-contrast-border,#334155)] dark:border-[color:var(--zui-tags-input-contrast-border-dark,#cbd5e1)] text-[color:var(--zui-tags-input-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-tags-input-contrast-fg-dark,#0f172a)] focus-within:ring-[color:var(--zui-tags-input-contrast-ring,#f8fafc)] dark:focus-within:ring-[color:var(--zui-tags-input-contrast-ring-dark,#60a5fa)]",
  glass:
    "backdrop-blur-md bg-[var(--zui-tags-input-glass-bg,#ffffffcc)] dark:bg-[var(--zui-tags-input-glass-bg-dark,#0f172acc)] border-[color:var(--zui-tags-input-glass-border,#cbd5e1)] dark:border-[color:var(--zui-tags-input-glass-border-dark,#475569)] text-[color:var(--zui-tags-input-glass-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-glass-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-tags-input-glass-ring,#3b82f6)] dark:focus-within:ring-[color:var(--zui-tags-input-glass-ring-dark,#60a5fa)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-tags-input-gradient-blue-from,#dbeafe)] dark:from-[var(--zui-tags-input-gradient-blue-from-dark,#1e3a8a)] to-[var(--zui-tags-input-gradient-blue-to,#e0f2fe)] dark:to-[var(--zui-tags-input-gradient-blue-to-dark,#0f172a)] bg-[var(--zui-tags-input-gradient-blue-bg,#eff6ff)] dark:bg-[var(--zui-tags-input-gradient-blue-bg-dark,#172554)] border-[color:var(--zui-tags-input-gradient-blue-border,#93c5fd)] dark:border-[color:var(--zui-tags-input-gradient-blue-border-dark,#3b82f6)] text-[color:var(--zui-tags-input-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-gradient-blue-fg-dark,#eff6ff)] focus-within:ring-[color:var(--zui-tags-input-gradient-blue-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-tags-input-gradient-blue-ring-dark,#60a5fa)]",
  error:
    "bg-[var(--zui-tags-input-error-bg,#fff1f2)] dark:bg-[var(--zui-tags-input-error-bg-dark,#4c0519)] border-[color:var(--zui-tags-input-error-border,#fb7185)] dark:border-[color:var(--zui-tags-input-error-border-dark,#fb7185)] text-[color:var(--zui-tags-input-error-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-error-fg-dark,#ffe4e6)] focus-within:ring-[color:var(--zui-tags-input-error-ring,#e11d48)] dark:focus-within:ring-[color:var(--zui-tags-input-error-ring-dark,#fb7185)]",
} as const;

export const zuiTagsInputTag =
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 bg-[var(--zui-tags-input-tag-bg,#e2e8f0)] dark:bg-[var(--zui-tags-input-tag-bg-dark,#334155)] text-[color:var(--zui-tags-input-tag-fg,#0f172a)] dark:text-[color:var(--zui-tags-input-tag-fg-dark,#f8fafc)]";
