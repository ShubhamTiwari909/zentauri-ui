export const zuiEmptyStateBase =
  "flex w-full flex-col items-center text-center";

export const zuiEmptyStateSizes = {
  sm: "gap-2 p-4 text-sm",
  md: "gap-3 p-6 text-sm",
  lg: "gap-4 p-8 text-base",
} as const;

export const zuiEmptyStateAppearances = {
  default:
    "text-[color:var(--zui-empty-state-default-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-empty-state-default-fg-dark,oklch(98.4%_0.003_247.858))]",
  ghost:
    "text-[color:var(--zui-empty-state-ghost-fg,oklch(37.2%_0.044_257.287))] dark:text-[color:var(--zui-empty-state-ghost-fg-dark,oklch(92.9%_0.013_255.508))]",
  card: "rounded-2xl border border-[color:var(--zui-empty-state-card-border,#0000001a)] dark:border-[color:var(--zui-empty-state-card-border-dark,#ffffff1a)] bg-[var(--zui-empty-state-card-bg,#ffffffe6)] dark:bg-[var(--zui-empty-state-card-bg-dark,#ffffff0d)] p-8 text-[color:var(--zui-empty-state-card-fg,oklch(20.8%_0.042_265.755))] dark:text-[color:var(--zui-empty-state-card-fg-dark,oklch(98.4%_0.003_247.858))] shadow-[var(--zui-empty-state-card-shadow,0_8px_24px_rgba(15,23,42,0.12))] dark:shadow-[var(--zui-empty-state-card-shadow-dark,0_18px_48px_rgba(15,23,42,0.35))]",
  blue: "border border-[color:var(--zui-empty-state-blue-border,#2563eb)] dark:border-[color:var(--zui-empty-state-blue-border-dark,#3b82f6)] bg-[var(--zui-empty-state-blue-bg,#2563eb14)] dark:bg-[var(--zui-empty-state-blue-bg-dark,#3b82f624)] text-[color:var(--zui-empty-state-blue-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-blue-fg-dark,#f8fafc)]",
  cyan: "border border-[color:var(--zui-empty-state-cyan-border,#0891b2)] dark:border-[color:var(--zui-empty-state-cyan-border-dark,#22d3ee)] bg-[var(--zui-empty-state-cyan-bg,#0891b214)] dark:bg-[var(--zui-empty-state-cyan-bg-dark,#22d3ee24)] text-[color:var(--zui-empty-state-cyan-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-cyan-fg-dark,#f8fafc)]",
  green:
    "border border-[color:var(--zui-empty-state-green-border,#16a34a)] dark:border-[color:var(--zui-empty-state-green-border-dark,#22c55e)] bg-[var(--zui-empty-state-green-bg,#16a34a14)] dark:bg-[var(--zui-empty-state-green-bg-dark,#22c55e24)] text-[color:var(--zui-empty-state-green-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-green-fg-dark,#f8fafc)]",
  lime: "border border-[color:var(--zui-empty-state-lime-border,#65a30d)] dark:border-[color:var(--zui-empty-state-lime-border-dark,#a3e635)] bg-[var(--zui-empty-state-lime-bg,#65a30d14)] dark:bg-[var(--zui-empty-state-lime-bg-dark,#a3e63524)] text-[color:var(--zui-empty-state-lime-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-lime-fg-dark,#f8fafc)]",
  mint: "border border-[color:var(--zui-empty-state-mint-border,#10b981)] dark:border-[color:var(--zui-empty-state-mint-border-dark,#6ee7b7)] bg-[var(--zui-empty-state-mint-bg,#10b98114)] dark:bg-[var(--zui-empty-state-mint-bg-dark,#6ee7b724)] text-[color:var(--zui-empty-state-mint-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-mint-fg-dark,#f8fafc)]",
  ocean:
    "border border-[color:var(--zui-empty-state-ocean-border,#0284c7)] dark:border-[color:var(--zui-empty-state-ocean-border-dark,#38bdf8)] bg-[var(--zui-empty-state-ocean-bg,#0284c714)] dark:bg-[var(--zui-empty-state-ocean-bg-dark,#38bdf824)] text-[color:var(--zui-empty-state-ocean-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-ocean-fg-dark,#f8fafc)]",
  sapphire:
    "border border-[color:var(--zui-empty-state-sapphire-border,#1d4ed8)] dark:border-[color:var(--zui-empty-state-sapphire-border-dark,#60a5fa)] bg-[var(--zui-empty-state-sapphire-bg,#1d4ed814)] dark:bg-[var(--zui-empty-state-sapphire-bg-dark,#60a5fa24)] text-[color:var(--zui-empty-state-sapphire-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-sapphire-fg-dark,#f8fafc)]",
  lavender:
    "border border-[color:var(--zui-empty-state-lavender-border,#8b5cf6)] dark:border-[color:var(--zui-empty-state-lavender-border-dark,#a78bfa)] bg-[var(--zui-empty-state-lavender-bg,#8b5cf614)] dark:bg-[var(--zui-empty-state-lavender-bg-dark,#a78bfa24)] text-[color:var(--zui-empty-state-lavender-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-lavender-fg-dark,#f8fafc)]",
  ruby: "border border-[color:var(--zui-empty-state-ruby-border,#be123c)] dark:border-[color:var(--zui-empty-state-ruby-border-dark,#fb7185)] bg-[var(--zui-empty-state-ruby-bg,#be123c14)] dark:bg-[var(--zui-empty-state-ruby-bg-dark,#fb718524)] text-[color:var(--zui-empty-state-ruby-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-ruby-fg-dark,#f8fafc)]",
  red: "border border-[color:var(--zui-empty-state-red-border,#dc2626)] dark:border-[color:var(--zui-empty-state-red-border-dark,#ef4444)] bg-[var(--zui-empty-state-red-bg,#dc262614)] dark:bg-[var(--zui-empty-state-red-bg-dark,#ef444424)] text-[color:var(--zui-empty-state-red-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-red-fg-dark,#f8fafc)]",
  slate:
    "border border-[color:var(--zui-empty-state-slate-border,#475569)] dark:border-[color:var(--zui-empty-state-slate-border-dark,#64748b)] bg-[var(--zui-empty-state-slate-bg,#47556914)] dark:bg-[var(--zui-empty-state-slate-bg-dark,#64748b24)] text-[color:var(--zui-empty-state-slate-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-slate-fg-dark,#f8fafc)]",
  zinc: "border border-[color:var(--zui-empty-state-zinc-border,#52525b)] dark:border-[color:var(--zui-empty-state-zinc-border-dark,#71717a)] bg-[var(--zui-empty-state-zinc-bg,#52525b14)] dark:bg-[var(--zui-empty-state-zinc-bg-dark,#71717a24)] text-[color:var(--zui-empty-state-zinc-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-zinc-fg-dark,#f8fafc)]",
  stone:
    "border border-[color:var(--zui-empty-state-stone-border,#57534e)] dark:border-[color:var(--zui-empty-state-stone-border-dark,#78716c)] bg-[var(--zui-empty-state-stone-bg,#57534e14)] dark:bg-[var(--zui-empty-state-stone-bg-dark,#78716c24)] text-[color:var(--zui-empty-state-stone-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-stone-fg-dark,#f8fafc)]",
  royal:
    "border border-[color:var(--zui-empty-state-royal-border,#4338ca)] dark:border-[color:var(--zui-empty-state-royal-border-dark,#818cf8)] bg-[var(--zui-empty-state-royal-bg,#4338ca14)] dark:bg-[var(--zui-empty-state-royal-bg-dark,#818cf824)] text-[color:var(--zui-empty-state-royal-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-royal-fg-dark,#f8fafc)]",
  electric:
    "border border-[color:var(--zui-empty-state-electric-border,#0ea5e9)] dark:border-[color:var(--zui-empty-state-electric-border-dark,#38bdf8)] bg-[var(--zui-empty-state-electric-bg,#0ea5e914)] dark:bg-[var(--zui-empty-state-electric-bg-dark,#38bdf824)] text-[color:var(--zui-empty-state-electric-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-electric-fg-dark,#f8fafc)]",
  forest:
    "border border-[color:var(--zui-empty-state-forest-border,#166534)] dark:border-[color:var(--zui-empty-state-forest-border-dark,#4ade80)] bg-[var(--zui-empty-state-forest-bg,#16653414)] dark:bg-[var(--zui-empty-state-forest-bg-dark,#4ade8024)] text-[color:var(--zui-empty-state-forest-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-forest-fg-dark,#f8fafc)]",
  sunset:
    "border border-[color:var(--zui-empty-state-sunset-border,#ea580c)] dark:border-[color:var(--zui-empty-state-sunset-border-dark,#fb923c)] bg-[var(--zui-empty-state-sunset-bg,#ea580c14)] dark:bg-[var(--zui-empty-state-sunset-bg-dark,#fb923c24)] text-[color:var(--zui-empty-state-sunset-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-sunset-fg-dark,#f8fafc)]",
  magenta:
    "border border-[color:var(--zui-empty-state-magenta-border,#c026d3)] dark:border-[color:var(--zui-empty-state-magenta-border-dark,#e879f9)] bg-[var(--zui-empty-state-magenta-bg,#c026d314)] dark:bg-[var(--zui-empty-state-magenta-bg-dark,#e879f924)] text-[color:var(--zui-empty-state-magenta-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-magenta-fg-dark,#f8fafc)]",
  crimson:
    "border border-[color:var(--zui-empty-state-crimson-border,#b91c1c)] dark:border-[color:var(--zui-empty-state-crimson-border-dark,#f87171)] bg-[var(--zui-empty-state-crimson-bg,#b91c1c14)] dark:bg-[var(--zui-empty-state-crimson-bg-dark,#f8717124)] text-[color:var(--zui-empty-state-crimson-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-crimson-fg-dark,#f8fafc)]",
  aqua: "border border-[color:var(--zui-empty-state-aqua-border,#0f766e)] dark:border-[color:var(--zui-empty-state-aqua-border-dark,#2dd4bf)] bg-[var(--zui-empty-state-aqua-bg,#0f766e14)] dark:bg-[var(--zui-empty-state-aqua-bg-dark,#2dd4bf24)] text-[color:var(--zui-empty-state-aqua-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-aqua-fg-dark,#f8fafc)]",
  plum: "border border-[color:var(--zui-empty-state-plum-border,#7e22ce)] dark:border-[color:var(--zui-empty-state-plum-border-dark,#c084fc)] bg-[var(--zui-empty-state-plum-bg,#7e22ce14)] dark:bg-[var(--zui-empty-state-plum-bg-dark,#c084fc24)] text-[color:var(--zui-empty-state-plum-fg,#0f172a)] dark:text-[color:var(--zui-empty-state-plum-fg-dark,#f8fafc)]",
} as const;

export const zuiEmptyStateAlignments = {
  start: "items-start text-left",
  center: "items-center text-center",
  end: "items-end text-right",
} as const;

export const zuiEmptyStateTitleBase = "font-semibold tracking-tight";

export const zuiEmptyStateTitleSizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
} as const;

export const zuiEmptyStateDescriptionBase =
  "max-w-md text-[color:var(--zui-empty-state-description-fg,oklch(55.4%_0.046_257.417))] dark:text-[color:var(--zui-empty-state-description-fg-dark,oklch(70.4%_0.04_256.788))]";

export const zuiEmptyStateDescriptionSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;
