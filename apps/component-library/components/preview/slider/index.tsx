import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SliderCodeExamplesSection } from "./sections/snippet-sections";
import { SliderExamplesSection } from "./sections/component-demo";
import { SliderHeroSection } from "./sections/hero";

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
