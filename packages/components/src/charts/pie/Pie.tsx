"use client";

import {
  Legend,
  Pie,
  PieLabelRenderProps,
  PieSectorShapeProps,
  PieChart as RechartsPieChart,
  Sector,
  Tooltip,
} from "recharts";

import { ChartFrame } from "../shared/chart-frame";
import type { ChartColor, PieChartProps } from "../shared/types";
import { chartPalette } from "../area";

// #endregion
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomPie = (props: PieSectorShapeProps & { colors: string[] }) => {
  return <Sector {...props} fill={props.colors[props.index % props.colors.length]} />;
};

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
  nameKey,
  paddingAngle = 2,
  showLegend = true,
  showTooltip = true,
  tooltipColor = "#0f172a",
  stroke,
  colors = DEFAULT_COLORS,
  innerRadius,
  outerRadius,
  style,
  ...props
}: PieChartProps<TDatum>) {
  const hasData = data.length > 0;
  console.log(appearance, chartPalette[appearance as ChartColor]?.fill)

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
          label={renderCustomizedLabel}
          stroke={stroke}
          fill={chartPalette[appearance as ChartColor]?.fill}
          shape={(props: PieSectorShapeProps) => <CustomPie {...props} colors={colors} />}
        />
      </RechartsPieChart>
    </ChartFrame>
  );
}

PieChart.displayName = "PieChart";
