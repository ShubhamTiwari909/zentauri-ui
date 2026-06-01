import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ChartHeroDemo } from "../hero-demo";

export function ChartHeroSection({
  seo,
  slug,
}: {
  seo: PreviewSeoDocument;
  slug: ChartPreviewSlug;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <ChartHeroDemo slug={slug} />
    </Section>
  );
}
