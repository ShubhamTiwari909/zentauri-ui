import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ChartCodeExamplesSection } from "./sections/chart-code-examples-section";
import { ChartExamplesSection } from "./sections/chart-examples-section";
import { ChartHeroSection } from "./sections/chart-hero-section";

export default function ChartPreviewPage({
  seo,
  slug,
}: {
  seo: PreviewSeoDocument;
  slug: ChartPreviewSlug;
}) {
  return (
    <PreviewPageShell>
      <ChartHeroSection seo={seo} slug={slug} />
      <ChartExamplesSection slug={slug} />
      <ChartCodeExamplesSection slug={slug} />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
