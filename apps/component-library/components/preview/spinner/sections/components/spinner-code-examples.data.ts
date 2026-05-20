import type { SpinnerProps } from "@zentauri-ui/zentauri-components/ui/spinner/animated";

export { PREVIEW_SECTION_CLASS as SPINNER_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const SPINNER_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "ghost",
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
] as const satisfies readonly NonNullable<SpinnerProps["appearance"]>[];

export const SPINNER_VARIANTS = [
  "ring",
  "dots",
  "pulse",
  "bars",
] as const satisfies readonly NonNullable<SpinnerProps["variant"]>[];

export const SPINNER_SIZES = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<SpinnerProps["size"]>[];
