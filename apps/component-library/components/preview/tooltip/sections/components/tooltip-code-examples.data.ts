import type { TooltipAnimation } from "@zentauri-ui/zentauri-components/ui/tooltip/animated";
import type {
  TooltipContentProps,
  TooltipPosition,
} from "@zentauri-ui/zentauri-components/ui/tooltip";

export { PREVIEW_SECTION_CLASS as TOOLTIP_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const CONTENT_VARIANTS = [
  "default",
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
  "green",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<TooltipContentProps["variant"]>[];

export const CONTENT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TooltipContentProps["size"]>[];

export const CONTENT_WIDTHS = [
  "fit",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const satisfies readonly NonNullable<TooltipContentProps["width"]>[];

export const TOOLTIP_POSITIONS = [
  "top",
  "bottom",
  "left",
  "right",
] as const satisfies readonly TooltipPosition[];

export const CONTENT_ANIMATIONS = [
  "fade",
  "scale",
  "none",
] as const satisfies readonly TooltipAnimation[];

export type ContentVariant = (typeof CONTENT_VARIANTS)[number];
export type ContentSize = (typeof CONTENT_SIZES)[number];
export type ContentWidth = (typeof CONTENT_WIDTHS)[number];
export type TooltipPlacement = (typeof TOOLTIP_POSITIONS)[number];
export type ContentAnimation = (typeof CONTENT_ANIMATIONS)[number];
