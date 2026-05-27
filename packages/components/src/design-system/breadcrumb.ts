export const zuiBreadcrumbNavBase = "text-sm";

export const zuiBreadcrumbAppearances = {
  default:
    "text-[color:var(--zui-breadcrumb-default-fg,oklch(44.6%_0.043_257.281))] dark:text-[color:var(--zui-breadcrumb-default-fg-dark,oklch(86.9%_0.022_252.894))]",
  muted:
    "text-[color:var(--zui-breadcrumb-muted-fg,oklch(55.4%_0.046_257.417))] dark:text-[color:var(--zui-breadcrumb-muted-fg-dark,oklch(70.4%_0.04_256.788))]",
  sky: "text-[color:var(--zui-breadcrumb-sky-fg,oklch(44.3%_0.11_240.79))] dark:text-[color:var(--zui-breadcrumb-sky-fg-dark,oklch(58.8%_0.158_241.966))]",
  rose: "text-[color:var(--zui-breadcrumb-rose-fg,oklch(45.5%_0.188_13.697))] dark:text-[color:var(--zui-breadcrumb-rose-fg-dark,oklch(58.6%_0.253_17.585))]",
  purple:
    "text-[color:var(--zui-breadcrumb-purple-fg,oklch(43.8%_0.218_303.724))] dark:text-[color:var(--zui-breadcrumb-purple-fg-dark,oklch(55.8%_0.288_302.321))]",
  pink: "text-[color:var(--zui-breadcrumb-pink-fg,oklch(45.9%_0.187_3.815))] dark:text-[color:var(--zui-breadcrumb-pink-fg-dark,oklch(59.2%_0.249_0.584))]",
  orange:
    "text-[color:var(--zui-breadcrumb-orange-fg,oklch(47%_0.157_37.304))] dark:text-[color:var(--zui-breadcrumb-orange-fg-dark,oklch(64.6%_0.222_41.116))]",
  yellow:
    "text-[color:var(--zui-breadcrumb-yellow-fg,oklch(47.6%_0.114_61.907))] dark:text-[color:var(--zui-breadcrumb-yellow-fg-dark,oklch(68.1%_0.162_75.834))]",
  teal: "text-[color:var(--zui-breadcrumb-teal-fg,oklch(43.7%_0.078_188.216))] dark:text-[color:var(--zui-breadcrumb-teal-fg-dark,oklch(60%_0.118_184.704))]",
  indigo:
    "text-[color:var(--zui-breadcrumb-indigo-fg,oklch(39.8%_0.195_277.366))] dark:text-[color:var(--zui-breadcrumb-indigo-fg-dark,oklch(51.1%_0.262_276.966))]",
  emerald:
    "text-[color:var(--zui-breadcrumb-emerald-fg,oklch(43.2%_0.095_166.913))] dark:text-[color:var(--zui-breadcrumb-emerald-fg-dark,oklch(59.6%_0.145_163.225))]",
  gray: "text-[color:var(--zui-breadcrumb-gray-fg,oklch(27.8%_0.033_256.848))] dark:text-[color:var(--zui-breadcrumb-gray-fg-dark,oklch(44.6%_0.03_256.802))]",
  amber:
    "text-[color:var(--zui-breadcrumb-amber-fg,oklch(47.3%_0.137_46.201))] dark:text-[color:var(--zui-breadcrumb-amber-fg-dark,oklch(66.6%_0.179_58.318))]",
  violet:
    "text-[color:var(--zui-breadcrumb-violet-fg,oklch(43.2%_0.232_292.759))] dark:text-[color:var(--zui-breadcrumb-violet-fg-dark,oklch(54.1%_0.281_293.009))]",
} as const;

export const zuiBreadcrumbListBase = "flex flex-wrap items-center gap-1.5";

export const zuiBreadcrumbItemBase = "inline-flex items-center gap-1.5";

export const zuiBreadcrumbLinkBase =
  "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zui-breadcrumb-link-ring-focus,#0000004d)] dark:focus-visible:ring-[var(--zui-breadcrumb-link-ring-focus-dark,#ffffff4d)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--zui-breadcrumb-link-ring-offset-focus,oklch(98.4%_0.003_247.858))] dark:focus-visible:ring-offset-[var(--zui-breadcrumb-link-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))]";

export const zuiBreadcrumbPageBase =
  "font-medium text-[color:var(--zui-breadcrumb-page-fg,oklch(27.9%_0.041_260.031))] dark:text-[color:var(--zui-breadcrumb-page-fg-dark,oklch(96.8%_0.007_247.896))]";

export const zuiBreadcrumbSeparatorBase =
  "select-none text-[color:var(--zui-breadcrumb-separator-fg,oklch(70.4%_0.04_256.788))] dark:text-[color:var(--zui-breadcrumb-separator-fg-dark,oklch(44.6%_0.043_257.281))]";

export const zuiBreadcrumbSeparatorSizes = {
  sm: "text-xs",
  md: "text-sm",
} as const;
