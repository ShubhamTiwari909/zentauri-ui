"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";

import { useResizeObserver } from "../../hooks/useResizeObserver/useResizeObserver";
import { cn } from "../../lib/utils";
import { chartVariants } from "./variants";
import { VariantProps } from "class-variance-authority";

/** Chart-level props that may be forwarded from *Chart `...rest` and must not reach a DOM node. */
const CHART_ONLY_DIV_PROP_KEYS = new Set([
  "data",
  "margin",
  "series",
  "showGrid",
  "showLegend",
  "showTooltip",
  "stacked",
  "strokeDasharray",
  "syncId",
  "tooltipColor",
  "xKey",
]);

function filterDivProps(
  props: HTMLAttributes<HTMLDivElement>,
): HTMLAttributes<HTMLDivElement> {
  const entries = Object.entries(props).filter(
    ([key]) => !CHART_ONLY_DIV_PROP_KEYS.has(key),
  );
  return Object.fromEntries(entries) as HTMLAttributes<HTMLDivElement>;
}

type ChartFrameProps = HTMLAttributes<HTMLDivElement> & {
  appearance?: VariantProps<typeof chartVariants>["appearance"];
  containerStyle?: CSSProperties;
  density?: "compact" | "comfortable" | "spacious" | null;
  emptyState?: ReactNode;
  hasData: boolean;
  height: number;
  overlay?: ReactNode;
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
  overlay,
  style,
  ...props
}: ChartFrameProps) {
  const divProps = filterDivProps(props);
  const [measureRef, size] = useResizeObserver<HTMLDivElement>();
  const chartStyle = {
    "--chart-height": `${height}px`,
    ...style,
  } as CSSProperties;
  const canRenderChart = (size?.width ?? 0) > 0 && (size?.height ?? 0) > 0;

  if (!hasData) {
    return (
      <div
        className={cn(chartVariants({ appearance, density }), className)}
        style={chartStyle}
        {...divProps}
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
      {...divProps}
    >
      <div ref={measureRef} className="h-full min-h-0 w-full min-w-0">
        {canRenderChart ? (
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            debounce={80}
            style={containerStyle}
          >
            {children}
          </ResponsiveContainer>
        ) : null}
      </div>
      {overlay}
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
