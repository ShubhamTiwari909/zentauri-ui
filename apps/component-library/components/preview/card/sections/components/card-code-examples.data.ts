import type { CardProps } from "@zentauri-ui/zentauri-components/ui/card";

export const CARD_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const CARD_APPEARANCES = [
  "default",
  "glass",
  "outline",
  "ghost",
  "elevated",
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
] as const satisfies readonly NonNullable<CardProps["appearance"]>[];

export const CARD_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  CardProps["size"]
>[];

export const CARD_ROUNDED = ["sm", "md", "lg", "full"] as const satisfies readonly NonNullable<
  CardProps["rounded"]
>[];
