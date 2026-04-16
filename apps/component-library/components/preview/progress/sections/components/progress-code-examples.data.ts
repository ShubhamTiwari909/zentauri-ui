import type { ProgressProps } from "@zentauri-ui/zentauri-components/ui";

export const PROGRESS_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

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
