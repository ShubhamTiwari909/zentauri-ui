"use client";

import { BarChart } from "../bar/Bar";
import type { StackedBarChartProps } from "../shared/types";

export function StackedBarChart<
  TDatum extends Record<string, number | string | null | undefined>,
>(props: StackedBarChartProps<TDatum>) {
  return <BarChart {...props} stacked />;
}

StackedBarChart.displayName = "StackedBarChart";
