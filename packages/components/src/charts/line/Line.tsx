"use client";

import { Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts";

import {
  ChartDecorators,
  ChartFrame,
  defaultChartMargin,
} from "../shared/chart-frame";
import { resolveColor } from "../shared/colors";
import type { LineChartProps } from "../shared/types";

export function LineChart<
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
  style,
  syncId,
  xKey,
  strokeDasharray,
  ...props
}: LineChartProps<TDatum>) {
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
      <RechartsLineChart data={data} margin={margin} syncId={syncId}>
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
            <Line
              key={item.dataKey}
              type="monotone"
              dataKey={item.dataKey}
              name={item.name}
              stroke={color.stroke}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              strokeDasharray={strokeDasharray ?? undefined}
            />
          );
        })}
      </RechartsLineChart>
    </ChartFrame>
  );
}

LineChart.displayName = "LineChart";
