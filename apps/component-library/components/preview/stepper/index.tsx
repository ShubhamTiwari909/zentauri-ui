import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { StepperCodeExamplesSection } from "./sections/stepper-code-examples-section";
import { StepperExamplesSection } from "./sections/stepper-examples-section";
import { StepperHeroSection } from "./sections/stepper-hero-section";

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
