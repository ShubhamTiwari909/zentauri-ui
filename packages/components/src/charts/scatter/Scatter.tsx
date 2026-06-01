"use client";

import {
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartDecorators,
  ChartFrame,
  defaultChartMargin,
} from "../shared/chart-frame";
import { resolveColor } from "../shared/colors";
import type { ScatterChartProps } from "../shared/types";

export function ScatterChart<
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
  ...props
}: ScatterChartProps<TDatum>) {
  const hasData = data.length > 0 && series.length > 0;
  const xAxisKey = String(xKey);
  const isNumericX = typeof data[0]?.[xAxisKey] === "number";

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
      <RechartsScatterChart data={data} margin={margin} syncId={syncId}>
        <ChartDecorators
          axis={
            <>
              <XAxis
                dataKey={xAxisKey}
                type={isNumericX ? "number" : "category"}
                minTickGap={24}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                dataKey="__chartY"
                type="number"
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
            <Scatter
              key={item.dataKey}
              data={data.map((entry) => ({
                ...entry,
                __chartY: entry[item.dataKey],
              }))}
              name={item.name}
              fill={item.fill ?? color.stroke}
              line={item.stroke ? { stroke: item.stroke } : false}
            />
          );
        })}
      </RechartsScatterChart>
    </ChartFrame>
  );
}

ScatterChart.displayName = "ScatterChart";
