import type { SkeletonProps } from "@zentauri-ui/zentauri-components/ui";

export const SKELETON_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

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
