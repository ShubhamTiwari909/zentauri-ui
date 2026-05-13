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
  colors?: string[];
  innerRadius?: number | string;
  outerRadius?: number | string;
};

export function ChartBySlug({
  slug,
  appearance = "default",
  density = "comfortable",
  strokeDasharray,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  stacked = false,
  height = 320,
  className,
  colors,
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
        {strokeDasharray ? `| Stroke Dasharray: ${strokeDasharray}` : ""}
        {innerRadius ? `| Inner Radius: ${innerRadius}` : ""}
        {outerRadius ? ` | Outer Radius: ${outerRadius}` : ""}
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
          colors={colors}
        />,
      );
    default: {
      const _exhaustive: never = slug;
      return _exhaustive;
    }
  }
}
