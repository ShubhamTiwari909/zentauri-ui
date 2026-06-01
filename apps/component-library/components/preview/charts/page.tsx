import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { ChartPreviewSlug } from "@/lib/charts-preview-registry";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ChartCodeExamplesSection } from "./sections/snippet-sections";
import { ChartExamplesSection } from "./sections/component-demo";
import { ChartHeroSection } from "./sections/hero";

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
