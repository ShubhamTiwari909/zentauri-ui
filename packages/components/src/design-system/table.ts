export const zuiTableBase =
  "w-full table-auto border-collapse caption-bottom text-sm text-[color:var(--zui-table-fg,oklch(37.2%_0.044_257.287))] dark:text-[color:var(--zui-table-fg-dark,oklch(92.9%_0.013_255.508))] md:table-fixed";

export const zuiTableAppearances = {
  default: "",
  striped: "",
  bordered:
    "border border-[color:var(--zui-table-bordered-border,#0000001a)] dark:border-[color:var(--zui-table-bordered-border-dark,#ffffff1a)]",
  ghost: "",
  sky: "border border-[color:var(--zui-table-sky-border,oklch(44.3%_0.11_240.79))] dark:border-[color:var(--zui-table-sky-border-dark,oklch(58.8%_0.158_241.966))]",
  rose: "border border-[color:var(--zui-table-rose-border,oklch(45.5%_0.188_13.697))] dark:border-[color:var(--zui-table-rose-border-dark,oklch(58.6%_0.253_17.585))]",
  purple:
    "border border-[color:var(--zui-table-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-table-purple-border-dark,oklch(55.8%_0.288_302.321))]",
  pink: "border border-[color:var(--zui-table-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-table-pink-border-dark,oklch(59.2%_0.249_0.584))]",
  orange:
    "border border-[color:var(--zui-table-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-table-orange-border-dark,oklch(64.6%_0.222_41.116))]",
  yellow:
    "border border-[color:var(--zui-table-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-table-yellow-border-dark,oklch(68.1%_0.162_75.834))]",
  teal: "border border-[color:var(--zui-table-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-table-teal-border-dark,oklch(60%_0.118_184.704))]",
  indigo:
    "border border-[color:var(--zui-table-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-table-indigo-border-dark,oklch(51.1%_0.262_276.966))]",
  emerald:
    "border border-[color:var(--zui-table-emerald-border,oklch(43.2%_0.095_166.913))] dark:border-[color:var(--zui-table-emerald-border-dark,oklch(59.6%_0.145_163.225))]",
  gray: "border border-[color:var(--zui-table-gray-border,oklch(27.8%_0.033_256.848))] dark:border-[color:var(--zui-table-gray-border-dark,oklch(44.6%_0.03_256.802))]",
  amber:
    "border border-[color:var(--zui-table-amber-border,oklch(47.3%_0.137_46.201))] dark:border-[color:var(--zui-table-amber-border-dark,oklch(66.6%_0.179_58.318))]",
  violet:
    "border border-[color:var(--zui-table-violet-border,oklch(43.2%_0.232_292.759))] dark:border-[color:var(--zui-table-violet-border-dark,oklch(54.1%_0.281_293.009))]",
} as const;

export const zuiTableSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export const zuiTableStickyHeader = {
  true: "",
  false: "",
} as const;

export const zuiTableRowBase =
  "border-b border-[color:var(--zui-table-row-border,#0000000d)] dark:border-[color:var(--zui-table-row-border-dark,#ffffff0d)] transition-colors data-[state=selected]:bg-[var(--zui-table-row-bg-selected,#0000000f)] dark:data-[state=selected]:bg-[var(--zui-table-row-bg-selected-dark,#ffffff0f)]";

export const zuiTableRowAppearances = {
  default: "",
  striped:
    "odd:bg-[var(--zui-table-row-striped-bg,#00000008)] dark:odd:bg-[var(--zui-table-row-striped-bg-dark,#ffffff08)]",
  bordered: "",
  ghost:
    "border-[color:var(--zui-table-row-ghost-border,transparent)] dark:border-[color:var(--zui-table-row-ghost-border-dark,transparent)] hover:bg-[var(--zui-table-row-ghost-bg-hover,#00000008)] dark:hover:bg-[var(--zui-table-row-ghost-bg-hover-dark,#ffffff08)]",
  sky: "border-[color:var(--zui-table-row-sky-border,oklch(44.3%_0.11_240.79))] dark:border-[color:var(--zui-table-row-sky-border-dark,oklch(58.8%_0.158_241.966))] hover:bg-[var(--zui-table-row-sky-bg-hover,oklch(44.3%_0.11_240.79))] dark:hover:bg-[var(--zui-table-row-sky-bg-hover-dark,oklch(58.8%_0.158_241.966))] hover:text-[color:var(--zui-table-row-sky-fg-hover,oklch(95.1%_0.026_236.824))] dark:hover:text-[color:var(--zui-table-row-sky-fg-hover-dark,oklch(95.1%_0.026_236.824))]",
  rose: "border-[color:var(--zui-table-row-rose-border,oklch(45.5%_0.188_13.697))] dark:border-[color:var(--zui-table-row-rose-border-dark,oklch(58.6%_0.253_17.585))] hover:bg-[var(--zui-table-row-rose-bg-hover,oklch(64.5%_0.246_16.439))] dark:hover:bg-[var(--zui-table-row-rose-bg-hover-dark,oklch(41%_0.159_10.272))] hover:text-[color:var(--zui-table-row-rose-fg-hover,oklch(94.1%_0.03_12.58))] dark:hover:text-[color:var(--zui-table-row-rose-fg-hover-dark,oklch(94.1%_0.03_12.58))]",
  purple:
    "border-[color:var(--zui-table-row-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-table-row-purple-border-dark,oklch(55.8%_0.288_302.321))] hover:bg-[var(--zui-table-row-purple-bg-hover,oklch(62.7%_0.265_303.9))] dark:hover:bg-[var(--zui-table-row-purple-bg-hover-dark,oklch(38.1%_0.176_304.987))] hover:text-[color:var(--zui-table-row-purple-fg-hover,oklch(94.6%_0.033_307.174))] dark:hover:text-[color:var(--zui-table-row-purple-fg-hover-dark,oklch(94.6%_0.033_307.174))]",
  pink: "border-[color:var(--zui-table-row-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-table-row-pink-border-dark,oklch(59.2%_0.249_0.584))] hover:bg-[var(--zui-table-row-pink-bg-hover,oklch(65.6%_0.241_354.308))] dark:hover:bg-[var(--zui-table-row-pink-bg-hover-dark,oklch(40.8%_0.153_2.432))] hover:text-[color:var(--zui-table-row-pink-fg-hover,oklch(94.8%_0.028_342.258))] dark:hover:text-[color:var(--zui-table-row-pink-fg-hover-dark,oklch(94.8%_0.028_342.258))]",
  orange:
    "border-[color:var(--zui-table-row-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-table-row-orange-border-dark,oklch(64.6%_0.222_41.116))] hover:bg-[var(--zui-table-row-orange-bg-hover,oklch(70.5%_0.213_47.604))] dark:hover:bg-[var(--zui-table-row-orange-bg-hover-dark,oklch(40.8%_0.123_38.172))] hover:text-[color:var(--zui-table-row-orange-fg-hover,oklch(95.4%_0.038_75.164))] dark:hover:text-[color:var(--zui-table-row-orange-fg-hover-dark,oklch(95.4%_0.038_75.164))]",
  yellow:
    "border-[color:var(--zui-table-row-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-table-row-yellow-border-dark,oklch(68.1%_0.162_75.834))] hover:bg-[var(--zui-table-row-yellow-bg-hover,oklch(79.5%_0.184_86.047))] dark:hover:bg-[var(--zui-table-row-yellow-bg-hover-dark,oklch(42.1%_0.095_57.708))] hover:text-[color:var(--zui-table-row-yellow-fg-hover,oklch(97.3%_0.071_103.193))] dark:hover:text-[color:var(--zui-table-row-yellow-fg-hover-dark,oklch(97.3%_0.071_103.193))]",
  teal: "border-[color:var(--zui-table-row-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-table-row-teal-border-dark,oklch(60%_0.118_184.704))] hover:bg-[var(--zui-table-row-teal-bg-hover,oklch(70.4%_0.14_182.503))] dark:hover:bg-[var(--zui-table-row-teal-bg-hover-dark,oklch(38.6%_0.063_188.416))] hover:text-[color:var(--zui-table-row-teal-fg-hover,oklch(95.3%_0.051_180.801))] dark:hover:text-[color:var(--zui-table-row-teal-fg-hover-dark,oklch(95.3%_0.051_180.801))]",
  indigo:
    "border-[color:var(--zui-table-row-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-table-row-indigo-border-dark,oklch(51.1%_0.262_276.966))] hover:bg-[var(--zui-table-row-indigo-bg-hover,oklch(58.5%_0.233_277.117))] dark:hover:bg-[var(--zui-table-row-indigo-bg-hover-dark,oklch(35.9%_0.144_278.697))] hover:text-[color:var(--zui-table-row-indigo-fg-hover,oklch(93%_0.034_272.788))] dark:hover:text-[color:var(--zui-table-row-indigo-fg-hover-dark,oklch(93%_0.034_272.788))]",
  emerald:
    "border-[color:var(--zui-table-row-emerald-border,oklch(43.2%_0.095_166.913))] dark:border-[color:var(--zui-table-row-emerald-border-dark,oklch(59.6%_0.145_163.225))] hover:bg-[var(--zui-table-row-emerald-bg-hover,oklch(69.6%_0.17_162.48))] dark:hover:bg-[var(--zui-table-row-emerald-bg-hover-dark,oklch(37.8%_0.077_168.94))] hover:text-[color:var(--zui-table-row-emerald-fg-hover,oklch(95%_0.052_163.051))] dark:hover:text-[color:var(--zui-table-row-emerald-fg-hover-dark,oklch(95%_0.052_163.051))]",
  gray: "border-[color:var(--zui-table-row-gray-border,oklch(27.8%_0.033_256.848))] dark:border-[color:var(--zui-table-row-gray-border-dark,oklch(44.6%_0.03_256.802))] hover:bg-[var(--zui-table-row-gray-bg-hover,oklch(55.1%_0.027_264.364))] dark:hover:bg-[var(--zui-table-row-gray-bg-hover-dark,oklch(21%_0.034_264.665))] hover:text-[color:var(--zui-table-row-gray-fg-hover,oklch(96.7%_0.003_264.542))] dark:hover:text-[color:var(--zui-table-row-gray-fg-hover-dark,oklch(96.7%_0.003_264.542))]",
  amber:
    "border-[color:var(--zui-table-row-amber-border,oklch(47.3%_0.137_46.201))] dark:border-[color:var(--zui-table-row-amber-border-dark,oklch(66.6%_0.179_58.318))] hover:bg-[var(--zui-table-row-amber-bg-hover,oklch(76.9%_0.188_70.08))] dark:hover:bg-[var(--zui-table-row-amber-bg-hover-dark,oklch(41.4%_0.112_45.904))] hover:text-[color:var(--zui-table-row-amber-fg-hover,oklch(96.2%_0.059_95.617))] dark:hover:text-[color:var(--zui-table-row-amber-fg-hover-dark,oklch(96.2%_0.059_95.617))]",
  violet:
    "border-[color:var(--zui-table-row-violet-border,oklch(43.2%_0.232_292.759))] dark:border-[color:var(--zui-table-row-violet-border-dark,oklch(54.1%_0.281_293.009))] hover:bg-[var(--zui-table-row-violet-bg-hover,oklch(60.6%_0.25_292.717))] dark:hover:bg-[var(--zui-table-row-violet-bg-hover-dark,oklch(38%_0.189_293.745))] hover:text-[color:var(--zui-table-row-violet-fg-hover,oklch(94.3%_0.029_294.588))] dark:hover:text-[color:var(--zui-table-row-violet-fg-hover-dark,oklch(94.3%_0.029_294.588))]",
} as const;

export const zuiTableCellBase = "min-w-0 border p-3 align-middle break-words";

export const zuiTableCellAppearances = {
  default:
    "border-[color:var(--zui-table-cell-default-border,#0000001a)] dark:border-[color:var(--zui-table-cell-default-border-dark,#ffffff1a)]",
  striped:
    "border-[color:var(--zui-table-cell-striped-border,#0000001a)] dark:border-[color:var(--zui-table-cell-striped-border-dark,#ffffff1a)]",
  bordered:
    "border-[color:var(--zui-table-cell-bordered-border,#0000001a)] dark:border-[color:var(--zui-table-cell-bordered-border-dark,#ffffff1a)]",
  ghost:
    "border-[color:var(--zui-table-cell-ghost-border,#0000001a)] dark:border-[color:var(--zui-table-cell-ghost-border-dark,#ffffff1a)]",
  sky: "border-[color:var(--zui-table-cell-sky-border,oklch(44.3%_0.11_240.79))] dark:border-[color:var(--zui-table-cell-sky-border-dark,oklch(58.8%_0.158_241.966))]",
  rose: "border-[color:var(--zui-table-cell-rose-border,oklch(45.5%_0.188_13.697))] dark:border-[color:var(--zui-table-cell-rose-border-dark,oklch(58.6%_0.253_17.585))]",
  purple:
    "border-[color:var(--zui-table-cell-purple-border,oklch(43.8%_0.218_303.724))] dark:border-[color:var(--zui-table-cell-purple-border-dark,oklch(55.8%_0.288_302.321))]",
  pink: "border-[color:var(--zui-table-cell-pink-border,oklch(45.9%_0.187_3.815))] dark:border-[color:var(--zui-table-cell-pink-border-dark,oklch(59.2%_0.249_0.584))]",
  orange:
    "border-[color:var(--zui-table-cell-orange-border,oklch(47%_0.157_37.304))] dark:border-[color:var(--zui-table-cell-orange-border-dark,oklch(64.6%_0.222_41.116))]",
  yellow:
    "border-[color:var(--zui-table-cell-yellow-border,oklch(47.6%_0.114_61.907))] dark:border-[color:var(--zui-table-cell-yellow-border-dark,oklch(68.1%_0.162_75.834))]",
  teal: "border-[color:var(--zui-table-cell-teal-border,oklch(43.7%_0.078_188.216))] dark:border-[color:var(--zui-table-cell-teal-border-dark,oklch(60%_0.118_184.704))]",
  indigo:
    "border-[color:var(--zui-table-cell-indigo-border,oklch(39.8%_0.195_277.366))] dark:border-[color:var(--zui-table-cell-indigo-border-dark,oklch(51.1%_0.262_276.966))]",
  emerald:
    "border-[color:var(--zui-table-cell-emerald-border,oklch(43.2%_0.095_166.913))] dark:border-[color:var(--zui-table-cell-emerald-border-dark,oklch(59.6%_0.145_163.225))]",
  gray: "border-[color:var(--zui-table-cell-gray-border,oklch(27.8%_0.033_256.848))] dark:border-[color:var(--zui-table-cell-gray-border-dark,oklch(44.6%_0.03_256.802))]",
  amber:
    "border-[color:var(--zui-table-cell-amber-border,oklch(47.3%_0.137_46.201))] dark:border-[color:var(--zui-table-cell-amber-border-dark,oklch(66.6%_0.179_58.318))]",
  violet:
    "border-[color:var(--zui-table-cell-violet-border,oklch(43.2%_0.232_292.759))] dark:border-[color:var(--zui-table-cell-violet-border-dark,oklch(54.1%_0.281_293.009))]",
} as const;

export const zuiTableCellSizes = {
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
} as const;

export const zuiTableTextAlignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;
