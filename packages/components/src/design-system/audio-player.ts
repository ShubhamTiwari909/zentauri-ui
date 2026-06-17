export const zuiAudioPlayerBase = [
  "w-full",
  "rounded-[var(--zui-audio-player-radius,var(--zui-radius,0.75rem))]",
  "bg-[var(--zui-audio-player-bg,var(--zui-surface,#ffffff))] dark:bg-[var(--zui-audio-player-bg-dark,var(--zui-surface-dark,#0f172a))]",
  "border border-[var(--zui-audio-player-border,var(--zui-border,#e2e8f0))] dark:border-[var(--zui-audio-player-border-dark,var(--zui-border-dark,#1e293b))]",
  "shadow-[var(--zui-audio-player-shadow,var(--zui-shadow,0_1px_2px_#0f172a14))] dark:shadow-[var(--zui-audio-player-shadow-dark,var(--zui-shadow-dark,0_1px_2px_#0f172a1f))]",
  "text-[color:var(--zui-audio-player-fg,var(--zui-fg,#0f172a))] dark:text-[color:var(--zui-audio-player-fg-dark,var(--zui-fg-dark,#f8fafc))]",
] as const;

export const zuiAudioPlayerAppearances = {
  default:
    "[--audio-fill:var(--zui-audio-player-default-fill,var(--zui-brand,#0f172a))] dark:[--audio-fill:var(--zui-audio-player-default-fill-dark,var(--zui-brand-dark,#f8fafc))]",
  secondary:
    "[--audio-fill:var(--zui-audio-player-secondary-fill,var(--zui-fg,#475569))] dark:[--audio-fill:var(--zui-audio-player-secondary-fill-dark,var(--zui-fg-dark,#94a3b8))]",
  destructive:
    "[--audio-fill:var(--zui-audio-player-destructive-fill,var(--zui-status-error,#dc2626))] dark:[--audio-fill:var(--zui-audio-player-destructive-fill-dark,var(--zui-status-error-dark,#ef4444))]",
  blue: "[--audio-fill:var(--zui-audio-player-blue-fill,var(--zui-color-blue,#2563eb))] dark:[--audio-fill:var(--zui-audio-player-blue-fill-dark,var(--zui-color-blue-dark,#3b82f6))]",
  cyan: "[--audio-fill:var(--zui-audio-player-cyan-fill,var(--zui-color-cyan,#0891b2))] dark:[--audio-fill:var(--zui-audio-player-cyan-fill-dark,var(--zui-color-cyan-dark,#22d3ee))]",
  green:
    "[--audio-fill:var(--zui-audio-player-green-fill,var(--zui-color-green,#16a34a))] dark:[--audio-fill:var(--zui-audio-player-green-fill-dark,var(--zui-color-green-dark,#22c55e))]",
  lime: "[--audio-fill:var(--zui-audio-player-lime-fill,var(--zui-color-lime,#65a30d))] dark:[--audio-fill:var(--zui-audio-player-lime-fill-dark,var(--zui-color-lime-dark,#a3e635))]",
  mint: "[--audio-fill:var(--zui-audio-player-mint-fill,var(--zui-color-mint,#10b981))] dark:[--audio-fill:var(--zui-audio-player-mint-fill-dark,var(--zui-color-mint-dark,#6ee7b7))]",
  ocean:
    "[--audio-fill:var(--zui-audio-player-ocean-fill,var(--zui-color-ocean,#0284c7))] dark:[--audio-fill:var(--zui-audio-player-ocean-fill-dark,var(--zui-color-ocean-dark,#38bdf8))]",
  sapphire:
    "[--audio-fill:var(--zui-audio-player-sapphire-fill,var(--zui-color-sapphire,#1d4ed8))] dark:[--audio-fill:var(--zui-audio-player-sapphire-fill-dark,var(--zui-color-sapphire-dark,#60a5fa))]",
  lavender:
    "[--audio-fill:var(--zui-audio-player-lavender-fill,var(--zui-color-lavender,#8b5cf6))] dark:[--audio-fill:var(--zui-audio-player-lavender-fill-dark,var(--zui-color-lavender-dark,#a78bfa))]",
  ruby: "[--audio-fill:var(--zui-audio-player-ruby-fill,var(--zui-color-ruby,#be123c))] dark:[--audio-fill:var(--zui-audio-player-ruby-fill-dark,var(--zui-color-ruby-dark,#fb7185))]",
  red: "[--audio-fill:var(--zui-audio-player-red-fill,var(--zui-color-red,#dc2626))] dark:[--audio-fill:var(--zui-audio-player-red-fill-dark,var(--zui-color-red-dark,#ef4444))]",
  slate:
    "[--audio-fill:var(--zui-audio-player-slate-fill,var(--zui-color-slate,#475569))] dark:[--audio-fill:var(--zui-audio-player-slate-fill-dark,var(--zui-color-slate-dark,#64748b))]",
  zinc: "[--audio-fill:var(--zui-audio-player-zinc-fill,var(--zui-color-zinc,#52525b))] dark:[--audio-fill:var(--zui-audio-player-zinc-fill-dark,var(--zui-color-zinc-dark,#71717a))]",
  royal:
    "[--audio-fill:var(--zui-audio-player-royal-fill,var(--zui-color-royal,#4338ca))] dark:[--audio-fill:var(--zui-audio-player-royal-fill-dark,var(--zui-color-royal-dark,#818cf8))]",
  electric:
    "[--audio-fill:var(--zui-audio-player-electric-fill,var(--zui-color-electric,#0ea5e9))] dark:[--audio-fill:var(--zui-audio-player-electric-fill-dark,var(--zui-color-electric-dark,#38bdf8))]",
  forest:
    "[--audio-fill:var(--zui-audio-player-forest-fill,var(--zui-color-forest,#166534))] dark:[--audio-fill:var(--zui-audio-player-forest-fill-dark,var(--zui-color-forest-dark,#4ade80))]",
  sunset:
    "[--audio-fill:var(--zui-audio-player-sunset-fill,var(--zui-color-sunset,#ea580c))] dark:[--audio-fill:var(--zui-audio-player-sunset-fill-dark,var(--zui-color-sunset-dark,#fb923c))]",
  magenta:
    "[--audio-fill:var(--zui-audio-player-magenta-fill,var(--zui-color-magenta,#c026d3))] dark:[--audio-fill:var(--zui-audio-player-magenta-fill-dark,var(--zui-color-magenta-dark,#e879f9))]",
  crimson:
    "[--audio-fill:var(--zui-audio-player-crimson-fill,var(--zui-color-crimson,#b91c1c))] dark:[--audio-fill:var(--zui-audio-player-crimson-fill-dark,var(--zui-color-crimson-dark,#f87171))]",
  emerald:
    "[--audio-fill:var(--zui-audio-player-emerald-fill,var(--zui-color-emerald,#059669))] dark:[--audio-fill:var(--zui-audio-player-emerald-fill-dark,var(--zui-color-emerald-dark,#34d399))]",
  indigo:
    "[--audio-fill:var(--zui-audio-player-indigo-fill,var(--zui-color-indigo,#4f46e5))] dark:[--audio-fill:var(--zui-audio-player-indigo-fill-dark,var(--zui-color-indigo-dark,#6366f1))]",
  purple:
    "[--audio-fill:var(--zui-audio-player-purple-fill,var(--zui-color-purple,#7c3aed))] dark:[--audio-fill:var(--zui-audio-player-purple-fill-dark,var(--zui-color-purple-dark,#8b5cf6))]",
  pink: "[--audio-fill:var(--zui-audio-player-pink-fill,var(--zui-color-pink,#db2777))] dark:[--audio-fill:var(--zui-audio-player-pink-fill-dark,var(--zui-color-pink-dark,#ec4899))]",
  rose: "[--audio-fill:var(--zui-audio-player-rose-fill,var(--zui-color-rose,#e11d48))] dark:[--audio-fill:var(--zui-audio-player-rose-fill-dark,var(--zui-color-rose-dark,#f43f5e))]",
  sky: "[--audio-fill:var(--zui-audio-player-sky-fill,var(--zui-color-sky,#0284c7))] dark:[--audio-fill:var(--zui-audio-player-sky-fill-dark,var(--zui-color-sky-dark,#38bdf8))]",
  teal: "[--audio-fill:var(--zui-audio-player-teal-fill,var(--zui-color-teal,#0d9488))] dark:[--audio-fill:var(--zui-audio-player-teal-fill-dark,var(--zui-color-teal-dark,#2dd4bf))]",
  yellow:
    "[--audio-fill:var(--zui-audio-player-yellow-fill,var(--zui-color-yellow,#ca8a04))] dark:[--audio-fill:var(--zui-audio-player-yellow-fill-dark,var(--zui-color-yellow-dark,#eab308))]",
  orange:
    "[--audio-fill:var(--zui-audio-player-orange-fill,var(--zui-color-orange,#ea580c))] dark:[--audio-fill:var(--zui-audio-player-orange-fill-dark,var(--zui-color-orange-dark,#f97316))]",
  "gradient-blue":
    "[--audio-fill:var(--zui-audio-player-gradient-blue-fill,linear-gradient(90deg,#2563eb,#7c3aed))] dark:[--audio-fill:var(--zui-audio-player-gradient-blue-fill-dark,linear-gradient(90deg,#3b82f6,#8b5cf6))]",
  "gradient-green":
    "[--audio-fill:var(--zui-audio-player-gradient-green-fill,linear-gradient(90deg,#16a34a,#0d9488))] dark:[--audio-fill:var(--zui-audio-player-gradient-green-fill-dark,linear-gradient(90deg,#22c55e,#2dd4bf))]",
  "gradient-red":
    "[--audio-fill:var(--zui-audio-player-gradient-red-fill,linear-gradient(90deg,#dc2626,#db2777))] dark:[--audio-fill:var(--zui-audio-player-gradient-red-fill-dark,linear-gradient(90deg,#ef4444,#ec4899))]",
  "gradient-yellow":
    "[--audio-fill:var(--zui-audio-player-gradient-yellow-fill,linear-gradient(90deg,#ca8a04,#ea580c))] dark:[--audio-fill:var(--zui-audio-player-gradient-yellow-fill-dark,linear-gradient(90deg,#eab308,#f97316))]",
  "gradient-purple":
    "[--audio-fill:var(--zui-audio-player-gradient-purple-fill,linear-gradient(90deg,#7c3aed,#db2777))] dark:[--audio-fill:var(--zui-audio-player-gradient-purple-fill-dark,linear-gradient(90deg,#8b5cf6,#ec4899))]",
  "gradient-teal":
    "[--audio-fill:var(--zui-audio-player-gradient-teal-fill,linear-gradient(90deg,#0d9488,#0284c7))] dark:[--audio-fill:var(--zui-audio-player-gradient-teal-fill-dark,linear-gradient(90deg,#2dd4bf,#38bdf8))]",
  "gradient-indigo":
    "[--audio-fill:var(--zui-audio-player-gradient-indigo-fill,linear-gradient(90deg,#4f46e5,#7c3aed))] dark:[--audio-fill:var(--zui-audio-player-gradient-indigo-fill-dark,linear-gradient(90deg,#6366f1,#8b5cf6))]",
  "gradient-pink":
    "[--audio-fill:var(--zui-audio-player-gradient-pink-fill,linear-gradient(90deg,#db2777,#e11d48))] dark:[--audio-fill:var(--zui-audio-player-gradient-pink-fill-dark,linear-gradient(90deg,#ec4899,#f43f5e))]",
  "gradient-orange":
    "[--audio-fill:var(--zui-audio-player-gradient-orange-fill,linear-gradient(90deg,#ea580c,#ca8a04))] dark:[--audio-fill:var(--zui-audio-player-gradient-orange-fill-dark,linear-gradient(90deg,#f97316,#eab308))]",
} as const;

export const zuiAudioPlayerSizes = {
  sm: "p-3 text-xs gap-2",
  md: "p-4 text-sm gap-3",
  lg: "p-5 text-base gap-4",
} as const;

export const zuiAudioPlayerShapes = {
  flat: "rounded-none",
  rounded: "rounded-xl",
  pill: "rounded-3xl",
} as const;

export const zuiAudioPlayerTrackBase = [
  "relative w-full overflow-hidden cursor-pointer",
  "rounded-[inherit]",
  "bg-[var(--zui-audio-player-track-bg,var(--zui-surface-muted,#0000001a))] dark:bg-[var(--zui-audio-player-track-bg-dark,var(--zui-surface-muted-dark,#ffffff1a))]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--audio-fill,#0f172a)] focus-visible:ring-offset-2",
] as const;

export const zuiAudioPlayerTrackSizes = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
} as const;

export const zuiAudioPlayerBarBase =
  "h-full origin-left [background:var(--audio-fill)] transition-[transform] will-change-transform" as const;

export const zuiAudioPlayerTimeBase =
  "tabular-nums font-mono text-[color:var(--zui-audio-player-time-fg,var(--zui-fg-muted,#64748b))] dark:text-[color:var(--zui-audio-player-time-fg-dark,var(--zui-fg-muted-dark,#94a3b8))]" as const;
