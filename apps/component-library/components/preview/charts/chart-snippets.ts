import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";

import { CHART_APPEARANCES } from "./sections/components/chart-code-examples.data";

const IMPORT: Record<ChartPreviewSlug, string> = {
  line: `import { LineChart } from "@zentauri-ui/zentauri-components/charts/line";`,
  bar: `import { BarChart } from "@zentauri-ui/zentauri-components/charts/bar";`,
  area: `import { AreaChart } from "@zentauri-ui/zentauri-components/charts/area";`,
  bubble: `import { BubbleChart } from "@zentauri-ui/zentauri-components/charts/bubble";`,
};

const TAG: Record<ChartPreviewSlug, string> = {
  line: "LineChart",
  bar: "BarChart",
  area: "AreaChart",
  bubble: "BubbleChart",
};

const DATA_AND_SERIES = `const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const series = ({ appearance }: { appearance: VariantProps<typeof chartVariants>["appearance"] }) => {
  return [
    { dataKey: "desktop", name: "Desktop", color: appearance?.includes("gradient") ? "white" : "cyan" },
    { dataKey: "mobile", name: "Mobile", color: appearance?.includes("gradient") ? "white" : "emerald" },
  ]
};
`;

const BUBBLE_DATA_AND_SERIES = `const bubbleData = [
  { x: 120, bench: 240, benchZ: 420 },
  { x: 180, bench: 380, benchZ: 300 },
  { x: 260, bench: 290, benchZ: 520 },
  { x: 340, bench: 450, benchZ: 210 },
  { x: 410, bench: 320, benchZ: 610 },
];

const bubbleSeries = ({ appearance }: { appearance: VariantProps<typeof chartVariants>["appearance"] }) => {
  return [
    { dataKey: "bench", name: "Benchmark", color: appearance?.includes("gradient") ? "white" : "violet", zKey: "benchZ" },
  ]
};
`;

function snippetPrefix(slug: ChartPreviewSlug): string {
  if (slug === "bubble") {
    return `${IMPORT[slug]}\n\n${BUBBLE_DATA_AND_SERIES}\n`;
  }
  return `${IMPORT[slug]}\n\n${DATA_AND_SERIES}\n`;
}

function cartesianDataProps(): string {
  return `  data={data}
  xKey="month"
  series={series}
`;
}

function bubbleDataProps(): string {
  return `  data={bubbleData}
  xKey="x"
  series={bubbleSeries}
`;
}

export function chartOutlineCompactLegendSnippet(
  slug: ChartPreviewSlug,
): string {
  const props = slug === "bubble" ? bubbleDataProps() : cartesianDataProps();
  return `${variantLeadComment("appearance · outline, density · compact, showLegend")}${snippetPrefix(slug)}<${TAG[slug]}
  appearance="outline"
  density="compact"
${props}  height={300}
  showLegend
/>`;
}

export function chartMutedSpaciousSnippet(slug: ChartPreviewSlug): string {
  const stackedAttr =
    slug === "bar" || slug === "area" ? "\n  stacked" : "";
  const detail =
    slug === "bar" || slug === "area"
      ? "appearance · muted, density · spacious, showGrid · false, stacked"
      : "appearance · muted, density · spacious, showGrid · false";
  const props = slug === "bubble" ? bubbleDataProps() : cartesianDataProps();
  return `${variantLeadComment(detail)}${snippetPrefix(slug)}<${TAG[slug]}
  appearance="muted"
  density="spacious"
${props}  height={300}
  showGrid={false}${stackedAttr}
/>`;
}

export function chartMutedSpaciousDashedSnippet(
  slug: ChartPreviewSlug,
): string {
  const stackedAttr =
    slug === "bar" || slug === "area" ? "\n  stacked" : "";
  const detail =
    slug === "bar" || slug === "area"
      ? "appearance · muted, density · spacious, showGrid · false, stacked, strokeDasharray · 5,5"
      : "appearance · muted, density · spacious, showGrid · false, strokeDasharray · 5,5";
  const props = slug === "bubble" ? bubbleDataProps() : cartesianDataProps();
  return `${variantLeadComment(detail)}${snippetPrefix(slug)}<${TAG[slug]}
  appearance="muted"
  density="spacious"
${props}  height={300}
  showGrid={false}${stackedAttr}
  strokeDasharray="5,5"
/>`;
}

export function chartAppearanceSnippet(
  slug: ChartPreviewSlug,
  appearance: (typeof CHART_APPEARANCES)[number],
  strokeDasharray?: string,
  showGrid?: boolean,
): string {
  const props = slug === "bubble" ? bubbleDataProps() : cartesianDataProps();
  const appearanceLine =
    appearance === "default" ? "" : `  appearance="${appearance}"\n`;
  return `${variantLeadComment(`appearance · ${appearance}`)}${snippetPrefix(slug)}<${TAG[slug]}
${appearanceLine}${props}  height={280}
  ${strokeDasharray ? `strokeDasharray="${strokeDasharray}"` : ""}
  showGrid={${showGrid ? "true" : "false"}}
/>`;
}
