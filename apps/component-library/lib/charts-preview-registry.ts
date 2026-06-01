import type { PreviewSeoDocument } from "@/lib/preview-seo";

import area from "@/content/seo/preview/charts/area.json";
import bar from "@/content/seo/preview/charts/bar.json";
import bubble from "@/content/seo/preview/charts/bubble.json";
import funnel from "@/content/seo/preview/charts/funnel.json";
import line from "@/content/seo/preview/charts/line.json";
import pie from "@/content/seo/preview/charts/pie.json";
import radar from "@/content/seo/preview/charts/radar.json";
import scatter from "@/content/seo/preview/charts/scatter.json";
import stackedBar from "@/content/seo/preview/charts/stacked-bar.json";

export const CHART_PREVIEW_SLUGS = [
  "line",
  "bar",
  "stacked-bar",
  "area",
  "radar",
  "scatter",
  "bubble",
  "funnel",
  "pie",
] as const;

export type ChartPreviewSlug = (typeof CHART_PREVIEW_SLUGS)[number];

export const chartPreviewLabels: Record<ChartPreviewSlug, string> = {
  line: "Line",
  bar: "Bar",
  "stacked-bar": "Stacked Bar",
  area: "Area",
  radar: "Radar",
  scatter: "Scatter",
  bubble: "Bubble",
  funnel: "Funnel",
  pie: "Pie",
};

const chartSectionSeoRecord: Record<ChartPreviewSlug, PreviewSeoDocument> = {
  line: line as PreviewSeoDocument,
  bar: bar as PreviewSeoDocument,
  "stacked-bar": stackedBar as PreviewSeoDocument,
  area: area as PreviewSeoDocument,
  radar: radar as PreviewSeoDocument,
  scatter: scatter as PreviewSeoDocument,
  bubble: bubble as PreviewSeoDocument,
  funnel: funnel as PreviewSeoDocument,
  pie: pie as PreviewSeoDocument,
};

export function getChartSectionSeo(slug: ChartPreviewSlug): PreviewSeoDocument {
  return chartSectionSeoRecord[slug];
}

export function isChartPreviewSlug(value: string): value is ChartPreviewSlug {
  return (CHART_PREVIEW_SLUGS as readonly string[]).includes(value);
}
