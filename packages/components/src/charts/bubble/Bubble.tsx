"use client";

import {
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  Bar,
} from "recharts";

import {
  ChartDecorators,
  ChartFrame,
  defaultChartMargin,
} from "../shared/chart-frame";
import { resolveColor } from "../shared/colors";
import type { BubbleChartProps } from "../shared/types";

export function BubbleChart<
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
}: BubbleChartProps<TDatum>) {
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
      <RechartsScatterChart data={data} margin={margin} syncId={syncId}>
        <ChartDecorators
          axis={
            <>
              <XAxis
                dataKey={xAxisKey}
                type={
                  typeof data[0]?.[xAxisKey] === "number"
                    ? "number"
                    : "category"
                }
                minTickGap={24}
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                dataKey="__chartY"
                type={
                  typeof data[0]?.[xAxisKey] === "number"
                    ? "number"
                    : "category"
                }
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
                __chartZ: item.zKey ? entry[item.zKey] : undefined,
              }))}
              name={item.name}
              fill={item.fill ?? color.stroke}
            />
          );
        })}
        <ZAxis dataKey="__chartZ" range={[64, 720]} />
      </RechartsScatterChart>
    </ChartFrame>
  );
}

BubbleChart.displayName = "BubbleChart";
