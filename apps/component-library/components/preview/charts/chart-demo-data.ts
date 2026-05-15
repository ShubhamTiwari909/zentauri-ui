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

export const chartPieData = pieChartDataJson;
