import type { ToggleProps } from "@zentauri-ui/zentauri-components/ui";

export const TOGGLE_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const TOGGLE_APPEARANCES = [
  "default",
  "success",
  "destructive",
  "neutral",
  "indigo",
  "purple",
  "pink",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "lime",
  "emerald",
  "rose",
  "slate",
  "zinc",
  "gray",
  "stone",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<ToggleProps["appearance"]>[];

export const TOGGLE_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  ToggleProps["size"]
>[];
