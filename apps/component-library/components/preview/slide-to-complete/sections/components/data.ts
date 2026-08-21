import type { SlideToCompleteProps } from "@zentauri-ui/zentauri-components/ui/slide-to-complete";

export const SLIDE_TO_COMPLETE_APPEARANCES = [
  "default",
  "primary",
  "secondary",
  "success",
  "destructive",
  "warning",
  "info",
  "blue",
  "violet",
  "emerald",
  "amber",
  "rose",
  "slate",
  "zinc",
  "gradient-blue",
  "gradient-emerald",
  "gradient-rose",
  "glass",
] as const satisfies readonly NonNullable<SlideToCompleteProps["appearance"]>[];

export const SLIDE_TO_COMPLETE_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SlideToCompleteProps["size"]>[];

export const SLIDE_TO_COMPLETE_THRESHOLDS = [
  "0.5",
  "0.75",
  "0.9",
  "1",
] as const;
