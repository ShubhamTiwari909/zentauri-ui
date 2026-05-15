"use client";

import type { ReactElement } from "react";

import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";
import {
  AreaChart,
  chartVariants,
} from "@zentauri-ui/zentauri-components/charts/area";
import { BarChart } from "@zentauri-ui/zentauri-components/charts/bar";
import { BubbleChart } from "@zentauri-ui/zentauri-components/charts/bubble";
import { LineChart } from "@zentauri-ui/zentauri-components/charts/line";
import { PieChart } from "@zentauri-ui/zentauri-components/charts/pie";

import {
  chartBubbleData,
  chartPieData,
  chartBubbleSeries,
  chartTimeSeriesData,
  chartTimeSeriesSeries,
} from "./chart-demo-data";
import { Text } from "@zentauri-ui/zentauri-components/ui/typography";
import { VariantProps } from "class-variance-authority";

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
}: ChartBySlugProps) {
  const wrap = (chart: ReactElement) => (
    <div className="w-full min-w-0" style={{ minHeight: height }}>
      <Text className="mb-5">
        Appearance: <span className="font-semibold">{appearance}</span> |
        Density: <span className="font-semibold">{density}</span> | Show Grid:{" "}
        <span className="font-semibold">{showGrid.toString()}</span> | Show
        Legend: <span className="font-semibold">{showLegend.toString()}</span> |
        Show Tooltip:{" "}
        <span className="font-semibold">{showTooltip.toString()}</span> |
        Stacked: <span className="font-semibold">{stacked.toString()}</span>{" "}
        {strokeDasharray ? `| Stroke Dasharray: ` : ""}{strokeDasharray ? <span className="font-semibold">{strokeDasharray}</span> : null}
        {innerRadius ? `| Inner Radius: ` : ""}{innerRadius ? <span className="font-semibold">{innerRadius}</span> : null}
        {outerRadius ? ` | Outer Radius: ` : ""}{outerRadius ? <span className="font-semibold">{outerRadius}</span> : null}
        {stroke ? ` | Stroke: ` : ""}{stroke ? <span className="font-semibold">{stroke}</span> : null}
        {fill ? ` | Fill: ` : ""}{fill ? <span className="font-semibold">{fill}</span> : null}
        {labelColor ? ` | Label Color: ` : ""}{labelColor ? <span className="font-semibold">{labelColor}</span> : null}
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
    case "bubble":
      return wrap(
        <BubbleChart
          {...frameProps}
          data={chartBubbleData}
          xKey="x"
          series={[...chartBubbleSeries({ appearance })]}
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
        />,
      );
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
