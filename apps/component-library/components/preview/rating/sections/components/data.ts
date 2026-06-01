import type { RatingProps } from "@zentauri-ui/zentauri-components/ui/rating";

export const RATING_APPEARANCES = [
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
] as const satisfies readonly NonNullable<RatingProps["appearance"]>[];

export const RATING_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<RatingProps["size"]>[];

export const RATING_ICONS = [
  "star",
  "heart",
  "flame",
  "thumb",
] as const satisfies readonly NonNullable<RatingProps["icon"]>[];
