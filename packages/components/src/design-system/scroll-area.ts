export const zuiScrollAreaBase =
  "relative min-w-0 rounded-xl outline-none transition-[background-color,border-color,box-shadow,scrollbar-color] duration-200 [scrollbar-color:var(--zui-scroll-area-thumb,#94a3b8)_var(--zui-scroll-area-track,transparent)] [scrollbar-width:thin] focus-visible:ring-2 focus-visible:ring-[var(--zui-scroll-area-ring-focus,oklch(54.6%_0.245_262.881_/_0.28))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--zui-scroll-area-ring-offset-focus,#ffffff)] dark:focus-visible:ring-[var(--zui-scroll-area-ring-focus-dark,oklch(70.7%_0.165_254.624_/_0.28))] dark:focus-visible:ring-offset-[var(--zui-scroll-area-ring-offset-focus-dark,oklch(12.9%_0.042_264.695))] [&::-webkit-scrollbar]:h-[var(--zui-scroll-area-size,0.625rem)] [&::-webkit-scrollbar]:w-[var(--zui-scroll-area-size,0.625rem)] [&::-webkit-scrollbar-corner]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[var(--zui-scroll-area-thumb-border,transparent)] [&::-webkit-scrollbar-thumb]:bg-[var(--zui-scroll-area-thumb,#94a3b8)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[var(--zui-scroll-area-track,transparent)]";

export const zuiScrollAreaAppearances = {
  default:
    "[--zui-scroll-area-thumb:#94a3b8] [--zui-scroll-area-thumb-border:#f8fafc] [--zui-scroll-area-track:#e2e8f0] dark:[--zui-scroll-area-thumb:#64748b] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#1e293b]",
  muted:
    "[--zui-scroll-area-thumb:#cbd5e1] [--zui-scroll-area-thumb-border:#f8fafc] [--zui-scroll-area-track:#f1f5f9] dark:[--zui-scroll-area-thumb:#475569] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#0f172a]",
  outline:
    "border border-[color:var(--zui-scroll-area-outline-border,#cbd5e1)] [--zui-scroll-area-thumb:#64748b] [--zui-scroll-area-thumb-border:#ffffff] [--zui-scroll-area-track:#e2e8f0] dark:border-[color:var(--zui-scroll-area-outline-border-dark,#334155)] dark:[--zui-scroll-area-thumb:#94a3b8] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#1e293b]",
  glass:
    "border border-[color:var(--zui-scroll-area-glass-border,#ffffff80)] bg-[var(--zui-scroll-area-glass-bg,#ffffff99)] backdrop-blur-md [--zui-scroll-area-thumb:oklch(70.7%_0.165_254.624_/_0.9)] [--zui-scroll-area-thumb-border:#ffffff66] [--zui-scroll-area-track:#ffffff33] dark:border-[color:var(--zui-scroll-area-glass-border-dark,#ffffff1f)] dark:bg-[var(--zui-scroll-area-glass-bg-dark,#0f172acc)] dark:[--zui-scroll-area-thumb:oklch(78.9%_0.154_211.53_/_0.8)] dark:[--zui-scroll-area-thumb-border:#02061766] dark:[--zui-scroll-area-track:#ffffff12]",
  sky: "border border-[color:var(--zui-scroll-area-sky-border,oklch(62.3%_0.214_259.815_/_0.35))] [--zui-scroll-area-thumb:oklch(54.6%_0.245_262.881)] [--zui-scroll-area-thumb-border:#eff6ff] [--zui-scroll-area-track:#dbeafe] dark:border-[color:var(--zui-scroll-area-sky-border-dark,oklch(70.7%_0.165_254.624_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(70.7%_0.165_254.624)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#172554]",
  emerald:
    "border border-[color:var(--zui-scroll-area-emerald-border,oklch(59.6%_0.145_163.225_/_0.35))] [--zui-scroll-area-thumb:oklch(59.6%_0.145_163.225)] [--zui-scroll-area-thumb-border:#ecfdf5] [--zui-scroll-area-track:#d1fae5] dark:border-[color:var(--zui-scroll-area-emerald-border-dark,oklch(69.6%_0.17_162.48_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(69.6%_0.17_162.48)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#064e3b]",
  rose: "border border-[color:var(--zui-scroll-area-rose-border,oklch(58.6%_0.253_17.585_/_0.3))] [--zui-scroll-area-thumb:oklch(58.6%_0.253_17.585)] [--zui-scroll-area-thumb-border:#fff1f2] [--zui-scroll-area-track:#ffe4e6] dark:border-[color:var(--zui-scroll-area-rose-border-dark,oklch(71.2%_0.194_13.428_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(71.2%_0.194_13.428)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#4c0519]",
  amber:
    "border border-[color:var(--zui-scroll-area-amber-border,oklch(76.9%_0.188_70.08_/_0.35))] [--zui-scroll-area-thumb:oklch(66.6%_0.179_58.318)] [--zui-scroll-area-thumb-border:#fffbeb] [--zui-scroll-area-track:#fef3c7] dark:border-[color:var(--zui-scroll-area-amber-border-dark,oklch(82.8%_0.189_84.429_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(82.8%_0.189_84.429)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#451a03]",
  violet:
    "border border-[color:var(--zui-scroll-area-violet-border,oklch(60.6%_0.25_292.717_/_0.35))] [--zui-scroll-area-thumb:oklch(54.1%_0.281_293.009)] [--zui-scroll-area-thumb-border:#f5f3ff] [--zui-scroll-area-track:#ede9fe] dark:border-[color:var(--zui-scroll-area-violet-border-dark,oklch(70.2%_0.183_293.541_/_0.35))] dark:[--zui-scroll-area-thumb:oklch(70.2%_0.183_293.541)] dark:[--zui-scroll-area-thumb-border:#020617] dark:[--zui-scroll-area-track:#2e1065]",
} as const;

export const zuiScrollAreaSizes = {
  sm: "[--zui-scroll-area-size:0.375rem]",
  md: "[--zui-scroll-area-size:0.625rem]",
  lg: "[--zui-scroll-area-size:0.875rem]",
} as const;

export const zuiScrollAreaOrientations = {
  vertical: "overflow-x-hidden overflow-y-auto",
  horizontal: "overflow-x-auto overflow-y-hidden",
  both: "overflow-auto",
} as const;

export const zuiScrollAreaVisibility = {
  auto: "",
  hover:
    "[scrollbar-color:transparent_transparent] hover:[scrollbar-color:var(--zui-scroll-area-thumb,#94a3b8)_var(--zui-scroll-area-track,transparent)] [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-[var(--zui-scroll-area-thumb,#94a3b8)] [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-track]:bg-[var(--zui-scroll-area-track,transparent)]",
  always: "",
  hidden:
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0",
} as const;

export const zuiScrollAreaShadows = {
  false: "",
  true: "[box-shadow:inset_0_2px_12px_rgb(15_23_42_/_0.08)] dark:[box-shadow:inset_0_2px_12px_rgb(0_0_0_/_0.3)]",
} as const;
