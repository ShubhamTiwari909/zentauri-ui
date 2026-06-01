import type { SkeletonProps } from "@zentauri-ui/zentauri-components/ui/skeleton";

export { PREVIEW_SECTION_CLASS as SKELETON_CODE_EXAMPLES_SECTION_CLASS } from "@/components/common/Section";

export const SKELETON_APPEARANCES = [
  "default",
  "subtle",
  "muted",
  "sky",
  "rose",
  "purple",
  "pink",
  "orange",
  "yellow",
  "teal",
  "indigo",
  "emerald",
  "gray",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<SkeletonProps["appearance"]>[];

export const SKELETON_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<SkeletonProps["size"]>[];

export const SKELETON_ROUNDED = [
  "none",
  "sm",
  "md",
  "lg",
  "full",
] as const satisfies readonly NonNullable<SkeletonProps["rounded"]>[];
