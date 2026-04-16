import type { DividerProps } from "@zentauri-ui/zentauri-components/ui";

export const DIVIDER_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const DIVIDER_APPEARANCES = [
  "default",
  "muted",
  "primary",
  "destructive",
  "ghost",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<DividerProps["appearance"]>[];

export const DIVIDER_ORIENTATIONS = ["horizontal", "vertical"] as const satisfies readonly NonNullable<
  DividerProps["orientation"]
>[];

export const DIVIDER_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  DividerProps["size"]
>[];
