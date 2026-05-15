import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import type { chartPalette, chartVariants } from "./variants";

export type ChartType = "area" | "bar" | "bubble" | "line" | "pie";

export type ChartColor = keyof typeof chartPalette;

export type ChartDatum = Record<string, number | string | null | undefined>;

export type ChartMargin = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export type ChartSeries = {
  dataKey: string;
  name?: string;
  color?: ChartColor | string;
  textColor?: string;
  fill?: string;
  stroke?: string;
  stackId?: string;
  zKey?: string;
};

export type ChartSharedStatic = VariantProps<typeof chartVariants>;

export type BaseChartProps<TDatum extends ChartDatum = ChartDatum> =
  ChartSharedStatic &
    Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
      data: TDatum[];
      series: ChartSeries[];
      xKey: keyof TDatum & string;
      height?: number;
      showGrid?: boolean;
      showLegend?: boolean;
      showTooltip?: boolean;
      tooltipColor?: string;
      stacked?: boolean;
      syncId?: string;
      margin?: ChartMargin;
      emptyState?: ReactNode;
      containerStyle?: CSSProperties;
      strokeDasharray?: string;
    };

export type AreaChartProps<TDatum extends ChartDatum = ChartDatum> =
  BaseChartProps<TDatum>;

export type BarChartProps<TDatum extends ChartDatum = ChartDatum> =
  BaseChartProps<TDatum>;

export type LineChartProps<TDatum extends ChartDatum = ChartDatum> =
  BaseChartProps<TDatum>;

export type BubbleChartProps<TDatum extends ChartDatum = ChartDatum> =
  BaseChartProps<TDatum>;

export type PieChartProps<TDatum extends ChartDatum = ChartDatum> =
  ChartSharedStatic &
    Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
      data: TDatum[];
      dataKey: keyof TDatum & string;
      nameKey: keyof TDatum & string;
      height?: number;
      showLegend?: boolean;
      showTooltip?: boolean;
      tooltipColor?: string;
      emptyState?: ReactNode;
      containerStyle?: CSSProperties;
      paddingAngle?: number;
      cornerRadius?: number;
      label?: boolean;
      labelLine?: boolean;
      labelColor?: string;
      stroke?: string;
      fill?: string;
      innerRadius?: number | string;
      outerRadius?: number | string;
    };
