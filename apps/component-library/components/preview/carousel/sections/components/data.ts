import type { CarouselProps } from "@zentauri-ui/zentauri-components/ui/carousel";

export const CAROUSEL_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
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
  "royal",
  "electric",
  "forest",
  "sunset",
  "magenta",
  "crimson",
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
] as const satisfies readonly NonNullable<CarouselProps["appearance"]>[];

export const CAROUSEL_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<CarouselProps["size"]>[];

export const CAROUSEL_ORIENTATIONS = [
  "horizontal",
  "vertical",
] as const satisfies readonly NonNullable<CarouselProps["orientation"]>[];

export const CAROUSEL_FRAMES = [
  "none",
  "bordered",
  "card",
  "glass",
] as const satisfies readonly NonNullable<CarouselProps["frame"]>[];

export const CAROUSEL_ARROWS = ["inside", "outside", "off"] as const;

export const CAROUSEL_ANIMATIONS = [
  "none",
  "glide",
  "smooth",
  "snappy",
  "bouncy",
] as const;

export const CAROUSEL_REVEALS = ["none", "fade", "scale", "blur"] as const;

export const CAROUSEL_SLIDES_PER_VIEW = ["1", "2", "3"] as const;

export const CAROUSEL_SLIDE_COUNTS = ["3", "4", "5", "6"] as const;
