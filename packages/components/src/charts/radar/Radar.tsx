"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  Tooltip,
} from "recharts";

import { ChartFrame } from "../shared/chart-frame";
import { getSeriesFill, resolveColor } from "../shared/colors";
import type { RadarChartProps } from "../shared/types";

export function RadarChart<
  TDatum extends Record<string, number | string | null | undefined>,
>({
  appearance,
  className,
  containerStyle,
  data,
  density,
  emptyState = null,
  height = 320,
  series,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  tooltipColor = "#0f172a",
  style,
  xKey,
  ...props
}: RadarChartProps<TDatum>) {
  const hasData = data.length > 0 && series.length > 0;

  return (
    <ChartFrame
      appearance={appearance}
      className={className}
      containerStyle={containerStyle}
      density={density}
      emptyState={emptyState}
      hasData={hasData}
      height={height}
      style={style}
      {...props}
    >
      <RechartsRadarChart data={data}>
        {showGrid ? <PolarGrid stroke="currentColor" opacity={0.18} /> : null}
        <PolarAngleAxis
          dataKey={String(xKey)}
          tick={{ fill: "currentColor", fontSize: 12 }}
        />
        <PolarRadiusAxis tick={{ fill: "currentColor", fontSize: 11 }} />
        {showTooltip ? (
          <Tooltip
            contentStyle={{ color: tooltipColor }}
            labelStyle={{ color: tooltipColor }}
            itemStyle={{ color: tooltipColor }}
          />
        ) : null}
        {showLegend ? <Legend /> : null}
        {series.map((item, index) => {
          const color = resolveColor(item.color, index);
          const fill = getSeriesFill(item, index, 0.24);
          return (
            <Radar
              key={item.dataKey}
              dataKey={item.dataKey}
              name={item.name}
              stroke={item.stroke ?? color.stroke}
              fill={fill ?? color.fill}
              fillOpacity={0.72}
            />
          );
        })}
      </RechartsRadarChart>
    </ChartFrame>
  );
}

RadarChart.displayName = "RadarChart";
