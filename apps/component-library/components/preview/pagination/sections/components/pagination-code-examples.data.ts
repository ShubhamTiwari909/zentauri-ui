import type { PaginationProps } from "@zentauri-ui/zentauri-components/ui";

export const PAGINATION_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const PAGINATION_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
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
] as const satisfies readonly NonNullable<PaginationProps["appearance"]>[];

export const PAGINATION_SIZES = [
  "sm",
  "md",
  "lg",
  "xl",
  "icon",
] as const satisfies readonly NonNullable<PaginationProps["size"]>[];
