import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { StepperCodeExamplesSection } from "./sections/snippet-sections";
import { StepperExamplesSection } from "./sections/component-demo";
import { StepperHeroSection } from "./sections/hero";

export default function StepperPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <StepperHeroSection seo={seo} />
      <StepperExamplesSection />
      <StepperCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
