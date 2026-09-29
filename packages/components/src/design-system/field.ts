export const zuiFieldBase =
  "grid gap-1.5 rounded-xl border focus-within:ring-2 bg-[var(--zui-field-bg,#ffffff)] dark:bg-[var(--zui-field-bg-dark,#0f172a)] text-[color:var(--zui-field-fg,#0f172a)] dark:text-[color:var(--zui-field-fg-dark,#f8fafc)] border-[color:var(--zui-field-border,#cbd5e1)] dark:border-[color:var(--zui-field-border-dark,#475569)] [&_input]:text-inherit [&_textarea]:text-inherit [&_input]:placeholder:text-[color:var(--zui-field-placeholder,currentColor)] dark:[&_input]:placeholder:text-[color:var(--zui-field-placeholder-dark,currentColor)] [&_textarea]:placeholder:text-[color:var(--zui-field-placeholder,currentColor)] dark:[&_textarea]:placeholder:text-[color:var(--zui-field-placeholder-dark,currentColor)] [&_input]:placeholder:opacity-60 [&_textarea]:placeholder:opacity-60 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50";

export const zuiFieldSizes = {
  sm: "min-h-9 px-2.5 py-1.5 text-sm",
  md: "min-h-11 px-3 py-2 text-sm",
  lg: "min-h-13 px-4 py-2.5 text-base",
} as const;

export const zuiFieldAppearances = {
  default:
    "bg-[var(--zui-field-default-bg,#ffffff)] dark:bg-[var(--zui-field-default-bg-dark,#0f172a)] border-[color:var(--zui-field-default-border,#e2e8f0)] dark:border-[color:var(--zui-field-default-border-dark,#cbd5e1)] text-[color:var(--zui-field-default-fg,#0f172a)] dark:text-[color:var(--zui-field-default-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-field-default-ring,#334155)] dark:focus-within:ring-[color:var(--zui-field-default-ring-dark,#60a5fa)]",
  outline:
    "bg-[var(--zui-field-outline-bg,transparent)] dark:bg-[var(--zui-field-outline-bg-dark,transparent)] border-[color:var(--zui-field-outline-border,#64748b)] dark:border-[color:var(--zui-field-outline-border-dark,#94a3b8)] text-[color:var(--zui-field-outline-fg,#0f172a)] dark:text-[color:var(--zui-field-outline-fg-dark,#e2e8f0)] focus-within:ring-[color:var(--zui-field-outline-ring,#334155)] dark:focus-within:ring-[color:var(--zui-field-outline-ring-dark,#60a5fa)]",
  subtle:
    "bg-[var(--zui-field-subtle-bg,#f1f5f9)] dark:bg-[var(--zui-field-subtle-bg-dark,#1e293b)] border-[color:var(--zui-field-subtle-border,#e2e8f0)] dark:border-[color:var(--zui-field-subtle-border-dark,#334155)] text-[color:var(--zui-field-subtle-fg,#0f172a)] dark:text-[color:var(--zui-field-subtle-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-field-subtle-ring,#475569)] dark:focus-within:ring-[color:var(--zui-field-subtle-ring-dark,#60a5fa)]",
  contrast:
    "bg-[var(--zui-field-contrast-bg,#0f172a)] dark:bg-[var(--zui-field-contrast-bg-dark,#f8fafc)] border-[color:var(--zui-field-contrast-border,#334155)] dark:border-[color:var(--zui-field-contrast-border-dark,#cbd5e1)] text-[color:var(--zui-field-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-field-contrast-fg-dark,#0f172a)] [&_input]:border [&_input]:border-[color:var(--zui-field-contrast-input-border,#94a3b8)] dark:[&_input]:border-[color:var(--zui-field-contrast-input-border-dark,#64748b)] focus-within:ring-[color:var(--zui-field-contrast-ring,#f8fafc)] dark:focus-within:ring-[color:var(--zui-field-contrast-ring-dark,#60a5fa)]",
  glass:
    "backdrop-blur-md bg-[var(--zui-field-glass-bg,#ffffffcc)] dark:bg-[var(--zui-field-glass-bg-dark,#0f172acc)] border-[color:var(--zui-field-glass-border,#cbd5e1)] dark:border-[color:var(--zui-field-glass-border-dark,#475569)] text-[color:var(--zui-field-glass-fg,#0f172a)] dark:text-[color:var(--zui-field-glass-fg-dark,#f8fafc)] focus-within:ring-[color:var(--zui-field-glass-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-field-glass-ring-dark,#60a5fa)]",
  "gradient-blue":
    "bg-linear-to-r from-[var(--zui-field-gradient-blue-from,#dbeafe)] dark:from-[var(--zui-field-gradient-blue-from-dark,#1e3a8a)] to-[var(--zui-field-gradient-blue-to,#e0f2fe)] dark:to-[var(--zui-field-gradient-blue-to-dark,#0f172a)] bg-[var(--zui-field-gradient-blue-bg,#eff6ff)] dark:bg-[var(--zui-field-gradient-blue-bg-dark,#172554)] border-[color:var(--zui-field-gradient-blue-border,#93c5fd)] dark:border-[color:var(--zui-field-gradient-blue-border-dark,#3b82f6)] text-[color:var(--zui-field-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-field-gradient-blue-fg-dark,#eff6ff)] focus-within:ring-[color:var(--zui-field-gradient-blue-ring,#2563eb)] dark:focus-within:ring-[color:var(--zui-field-gradient-blue-ring-dark,#60a5fa)]",
  error:
    "bg-[var(--zui-field-error-bg,#fff1f2)] dark:bg-[var(--zui-field-error-bg-dark,#4c0519)] border-[color:var(--zui-field-error-border,#fb7185)] dark:border-[color:var(--zui-field-error-border-dark,#fb7185)] text-[color:var(--zui-field-error-fg,#0f172a)] dark:text-[color:var(--zui-field-error-fg-dark,#ffe4e6)] focus-within:ring-[color:var(--zui-field-error-ring,#e11d48)] dark:focus-within:ring-[color:var(--zui-field-error-ring-dark,#fb7185)]",
} as const;

export const zuiFieldLabel =
  "text-sm font-medium text-[color:var(--zui-field-label,currentColor)] dark:text-[color:var(--zui-field-label-dark,currentColor)]";
export const zuiFieldDescription =
  "text-xs text-[color:var(--zui-field-description,currentColor)] dark:text-[color:var(--zui-field-description-dark,currentColor)]";
export const zuiFieldError =
  "text-xs text-[color:var(--zui-field-error,#e11d48)] dark:text-[color:var(--zui-field-error-dark,#fda4af)]";
export const zuiFieldsetBase =
  "grid gap-3 border-0 p-0 text-[color:var(--zui-field-fg,#0f172a)] dark:text-[color:var(--zui-field-fg-dark,#f8fafc)]";
