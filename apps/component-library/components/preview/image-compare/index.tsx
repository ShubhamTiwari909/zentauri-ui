import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ImageCompareHeroSection } from "./sections/hero";
import { ImageCompareCodeExamplesSection } from "./sections/snippet-sections";

export default function ImageComparePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ImageCompareHeroSection seo={seo} />
      <ImageCompareCodeExamplesSection />
      <PreviewApiSection slug="image-compare" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
