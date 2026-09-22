import type { GaugeProps } from "@zentauri-ui/zentauri-components/ui/gauge";

export const GAUGE_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "success",
  "warning",
  "info",
  "blue",
  "cyan",
  "emerald",
  "violet",
  "rose",
  "amber",
  "slate",
  "gradient-blue",
  "gradient-emerald",
  "gradient-rose",
  "glass",
] as const satisfies readonly NonNullable<GaugeProps["appearance"]>[];

export const GAUGE_SIZES = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<GaugeProps["size"]>[];

export const GAUGE_THICKNESSES = [
  "thin",
  "medium",
  "thick",
] as const satisfies readonly NonNullable<GaugeProps["thickness"]>[];

export const GAUGE_VARIANTS = [
  "radial",
  "dial",
] as const satisfies readonly NonNullable<GaugeProps["variant"]>[];
