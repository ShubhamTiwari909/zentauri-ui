import type { TabsListAppearance, TabsListSize, TabsListVariant } from "./tabs-code-examples.types";

export const TABS_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const TABS_LIST_VARIANTS = [
  "default",
  "pills",
  "underline",
] as const satisfies readonly TabsListVariant[];

export const TABS_LIST_SIZES = ["sm", "md", "lg"] as const satisfies readonly TabsListSize[];

export const TABS_LIST_APPEARANCES = [
  "default",
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
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly TabsListAppearance[];
