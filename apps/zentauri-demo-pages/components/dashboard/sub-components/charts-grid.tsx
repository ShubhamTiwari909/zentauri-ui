"use client";

import { AreaChart } from "@zentauri-ui/zentauri-components/charts/area";
import {
  PieChart,
  chartPalette,
} from "@zentauri-ui/zentauri-components/charts/pie";
import { RadarChart } from "@zentauri-ui/zentauri-components/charts/radar";
import { StackedBarChart } from "@zentauri-ui/zentauri-components/charts/stacked-bar";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { useDashboard } from "./dashboard-context";
import { useDashboardTheme } from "@/components/dashboard/theme/theme-context";
import { sliceSeries } from "@/components/dashboard/lib/date-range";
import {
  categoryPerformance,
  channelSeries,
  revenueSeries,
  trafficSplit,
} from "@/components/dashboard/lib/mock-data";

const SECONDARY = ["violet", "amber", "emerald", "rose", "cyan"] as const;

function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card appearance="glass" className="p-5">
      <CardHeader>
        <CardTitle as="h3" className="text-base font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-xs opacity-70">
          {description}
        </CardDescription>
      </CardHeader>
      <CardBody className="mt-3">{children}</CardBody>
    </Card>
  );
}

export function ChartsGrid() {
  const { dateRange } = useDashboard();
  const { accentChart, chartAppearance } = useDashboardTheme();

  const appearance = chartAppearance as never;

  const revenue = sliceSeries(revenueSeries, dateRange);
  const channels = sliceSeries(channelSeries, dateRange);

  const palette = chartPalette as Record<string, { fill: string }>;
  const pieData = trafficSplit.map((slice, index) => {
    const key = SECONDARY[index % SECONDARY.length];
    return {
      ...slice,
      color: key,
      fill: palette[key]?.fill ?? "#cbd5e1",
    };
  });

  return (
    <section
      aria-label="Charts"
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
    >
      <ChartCard
        title="Revenue vs Expenses"
        description="Monthly performance ($K)"
      >
        <AreaChart
          appearance={appearance}
          data={revenue}
          xKey="month"
          height={280}
          showGrid
          showLegend
          showTooltip
          series={[
            { dataKey: "revenue", name: "Revenue", color: accentChart },
            { dataKey: "expenses", name: "Expenses", color: "slate" },
          ]}
        />
      </ChartCard>

      <ChartCard
        title="Acquisition Channels"
        description="Sessions by channel, per quarter"
      >
        <StackedBarChart
          appearance={appearance}
          data={channels}
          xKey="channel"
          height={280}
          showGrid
          showLegend
          showTooltip
          series={[
            { dataKey: "organic", name: "Organic", color: accentChart },
            { dataKey: "paid", name: "Paid", color: "violet" },
            { dataKey: "referral", name: "Referral", color: "amber" },
          ]}
        />
      </ChartCard>

      <ChartCard title="Traffic Sources" description="Share of total visitors">
        <PieChart
          appearance={appearance}
          data={pieData}
          dataKey="visitors"
          nameKey="source"
          colorKey="color"
          height={280}
          showLegend
          showTooltip
          label
          innerRadius={60}
          outerRadius={100}
        />
      </ChartCard>

      <ChartCard
        title="Category Performance"
        description="Score vs benchmark by product line"
      >
        <RadarChart
          appearance={appearance}
          data={categoryPerformance}
          xKey="category"
          height={280}
          showGrid
          showLegend
          showTooltip
          series={[
            { dataKey: "score", name: "Score", color: accentChart },
            { dataKey: "benchmark", name: "Benchmark", color: "white" },
          ]}
        />
      </ChartCard>
    </section>
  );
}
