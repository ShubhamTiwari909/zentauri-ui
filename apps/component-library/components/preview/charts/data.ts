import { VariantProps } from "class-variance-authority";
import { chartVariants } from "@zentauri-ui/zentauri-components/charts/area";
import pieChartDataJson from "@/content/preview/charts/pie.json";

export const chartTimeSeriesData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

export const chartTimeSeriesSeries = ({
  appearance,
}: {
  appearance: VariantProps<typeof chartVariants>["appearance"];
}) => {
  return [
    {
      dataKey: "desktop",
      name: "Desktop",
      color: appearance?.includes("gradient") ? "white" : "cyan",
      stroke: "black",
    },
    {
      dataKey: "mobile",
      name: "Mobile",
      color: appearance?.includes("gradient") ? "white" : "emerald",
      stroke: "black",
    },
  ];
};

export const chartBubbleData = [
  { x: 120, bench: 240, benchZ: 420 },
  { x: 180, bench: 380, benchZ: 300 },
  { x: 260, bench: 290, benchZ: 520 },
  { x: 340, bench: 450, benchZ: 210 },
  { x: 410, bench: 320, benchZ: 610 },
];

export const chartBubbleSeries = ({
  appearance,
}: {
  appearance: VariantProps<typeof chartVariants>["appearance"];
}) => {
  return [
    {
      dataKey: "bench",
      name: "Benchmark",
      zKey: "benchZ",
      fill: appearance?.includes("gradient") ? "white" : "violet",
    },
  ];
};

export const chartRadarData = [
  { axis: "Reliability", current: 88, target: 92 },
  { axis: "Speed", current: 74, target: 86 },
  { axis: "Adoption", current: 69, target: 80 },
  { axis: "Quality", current: 82, target: 90 },
  { axis: "Support", current: 76, target: 84 },
  { axis: "Cost", current: 64, target: 72 },
];

export const chartRadarSeries = ({
  appearance,
}: {
  appearance: VariantProps<typeof chartVariants>["appearance"];
}) => {
  return [
    {
      dataKey: "current",
      name: "Current",
      color: appearance?.includes("gradient") ? "white" : "cyan",
    },
    {
      dataKey: "target",
      name: "Target",
      color: appearance?.includes("gradient") ? "white" : "violet",
    },
  ];
};

export const chartScatterData = [
  { traffic: 18, conversion: 2.6, qualified: 21 },
  { traffic: 26, conversion: 3.8, qualified: 28 },
  { traffic: 34, conversion: 4.1, qualified: 35 },
  { traffic: 42, conversion: 5.2, qualified: 41 },
  { traffic: 55, conversion: 5.8, qualified: 49 },
  { traffic: 63, conversion: 7.1, qualified: 58 },
];

export const chartScatterSeries = ({
  appearance,
}: {
  appearance: VariantProps<typeof chartVariants>["appearance"];
}) => {
  return [
    {
      dataKey: "conversion",
      name: "Conversion rate",
      color: appearance?.includes("gradient") ? "white" : "emerald",
    },
    {
      dataKey: "qualified",
      name: "Qualified leads",
      color: appearance?.includes("gradient") ? "white" : "amber",
    },
  ];
};

export const chartFunnelData = [
  { stage: "Visitors", value: 12000, color: "#0891b2" },
  { stage: "Trials", value: 7200, color: "#059669" },
  { stage: "Activated", value: 3900, color: "#7c3aed" },
  { stage: "Paid", value: 1850, color: "#d97706" },
];

export const chartPieData = pieChartDataJson;
