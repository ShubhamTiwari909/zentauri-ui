import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SliderCodeExamplesSection } from "./sections/slider-code-examples-section";
import { SliderExamplesSection } from "./sections/slider-examples-section";
import { SliderHeroSection } from "./sections/slider-hero-section";

export default function SliderPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SliderHeroSection seo={seo} />
      <SliderExamplesSection />
      <SliderCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
