"use client";

import { Area, AreaChart as RechartsAreaChart, XAxis, YAxis } from "recharts";

import {
  ChartDecorators,
  ChartFrame,
  defaultChartMargin,
} from "../shared/chart-frame";
import { getSeriesFill, resolveColor } from "../shared/colors";
import type { AreaChartProps } from "../shared/types";

export function AreaChart<
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
}: AreaChartProps<TDatum>) {
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
      <RechartsAreaChart data={data} margin={margin} syncId={syncId}>
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
                fill="#ffffff"
                color="#ffffff"
              />
              <YAxis
                width={40}
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                fontSize={12}
                fill="#ffffff"
                color="#ffffff"
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
          const fill = getSeriesFill(item, index)
          return (
            <Area
              key={item.dataKey}
              type="monotone"
              dataKey={item.dataKey}
              name={item.name}
              stackId={stacked ? (item.stackId ?? "stack") : item.stackId}
              stroke={color.stroke}
              fill={fill}
              fillOpacity={1}
              strokeWidth={2}
            />
          );
        })}
      </RechartsAreaChart>
    </ChartFrame>
  );
}

AreaChart.displayName = "AreaChart";
