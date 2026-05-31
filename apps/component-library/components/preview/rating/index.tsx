import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { RatingCodeExamplesSection } from "./sections/rating-code-examples-section";
import { RatingExamplesSection } from "./sections/rating-examples-section";
import { RatingHeroSection } from "./sections/rating-hero-section";

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
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
