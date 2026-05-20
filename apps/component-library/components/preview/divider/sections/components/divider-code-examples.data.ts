import type { DividerProps } from "@zentauri-ui/zentauri-components/ui/divider";

export { PREVIEW_SECTION_CLASS as DIVIDER_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

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

export const DIVIDER_ORIENTATIONS = [
  "horizontal",
  "vertical",
] as const satisfies readonly NonNullable<DividerProps["orientation"]>[];

export const DIVIDER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<DividerProps["size"]>[];
