"use client";

import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";

import {
  ChartDecorators,
  ChartFrame,
  defaultChartMargin,
} from "../shared/chart-frame";
import { resolveColor } from "../shared/colors";
import type { BarChartProps } from "../shared/types";

export function BarChart<
  TDatum extends Record<string, number | string | null | undefined>,
>({
  appearance,
  className,
  containerStyle,
  data,
  density,
  emptyState = null,
  height = 320,
  margin = defaultChartMargin,
  series,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  tooltipColor = "#0f172a",
  stacked = false,
  style,
  syncId,
  xKey,
  ...props
}: BarChartProps<TDatum>) {
  const hasData = data.length > 0 && series.length > 0;
  const xAxisKey = String(xKey);

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
      <RechartsBarChart data={data} margin={margin} syncId={syncId}>
        <ChartDecorators
          axis={
            <>
              <XAxis
                dataKey={xAxisKey}
                minTickGap={24}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                width={40}
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                fontSize={12}
              />
            </>
          }
          showGrid={showGrid}
          showLegend={showLegend}
          showTooltip={showTooltip}
          tooltipColor={tooltipColor}
        />
        {series.map((item, index) => {
          const color = resolveColor(item.color, index);
          return (
            <Bar
              key={item.dataKey}
              dataKey={item.dataKey}
              name={item.name}
              stackId={stacked ? (item.stackId ?? "stack") : item.stackId}
              fill={item.fill ?? color.stroke}
              radius={[6, 6, 0, 0]}
              stroke={item.stroke ?? color.stroke}
            />
          );
        })}
      </RechartsBarChart>
    </ChartFrame>
  );
}

BarChart.displayName = "BarChart";
