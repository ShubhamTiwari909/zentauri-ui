import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SlideToCompleteCodeExamplesSection } from "./sections/snippet-sections";
import { SlideToCompleteHeroSection } from "./sections/hero";

export default function SlideToCompletePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SlideToCompleteHeroSection seo={seo} />
      <SlideToCompleteCodeExamplesSection />
      <PreviewApiSection slug="slide-to-complete" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
