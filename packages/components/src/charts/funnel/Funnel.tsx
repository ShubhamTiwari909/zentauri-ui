"use client";

import {
  Funnel,
  FunnelChart as RechartsFunnelChart,
  FunnelTrapezoidItem,
  LabelList,
  Legend,
  Tooltip,
  Trapezoid,
} from "recharts";

import { ChartFrame } from "../shared/chart-frame";
import { resolveColor } from "../shared/colors";
import type { FunnelChartProps } from "../shared/types";

export function FunnelChart<
  TDatum extends Record<string, number | string | null | undefined>,
>({
  appearance,
  className,
  colorKey = "color" as keyof TDatum & string,
  containerStyle,
  data,
  dataKey,
  density,
  emptyState = null,
  fill,
  height = 320,
  label = true,
  nameKey,
  showLegend = false,
  showTooltip = true,
  stroke = "#ffffff",
  style,
  tooltipColor = "#0f172a",
  ...props
}: FunnelChartProps<TDatum>) {
  const hasData = data.length > 0;
  const renderDefaultShape = (
    shapeProps: FunnelTrapezoidItem & { index?: number },
  ) => {
    const payload = shapeProps.payload as TDatum | undefined;
    const dataIndex =
      typeof shapeProps.index === "number" && shapeProps.index >= 0
        ? shapeProps.index
        : payload
          ? data.indexOf(payload)
          : -1;
    const datumColor = payload?.[colorKey];
    const color = resolveColor(
      typeof datumColor === "string"
        ? datumColor
        : typeof fill === "string"
          ? fill
          : undefined,
      dataIndex >= 0 ? dataIndex : 0,
    );

    return <Trapezoid {...shapeProps} fill={color.fill} stroke={stroke} />;
  };

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
      <RechartsFunnelChart>
        {showTooltip ? (
          <Tooltip
            contentStyle={{ color: tooltipColor }}
            labelStyle={{ color: tooltipColor }}
            itemStyle={{ color: tooltipColor }}
          />
        ) : null}
        {showLegend ? <Legend /> : null}
        <Funnel
          data={data}
          dataKey={String(dataKey)}
          nameKey={String(nameKey)}
          shape={renderDefaultShape}
        >
          {label ? (
            <LabelList
              dataKey={String(nameKey)}
              position="right"
              fill="currentColor"
              stroke="none"
              fontSize={12}
            />
          ) : null}
        </Funnel>
      </RechartsFunnelChart>
    </ChartFrame>
  );
}

FunnelChart.displayName = "FunnelChart";
