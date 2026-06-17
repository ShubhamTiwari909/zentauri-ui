import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { RatingCodeExamplesSection } from "./sections/snippet-sections";
import { RatingExamplesSection } from "./sections/component-demo";
import { RatingHeroSection } from "./sections/hero";

export default function RatingPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <RatingHeroSection seo={seo} />
      <RatingExamplesSection />
      <RatingCodeExamplesSection />
      <PreviewApiSection slug="rating" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
