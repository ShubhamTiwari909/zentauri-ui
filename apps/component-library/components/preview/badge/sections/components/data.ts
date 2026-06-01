import type { BadgeProps } from "@zentauri-ui/zentauri-components/ui/badge";

export { PREVIEW_SECTION_CLASS as BADGE_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

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
