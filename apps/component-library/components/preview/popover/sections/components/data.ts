import type { PopoverAnimation } from "@zentauri-ui/zentauri-components/ui/popover/animated";
import type {
  PopoverAlign,
  PopoverContentProps,
  PopoverSide,
} from "@zentauri-ui/zentauri-components/ui/popover";

export { PREVIEW_SECTION_CLASS as POPOVER_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const POPOVER_VARIANTS = [
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
  "blue",
  "cyan",
  "lime",
  "mint",
  "ocean",
  "sapphire",
  "lavender",
  "ruby",
  "red",
  "slate",
  "zinc",
  "stone",
  "royal",
  "electric",
  "forest",
  "sunset",
  "magenta",
  "crimson",
  "aqua",
  "plum",
] as const satisfies readonly NonNullable<PopoverContentProps["variant"]>[];

export const POPOVER_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<PopoverContentProps["size"]>[];

export const POPOVER_WIDTHS = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const satisfies readonly NonNullable<PopoverContentProps["width"]>[];

export const POPOVER_SIDES = [
  "top",
  "bottom",
  "left",
  "right",
] as const satisfies readonly PopoverSide[];

export const POPOVER_ALIGNS = [
  "start",
  "center",
  "end",
] as const satisfies readonly PopoverAlign[];

export const POPOVER_ANIMATIONS = [
  "fade",
  "scale",
  "none",
] as const satisfies readonly PopoverAnimation[];

export type PopoverVariant = (typeof POPOVER_VARIANTS)[number];
export type PopoverSize = (typeof POPOVER_SIZES)[number];
export type PopoverWidth = (typeof POPOVER_WIDTHS)[number];
export type PopoverSideValue = (typeof POPOVER_SIDES)[number];
export type PopoverAlignValue = (typeof POPOVER_ALIGNS)[number];
export type PopoverAnimationValue = (typeof POPOVER_ANIMATIONS)[number];
