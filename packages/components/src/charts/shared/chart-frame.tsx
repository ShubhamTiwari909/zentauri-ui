import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";

import { cn } from "../../lib/utils";
import { chartVariants } from "./variants";
import { VariantProps } from "class-variance-authority";

type ChartFrameProps = HTMLAttributes<HTMLDivElement> & {
  appearance?: VariantProps<typeof chartVariants>["appearance"];
  containerStyle?: CSSProperties;
  density?: "compact" | "comfortable" | "spacious" | null;
  emptyState?: ReactNode;
  hasData: boolean;
  height: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  style?: CSSProperties;
  children: ReactNode;
};

export const defaultChartMargin = { top: 16, right: 16, bottom: 8, left: 0 };

export function ChartFrame({
  appearance,
  children,
  className,
  containerStyle,
  density,
  emptyState = null,
  hasData,
  height,
  style,
  ...props
}: ChartFrameProps) {
  const chartStyle = {
    "--chart-height": `${height}px`,
    ...style,
  } as CSSProperties;

  if (!hasData) {
    return (
      <div
        className={cn(chartVariants({ appearance, density }), className)}
        style={chartStyle}
        {...props}
      >
        <div className="flex h-full min-h-48 items-center justify-center text-sm text-slate-500">
          {emptyState}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(chartVariants({ appearance, density }), className)}
      style={chartStyle}
      {...props}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
        debounce={80}
        style={containerStyle}
      >
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function ChartDecorators({
  axis,
  showGrid,
  showLegend,
  showTooltip,
  tooltipColor = "#0f172a",
}: {
  axis: ReactNode;
  showGrid: boolean;
  showLegend: boolean;
  showTooltip: boolean;
  tooltipColor?: string;
}) {
  return (
    <>
      {showGrid ? (
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          opacity={0.16}
        />
      ) : null}
      {axis}
      {showTooltip ? (
        <Tooltip
          cursor={{ opacity: 0.12 }}
          contentStyle={{ color: tooltipColor }}
          labelStyle={{ color: tooltipColor }}
          itemStyle={{ color: tooltipColor }}
        />
      ) : null}
      {showLegend ? <Legend /> : null}
    </>
  );
}
