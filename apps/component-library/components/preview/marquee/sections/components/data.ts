import type { MarqueeProps } from "@zentauri-ui/zentauri-components/ui/marquee";

export { PREVIEW_SECTION_CLASS as MARQUEE_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const MARQUEE_APPEARANCES = [
  "default",
  "outline",
  "ghost",
  "card",
  "separated",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
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
  "green",
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
] as const satisfies readonly NonNullable<MarqueeProps["appearance"]>[];

export const MARQUEE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<MarqueeProps["size"]>[];

export const MARQUEE_ORIENTATIONS = [
  "horizontal",
  "vertical",
] as const satisfies readonly NonNullable<MarqueeProps["orientation"]>[];

export const MARQUEE_DIRECTIONS = [
  "left",
  "right",
  "up",
  "down",
] as const satisfies readonly NonNullable<MarqueeProps["direction"]>[];
