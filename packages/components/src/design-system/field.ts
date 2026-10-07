// Literal recipes keep public theme tokens in the consumer Tailwind scan scope.
export const zuiFieldBase =
  "grid min-w-0 items-start border-solid rounded-[var(--zui-field-radius,0.75rem)] dark:rounded-[var(--zui-field-radius-dark,0.75rem)] border-[length:var(--zui-field-border-width,1px)] dark:border-[length:var(--zui-field-border-width-dark,1px)] p-[var(--zui-field-padding,0.75rem)] dark:p-[var(--zui-field-padding-dark,0.75rem)] data-[invalid=true]:border-[color:var(--zui-field-invalid-border,#e11d48)] dark:data-[invalid=true]:border-[color:var(--zui-field-invalid-border-dark,#fb7185)] data-[disabled=true]:opacity-[var(--zui-field-disabled-opacity,0.5)] dark:data-[disabled=true]:opacity-[var(--zui-field-disabled-opacity-dark,0.5)]";
export const zuiFieldOrientations = {
  vertical: "grid-cols-1",
  horizontal:
    "grid-cols-[minmax(0,var(--zui-field-label-width,10rem))_minmax(0,1fr)] dark:grid-cols-[minmax(0,var(--zui-field-label-width-dark,10rem))_minmax(0,1fr)]",
  responsive:
    "grid-cols-1 sm:grid-cols-[minmax(0,var(--zui-field-label-width,10rem))_minmax(0,1fr)] sm:dark:grid-cols-[minmax(0,var(--zui-field-label-width-dark,10rem))_minmax(0,1fr)]",
} as const;
export const zuiFieldSizes = {
  sm: "gap-[var(--zui-field-gap-sm,0.375rem)] dark:gap-[var(--zui-field-gap-sm-dark,0.375rem)] text-[length:var(--zui-field-font-size-sm,0.75rem)] dark:text-[length:var(--zui-field-font-size-sm-dark,0.75rem)]",
  md: "gap-[var(--zui-field-gap-md,0.5rem)] dark:gap-[var(--zui-field-gap-md-dark,0.5rem)] text-[length:var(--zui-field-font-size-md,0.875rem)] dark:text-[length:var(--zui-field-font-size-md-dark,0.875rem)]",
  lg: "gap-[var(--zui-field-gap-lg,0.75rem)] dark:gap-[var(--zui-field-gap-lg-dark,0.75rem)] text-[length:var(--zui-field-font-size-lg,1rem)] dark:text-[length:var(--zui-field-font-size-lg-dark,1rem)]",
} as const;
export const zuiFieldContentBase =
  "flex min-w-0 flex-col gap-[var(--zui-field-content-gap,0.5rem)] dark:gap-[var(--zui-field-content-gap-dark,0.5rem)]";
export const zuiFieldLabelBase =
  "inline-flex items-start gap-[var(--zui-field-label-gap,0.25rem)] dark:gap-[var(--zui-field-label-gap-dark,0.25rem)] font-[var(--zui-field-label-weight,500)] dark:font-[var(--zui-field-label-weight-dark,500)] leading-relaxed text-[color:var(--zui-field-label-fg,inherit)] dark:text-[color:var(--zui-field-label-fg-dark,inherit)]";
export const zuiFieldDescriptionBase =
  "text-[length:var(--zui-field-description-font-size,0.8125rem)] dark:text-[length:var(--zui-field-description-font-size-dark,0.8125rem)] leading-relaxed text-[color:var(--zui-field-description-fg,inherit)] dark:text-[color:var(--zui-field-description-fg-dark,inherit)] opacity-[var(--zui-field-description-opacity,0.9)] dark:opacity-[var(--zui-field-description-opacity-dark,0.9)]";
export const zuiFieldErrorBase =
  "flex items-start gap-[var(--zui-field-error-gap,0.375rem)] dark:gap-[var(--zui-field-error-gap-dark,0.375rem)] text-[length:var(--zui-field-error-font-size,0.8125rem)] dark:text-[length:var(--zui-field-error-font-size-dark,0.8125rem)] font-medium leading-relaxed text-[color:var(--zui-field-error-fg,inherit)] dark:text-[color:var(--zui-field-error-fg-dark,inherit)]";
export const zuiFieldErrorIconBase =
  "mt-0.5 size-[var(--zui-field-error-icon-size,1rem)] dark:size-[var(--zui-field-error-icon-size-dark,1rem)] shrink-0";
export const zuiFieldFormBase =
  "flex min-w-0 flex-col gap-[var(--zui-field-form-gap,1.5rem)] dark:gap-[var(--zui-field-form-gap-dark,1.5rem)]";
export const zuiFieldGroupBase =
  "min-w-0 border-0 p-0 space-y-[var(--zui-field-group-gap,1rem)] dark:space-y-[var(--zui-field-group-gap-dark,1rem)]";
export const zuiFieldLegendBase =
  "mb-[var(--zui-field-legend-gap,0.5rem)] dark:mb-[var(--zui-field-legend-gap-dark,0.5rem)] text-[length:var(--zui-field-legend-font-size,1rem)] dark:text-[length:var(--zui-field-legend-font-size-dark,1rem)] font-[var(--zui-field-legend-weight,600)] dark:font-[var(--zui-field-legend-weight-dark,600)] text-[color:var(--zui-field-legend-fg,inherit)] dark:text-[color:var(--zui-field-legend-fg-dark,inherit)]";

export const zuiFieldAppearances = {
  default:
    "bg-[var(--zui-field-default-bg,transparent)] dark:bg-[var(--zui-field-default-bg-dark,transparent)] text-[color:var(--zui-field-default-fg,#0f172a)] dark:text-[color:var(--zui-field-default-fg-dark,#f8fafc)] border-[color:var(--zui-field-default-border,transparent)] dark:border-[color:var(--zui-field-default-border-dark,transparent)]",
  subtle:
    "bg-[var(--zui-field-subtle-bg,#f8fafc)] dark:bg-[var(--zui-field-subtle-bg-dark,#1e293b)] text-[color:var(--zui-field-subtle-fg,#334155)] dark:text-[color:var(--zui-field-subtle-fg-dark,#e2e8f0)] border-[color:var(--zui-field-subtle-border,#e2e8f0)] dark:border-[color:var(--zui-field-subtle-border-dark,#334155)]",
  contrast:
    "bg-[var(--zui-field-contrast-bg,#0f172a)] dark:bg-[var(--zui-field-contrast-bg-dark,#f8fafc)] text-[color:var(--zui-field-contrast-fg,#f8fafc)] dark:text-[color:var(--zui-field-contrast-fg-dark,#0f172a)] border-[color:var(--zui-field-contrast-border,#334155)] dark:border-[color:var(--zui-field-contrast-border-dark,#cbd5e1)]",
  glass:
    "bg-[var(--zui-field-glass-bg,#ffffffb3)] dark:bg-[var(--zui-field-glass-bg-dark,#0f172ab3)] text-[color:var(--zui-field-glass-fg,#0f172a)] dark:text-[color:var(--zui-field-glass-fg-dark,#f8fafc)] border-[color:var(--zui-field-glass-border,#cbd5e1)] dark:border-[color:var(--zui-field-glass-border-dark,#475569)] backdrop-blur-[var(--zui-field-glass-blur,12px)] dark:backdrop-blur-[var(--zui-field-glass-blur-dark,12px)]",
  blue: "bg-[var(--zui-field-blue-bg,#eff6ff)] dark:bg-[var(--zui-field-blue-bg-dark,#172554)] text-[color:var(--zui-field-blue-fg,#1e40af)] dark:text-[color:var(--zui-field-blue-fg-dark,#dbeafe)] border-[color:var(--zui-field-blue-border,#bfdbfe)] dark:border-[color:var(--zui-field-blue-border-dark,#1e40af)]",
  cyan: "bg-[var(--zui-field-cyan-bg,#ecfeff)] dark:bg-[var(--zui-field-cyan-bg-dark,#083344)] text-[color:var(--zui-field-cyan-fg,#155e75)] dark:text-[color:var(--zui-field-cyan-fg-dark,#cffafe)] border-[color:var(--zui-field-cyan-border,#a5f3fc)] dark:border-[color:var(--zui-field-cyan-border-dark,#155e75)]",
  green:
    "bg-[var(--zui-field-green-bg,#f0fdf4)] dark:bg-[var(--zui-field-green-bg-dark,#052e16)] text-[color:var(--zui-field-green-fg,#166534)] dark:text-[color:var(--zui-field-green-fg-dark,#dcfce7)] border-[color:var(--zui-field-green-border,#bbf7d0)] dark:border-[color:var(--zui-field-green-border-dark,#166534)]",
  lime: "bg-[var(--zui-field-lime-bg,#f7fee7)] dark:bg-[var(--zui-field-lime-bg-dark,#1a2e05)] text-[color:var(--zui-field-lime-fg,#3f6212)] dark:text-[color:var(--zui-field-lime-fg-dark,#ecfccb)] border-[color:var(--zui-field-lime-border,#d9f99d)] dark:border-[color:var(--zui-field-lime-border-dark,#3f6212)]",
  emerald:
    "bg-[var(--zui-field-emerald-bg,#ecfdf5)] dark:bg-[var(--zui-field-emerald-bg-dark,#022c22)] text-[color:var(--zui-field-emerald-fg,#065f46)] dark:text-[color:var(--zui-field-emerald-fg-dark,#d1fae5)] border-[color:var(--zui-field-emerald-border,#a7f3d0)] dark:border-[color:var(--zui-field-emerald-border-dark,#065f46)]",
  indigo:
    "bg-[var(--zui-field-indigo-bg,#eef2ff)] dark:bg-[var(--zui-field-indigo-bg-dark,#1e1b4b)] text-[color:var(--zui-field-indigo-fg,#3730a3)] dark:text-[color:var(--zui-field-indigo-fg-dark,#e0e7ff)] border-[color:var(--zui-field-indigo-border,#c7d2fe)] dark:border-[color:var(--zui-field-indigo-border-dark,#3730a3)]",
  purple:
    "bg-[var(--zui-field-purple-bg,#faf5ff)] dark:bg-[var(--zui-field-purple-bg-dark,#3b0764)] text-[color:var(--zui-field-purple-fg,#6b21a8)] dark:text-[color:var(--zui-field-purple-fg-dark,#f3e8ff)] border-[color:var(--zui-field-purple-border,#e9d5ff)] dark:border-[color:var(--zui-field-purple-border-dark,#6b21a8)]",
  pink: "bg-[var(--zui-field-pink-bg,#fdf2f8)] dark:bg-[var(--zui-field-pink-bg-dark,#500724)] text-[color:var(--zui-field-pink-fg,#9d174d)] dark:text-[color:var(--zui-field-pink-fg-dark,#fce7f3)] border-[color:var(--zui-field-pink-border,#fbcfe8)] dark:border-[color:var(--zui-field-pink-border-dark,#9d174d)]",
  rose: "bg-[var(--zui-field-rose-bg,#fff1f2)] dark:bg-[var(--zui-field-rose-bg-dark,#4c0519)] text-[color:var(--zui-field-rose-fg,#9f1239)] dark:text-[color:var(--zui-field-rose-fg-dark,#ffe4e6)] border-[color:var(--zui-field-rose-border,#fecdd3)] dark:border-[color:var(--zui-field-rose-border-dark,#9f1239)]",
  sky: "bg-[var(--zui-field-sky-bg,#f0f9ff)] dark:bg-[var(--zui-field-sky-bg-dark,#082f49)] text-[color:var(--zui-field-sky-fg,#075985)] dark:text-[color:var(--zui-field-sky-fg-dark,#e0f2fe)] border-[color:var(--zui-field-sky-border,#bae6fd)] dark:border-[color:var(--zui-field-sky-border-dark,#075985)]",
  teal: "bg-[var(--zui-field-teal-bg,#f0fdfa)] dark:bg-[var(--zui-field-teal-bg-dark,#042f2e)] text-[color:var(--zui-field-teal-fg,#115e59)] dark:text-[color:var(--zui-field-teal-fg-dark,#ccfbf1)] border-[color:var(--zui-field-teal-border,#99f6e4)] dark:border-[color:var(--zui-field-teal-border-dark,#115e59)]",
  yellow:
    "bg-[var(--zui-field-yellow-bg,#fefce8)] dark:bg-[var(--zui-field-yellow-bg-dark,#422006)] text-[color:var(--zui-field-yellow-fg,#854d0e)] dark:text-[color:var(--zui-field-yellow-fg-dark,#fef9c3)] border-[color:var(--zui-field-yellow-border,#fef08a)] dark:border-[color:var(--zui-field-yellow-border-dark,#854d0e)]",
  orange:
    "bg-[var(--zui-field-orange-bg,#fff7ed)] dark:bg-[var(--zui-field-orange-bg-dark,#431407)] text-[color:var(--zui-field-orange-fg,#9a3412)] dark:text-[color:var(--zui-field-orange-fg-dark,#ffedd5)] border-[color:var(--zui-field-orange-border,#fed7aa)] dark:border-[color:var(--zui-field-orange-border-dark,#9a3412)]",
  red: "bg-[var(--zui-field-red-bg,#fef2f2)] dark:bg-[var(--zui-field-red-bg-dark,#450a0a)] text-[color:var(--zui-field-red-fg,#991b1b)] dark:text-[color:var(--zui-field-red-fg-dark,#fee2e2)] border-[color:var(--zui-field-red-border,#fecaca)] dark:border-[color:var(--zui-field-red-border-dark,#991b1b)]",
  slate:
    "bg-[var(--zui-field-slate-bg,#f8fafc)] dark:bg-[var(--zui-field-slate-bg-dark,#0f172a)] text-[color:var(--zui-field-slate-fg,#334155)] dark:text-[color:var(--zui-field-slate-fg-dark,#f1f5f9)] border-[color:var(--zui-field-slate-border,#cbd5e1)] dark:border-[color:var(--zui-field-slate-border-dark,#334155)]",
  gray: "bg-[var(--zui-field-gray-bg,#f9fafb)] dark:bg-[var(--zui-field-gray-bg-dark,#111827)] text-[color:var(--zui-field-gray-fg,#374151)] dark:text-[color:var(--zui-field-gray-fg-dark,#f3f4f6)] border-[color:var(--zui-field-gray-border,#d1d5db)] dark:border-[color:var(--zui-field-gray-border-dark,#374151)]",
  zinc: "bg-[var(--zui-field-zinc-bg,#fafafa)] dark:bg-[var(--zui-field-zinc-bg-dark,#18181b)] text-[color:var(--zui-field-zinc-fg,#3f3f46)] dark:text-[color:var(--zui-field-zinc-fg-dark,#f4f4f5)] border-[color:var(--zui-field-zinc-border,#d4d4d8)] dark:border-[color:var(--zui-field-zinc-border-dark,#3f3f46)]",
  "gradient-blue":
    "bg-linear-to-br from-[var(--zui-field-gradient-blue-from,#eff6ff)] dark:from-[var(--zui-field-gradient-blue-from-dark,#172554)] to-[var(--zui-field-gradient-blue-to,#faf5ff)] dark:to-[var(--zui-field-gradient-blue-to-dark,#3b0764)] text-[color:var(--zui-field-gradient-blue-fg,#0f172a)] dark:text-[color:var(--zui-field-gradient-blue-fg-dark,#f8fafc)] border-[color:var(--zui-field-gradient-blue-border,#bfdbfe)] dark:border-[color:var(--zui-field-gradient-blue-border-dark,#1e40af)]",
  "gradient-green":
    "bg-linear-to-br from-[var(--zui-field-gradient-green-from,#f0fdf4)] dark:from-[var(--zui-field-gradient-green-from-dark,#052e16)] to-[var(--zui-field-gradient-green-to,#f7fee7)] dark:to-[var(--zui-field-gradient-green-to-dark,#1a2e05)] text-[color:var(--zui-field-gradient-green-fg,#0f172a)] dark:text-[color:var(--zui-field-gradient-green-fg-dark,#f8fafc)] border-[color:var(--zui-field-gradient-green-border,#bbf7d0)] dark:border-[color:var(--zui-field-gradient-green-border-dark,#166534)]",
  "gradient-purple":
    "bg-linear-to-br from-[var(--zui-field-gradient-purple-from,#faf5ff)] dark:from-[var(--zui-field-gradient-purple-from-dark,#3b0764)] to-[var(--zui-field-gradient-purple-to,#fdf2f8)] dark:to-[var(--zui-field-gradient-purple-to-dark,#500724)] text-[color:var(--zui-field-gradient-purple-fg,#0f172a)] dark:text-[color:var(--zui-field-gradient-purple-fg-dark,#f8fafc)] border-[color:var(--zui-field-gradient-purple-border,#e9d5ff)] dark:border-[color:var(--zui-field-gradient-purple-border-dark,#6b21a8)]",
  "gradient-orange":
    "bg-linear-to-br from-[var(--zui-field-gradient-orange-from,#fff7ed)] dark:from-[var(--zui-field-gradient-orange-from-dark,#431407)] to-[var(--zui-field-gradient-orange-to,#fefce8)] dark:to-[var(--zui-field-gradient-orange-to-dark,#422006)] text-[color:var(--zui-field-gradient-orange-fg,#0f172a)] dark:text-[color:var(--zui-field-gradient-orange-fg-dark,#f8fafc)] border-[color:var(--zui-field-gradient-orange-border,#fed7aa)] dark:border-[color:var(--zui-field-gradient-orange-border-dark,#9a3412)]",
  "gradient-pink":
    "bg-linear-to-br from-[var(--zui-field-gradient-pink-from,#fdf2f8)] dark:from-[var(--zui-field-gradient-pink-from-dark,#500724)] to-[var(--zui-field-gradient-pink-to,#fff1f2)] dark:to-[var(--zui-field-gradient-pink-to-dark,#4c0519)] text-[color:var(--zui-field-gradient-pink-fg,#0f172a)] dark:text-[color:var(--zui-field-gradient-pink-fg-dark,#f8fafc)] border-[color:var(--zui-field-gradient-pink-border,#fbcfe8)] dark:border-[color:var(--zui-field-gradient-pink-border-dark,#9d174d)]",
} as const;
