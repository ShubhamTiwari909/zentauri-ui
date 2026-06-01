"use client";

import type { ReactElement } from "react";

import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";
import {
  AreaChart,
  chartVariants,
} from "@zentauri-ui/zentauri-components/charts/area";
import { BarChart } from "@zentauri-ui/zentauri-components/charts/bar";
import { BubbleChart } from "@zentauri-ui/zentauri-components/charts/bubble";
import { FunnelChart } from "@zentauri-ui/zentauri-components/charts/funnel";
import { LineChart } from "@zentauri-ui/zentauri-components/charts/line";
import { PieChart } from "@zentauri-ui/zentauri-components/charts/pie";
import { RadarChart } from "@zentauri-ui/zentauri-components/charts/radar";
import { ScatterChart } from "@zentauri-ui/zentauri-components/charts/scatter";
import { StackedBarChart } from "@zentauri-ui/zentauri-components/charts/stacked-bar";

import {
  chartBubbleData,
  chartBubbleSeries,
  chartFunnelData,
  chartPieData,
  chartRadarData,
  chartRadarSeries,
  chartScatterData,
  chartScatterSeries,
  chartTimeSeriesData,
  chartTimeSeriesSeries,
} from "./data";
import { Text } from "@zentauri-ui/zentauri-components/ui/typography";
import { VariantProps } from "class-variance-authority";

import { PieSectorShapeProps, Sector } from "recharts";

const COLORS = ["#1F6F5F", "#622B14", "#0D0B61", "#D92243"];
const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export type ChartBySlugProps = {
  slug: ChartPreviewSlug;
  appearance?: VariantProps<typeof chartVariants>["appearance"];
  density?: "compact" | "comfortable" | "spacious";
  strokeDasharray?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  stacked?: boolean;
  height?: number;
  className?: string;
  labelColor?: string;
  innerRadius?: number | string;
  outerRadius?: number | string;
  stroke?: string;
  fill?: string;
  customShape?: boolean;
  center?: boolean;
};

export function ChartBySlug({
  slug,
  appearance = "default",
  density = "comfortable",
  stroke,
  fill,
  strokeDasharray,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  stacked = false,
  height = 320,
  className,
  labelColor = "white",
  innerRadius,
  outerRadius = "100%",
  customShape,
  center,
}: ChartBySlugProps) {
  const wrap = (chart: ReactElement) => (
    <div className="w-full min-w-0" style={{ minHeight: height }}>
      <Text className="mb-5 text-slate-900 dark:text-white text-sm">
        Appearance: <span className="font-semibold">{appearance}</span> |
        Density: <span className="font-semibold">{density}</span> | Show Grid:{" "}
        <span className="font-semibold">{showGrid.toString()}</span> | Show
        Legend: <span className="font-semibold">{showLegend.toString()}</span> |
        Show Tooltip:{" "}
        <span className="font-semibold">{showTooltip.toString()}</span> |
        Stacked: <span className="font-semibold">{stacked.toString()}</span>{" "}
        {strokeDasharray ? `| Stroke Dasharray: ` : ""}
        {strokeDasharray ? (
          <span className="font-semibold">{strokeDasharray}</span>
        ) : null}
        {innerRadius ? `| Inner Radius: ` : ""}
        {innerRadius ? (
          <span className="font-semibold">{innerRadius}</span>
        ) : null}
        {outerRadius ? ` | Outer Radius: ` : ""}
        {outerRadius ? (
          <span className="font-semibold">{outerRadius}</span>
        ) : null}
        {stroke ? ` | Stroke: ` : ""}
        {stroke ? <span className="font-semibold">{stroke}</span> : null}
        {fill ? ` | Fill: ` : ""}
        {fill ? <span className="font-semibold">{fill}</span> : null}
        {labelColor ? ` | Label Color: ` : ""}
        {labelColor ? (
          <span className="font-semibold">{labelColor}</span>
        ) : null}
        {center ? ` | Center slot: ` : ""}
        {center ? <span className="font-semibold">enabled</span> : null}
      </Text>
      {chart}
    </div>
  );

  const frameProps = {
    appearance,
    density,
    showGrid,
    showLegend,
    showTooltip,
    height,
    className,
    strokeDasharray,
  };

  switch (slug) {
    case "line":
      return wrap(
        <LineChart
          {...frameProps}
          data={chartTimeSeriesData}
          xKey="month"
          series={[...chartTimeSeriesSeries({ appearance })]}
        />,
      );
    case "bar":
      return wrap(
        <BarChart
          {...frameProps}
          data={chartTimeSeriesData}
          xKey="month"
          series={[...chartTimeSeriesSeries({ appearance })]}
          stacked={stacked}
        />,
      );
    case "stacked-bar":
      return wrap(
        <StackedBarChart
          {...frameProps}
          data={chartTimeSeriesData}
          xKey="month"
          series={[...chartTimeSeriesSeries({ appearance })]}
        />,
      );
    case "area":
      return wrap(
        <AreaChart
          {...frameProps}
          data={chartTimeSeriesData}
          xKey="month"
          series={[...chartTimeSeriesSeries({ appearance })]}
          stacked={stacked}
        />,
      );
    case "radar":
      return wrap(
        <RadarChart
          {...frameProps}
          data={chartRadarData}
          xKey="axis"
          series={[...chartRadarSeries({ appearance })]}
        />,
      );
    case "scatter":
      return wrap(
        <ScatterChart
          {...frameProps}
          data={chartScatterData}
          xKey="traffic"
          series={[...chartScatterSeries({ appearance })]}
        />,
      );
    case "bubble":
      return wrap(
        <BubbleChart
          {...frameProps}
          data={chartBubbleData}
          xKey="x"
          series={[...chartBubbleSeries({ appearance })]}
        />,
      );
    case "funnel":
      return wrap(
        <FunnelChart
          {...frameProps}
          data={chartFunnelData}
          dataKey="value"
          nameKey="stage"
        />,
      );
    case "pie":
      return wrap(
        <PieChart
          {...frameProps}
          data={chartPieData}
          dataKey="value"
          nameKey="segment"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          label
          stroke={stroke}
          fill={fill}
          labelColor={labelColor}
          center={
            center ? (
              <div className="rounded-full bg-white/85 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-slate-200">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Total
                </div>
                <div className="text-2xl font-semibold">100%</div>
              </div>
            ) : null
          }
          shape={customShape ? MyCustomPie : undefined}
        />,
      );
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
