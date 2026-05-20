import ChartPreviewPage from "@/components/preview/charts/chart-preview-page";
import {
  CHART_PREVIEW_SLUGS,
  getChartSectionSeo,
  isChartPreviewSlug,
  type ChartPreviewSlug,
} from "@/lib/charts-preview-registry";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { notFound } from "next/navigation";
import PageWrapper from "@/components/common/PageWrapper";

export function generateStaticParams(): { slug: ChartPreviewSlug }[] {
  return CHART_PREVIEW_SLUGS.map((slug) => ({ slug }));
}

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;
  if (!isChartPreviewSlug(slug)) {
    return {};
  }
  return previewSeoDocumentToMetadata(getChartSectionSeo(slug));
}

export default async function ChartSectionRoutePage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  if (!isChartPreviewSlug(slug)) {
    notFound();
  }
  const seo = getChartSectionSeo(slug);
  return <PageWrapper><ChartPreviewPage seo={seo} slug={slug} /></PageWrapper>;
}
