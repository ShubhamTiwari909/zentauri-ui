import type { PreviewSeoDocument } from "@/lib/preview-seo";

import area from "@/content/seo/preview/charts/area.json";
import bar from "@/content/seo/preview/charts/bar.json";
import bubble from "@/content/seo/preview/charts/bubble.json";
import line from "@/content/seo/preview/charts/line.json";
import pie from "@/content/seo/preview/charts/pie.json";

export const CHART_PREVIEW_SLUGS = [
  "line",
  "bar",
  "area",
  "bubble",
  "pie",
] as const;

export type ChartPreviewSlug = (typeof CHART_PREVIEW_SLUGS)[number];

export const chartPreviewLabels: Record<ChartPreviewSlug, string> = {
  line: "Line",
  bar: "Bar",
  area: "Area",
  bubble: "Bubble",
  pie: "Pie",
};

const chartSectionSeoRecord: Record<ChartPreviewSlug, PreviewSeoDocument> = {
  line: line as PreviewSeoDocument,
  bar: bar as PreviewSeoDocument,
  area: area as PreviewSeoDocument,
  bubble: bubble as PreviewSeoDocument,
  pie: pie as PreviewSeoDocument,
};

export function getChartSectionSeo(slug: ChartPreviewSlug): PreviewSeoDocument {
  return chartSectionSeoRecord[slug];
}

export function isChartPreviewSlug(value: string): value is ChartPreviewSlug {
  return (CHART_PREVIEW_SLUGS as readonly string[]).includes(value);
}
