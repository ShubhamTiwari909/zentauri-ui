import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ChartHeroDemo } from "../chart-hero-demo";

export function ChartHeroSection({
  seo,
  slug,
}: {
  seo: PreviewSeoDocument;
  slug: ChartPreviewSlug;
}) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />
      <ChartHeroDemo slug={slug} />
    </section>
  );
}
