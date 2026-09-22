import type { GaugeProps } from "@zentauri-ui/zentauri-components/ui/gauge";

export type GaugeAppearance = NonNullable<GaugeProps["appearance"]>;
export type GaugeSize = NonNullable<GaugeProps["size"]>;
export type GaugeThickness = NonNullable<GaugeProps["thickness"]>;
export type GaugeVariant = NonNullable<GaugeProps["variant"]>;

export type GaugeDemoProps = {
  appearance: GaugeAppearance;
  size: GaugeSize;
  thickness: GaugeThickness;
  variant: GaugeVariant;
  value: number;
};
