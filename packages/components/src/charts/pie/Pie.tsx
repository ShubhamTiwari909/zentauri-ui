"use client";

import {
  Legend,
  Pie,
  PieLabelRenderProps,
  PieChart as RechartsPieChart,
  Tooltip,
} from "recharts";

import { ChartFrame } from "../shared/chart-frame";
import type { PieChartProps } from "../shared/types";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, fill }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill={fill} textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

export function PieChart<
  TDatum extends Record<string, number | string | null | undefined>,
>({
  appearance,
  className,
  containerStyle,
  cornerRadius = 10,
  data,
  dataKey,
  density,
  emptyState = null,
  height = 320,
  label = false,
  labelLine = false,
  labelColor = "white",
  nameKey,
  paddingAngle = 2,
  showLegend = true,
  showTooltip = true,
  tooltipColor = "#0f172a",
  stroke = "#000000",
  fill = "#0d3b66",
  innerRadius,
  outerRadius,
  style,
  ...props
}: PieChartProps<TDatum>) {
  const hasData = data.length > 0;

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
      <RechartsPieChart>
        {showTooltip ? (
          <Tooltip
            contentStyle={{ color: tooltipColor }}
            labelStyle={{ color: tooltipColor }}
            itemStyle={{ color: tooltipColor }}
          />
        ) : null}
        {showLegend ? <Legend color="currentColor" /> : null}
        <Pie
          data={data}
          dataKey={String(dataKey)}
          nameKey={String(nameKey)}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={paddingAngle}
          cornerRadius={cornerRadius}
          labelLine={labelLine}
          label={label ? (props: PieLabelRenderProps) => renderCustomizedLabel({...props, fill: labelColor}) : undefined}
          stroke={stroke}
          fill={fill}
        />
      </RechartsPieChart>
    </ChartFrame>
  );
}

PieChart.displayName = "PieChart";
