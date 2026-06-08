import type { ScrollAreaProps } from "@zentauri-ui/zentauri-components/ui/scroll-area";

export const SCROLL_AREA_APPEARANCES = [
  "default",
  "muted",
  "outline",
  "glass",
  "sky",
  "emerald",
  "rose",
  "amber",
  "violet",
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
] as const satisfies readonly NonNullable<ScrollAreaProps["appearance"]>[];

export const SCROLL_AREA_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<ScrollAreaProps["size"]>[];

export const SCROLL_AREA_ORIENTATIONS = [
  "vertical",
  "horizontal",
  "both",
] as const satisfies readonly NonNullable<ScrollAreaProps["orientation"]>[];

export const SCROLL_AREA_SCROLLBARS = [
  "auto",
  "hover",
  "always",
  "hidden",
] as const satisfies readonly NonNullable<ScrollAreaProps["scrollbar"]>[];
