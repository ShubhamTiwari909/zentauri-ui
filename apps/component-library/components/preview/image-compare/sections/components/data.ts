import type { ImageCompareProps } from "@zentauri-ui/zentauri-components/ui/image-compare";

export const IMAGE_COMPARE_APPEARANCES = [
  "default",
  "blue",
  "cyan",
  "green",
  "emerald",
  "teal",
  "sky",
  "indigo",
  "purple",
  "pink",
  "rose",
  "red",
  "orange",
  "yellow",
  "slate",
  "zinc",
  "gradient-blue",
  "gradient-sunset",
] as const satisfies readonly NonNullable<ImageCompareProps["appearance"]>[];

export const IMAGE_COMPARE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<ImageCompareProps["size"]>[];

export const IMAGE_COMPARE_RADII = [
  "none",
  "sm",
  "md",
  "lg",
  "full",
] as const satisfies readonly NonNullable<ImageCompareProps["radius"]>[];
