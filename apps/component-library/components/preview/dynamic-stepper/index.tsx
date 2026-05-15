import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { DynamicStepperExamplesSection } from "./sections/dynamic-stepper-examples-section";
import { DynamicStepperHeroSection } from "./sections/dynamic-stepper-hero-section";

export default function DynamicStepperPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DynamicStepperHeroSection seo={seo} />
      <DynamicStepperExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
