import type { BadgeProps } from "@zentauri-ui/zentauri-components/ui/badge";

export const BADGE_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const BADGE_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "glass",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<BadgeProps["appearance"]>[];

export const BADGE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<BadgeProps["size"]>[];

export const BADGE_SHAPES = [
  "pill",
  "square",
  "dot",
] as const satisfies readonly NonNullable<BadgeProps["shape"]>[];
