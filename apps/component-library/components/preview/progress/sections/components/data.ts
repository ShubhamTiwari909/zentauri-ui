import type { ProgressProps } from "@zentauri-ui/zentauri-components/ui/progress";

export { PREVIEW_SECTION_CLASS as PROGRESS_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const PROGRESS_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "outline",
  "ghost",
  "glass",
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
] as const satisfies readonly NonNullable<ProgressProps["appearance"]>[];

export const PROGRESS_SIZES = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<ProgressProps["size"]>[];

export const PROGRESS_SHAPES = [
  "flat",
  "rounded",
  "pill",
] as const satisfies readonly NonNullable<ProgressProps["shape"]>[];

export const PROGRESS_SNIPPET_DEFAULTS = {
  appearance: "default" as const,
  size: "md" as const,
  shape: "rounded" as const,
  striped: false,
  animated: false,
};
