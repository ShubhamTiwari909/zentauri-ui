import type { TooltipAnimation } from "@zentauri-ui/zentauri-components/ui/tooltip/animated";
import type {
  TooltipContentProps,
  TooltipPosition,
} from "@zentauri-ui/zentauri-components/ui/tooltip";

export const TOOLTIP_CODE_EXAMPLES_SECTION_CLASS =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export const TOOLTIP_TRIGGER_CLASS =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50";

export const CONTENT_VARIANTS = [
  "default",
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
  "green",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly NonNullable<TooltipContentProps["variant"]>[];

export const CONTENT_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<TooltipContentProps["size"]>[];

export const CONTENT_WIDTHS = [
  "fit",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const satisfies readonly NonNullable<TooltipContentProps["width"]>[];

export const TOOLTIP_POSITIONS = [
  "top",
  "bottom",
  "left",
  "right",
] as const satisfies readonly TooltipPosition[];

export const CONTENT_ANIMATIONS = [
  "fade",
  "scale",
  "none",
] as const satisfies readonly TooltipAnimation[];

export type ContentVariant = (typeof CONTENT_VARIANTS)[number];
export type ContentSize = (typeof CONTENT_SIZES)[number];
export type ContentWidth = (typeof CONTENT_WIDTHS)[number];
export type TooltipPlacement = (typeof TOOLTIP_POSITIONS)[number];
export type ContentAnimation = (typeof CONTENT_ANIMATIONS)[number];
