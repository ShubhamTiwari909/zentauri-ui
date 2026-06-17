import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { DynamicStepperExamplesSection } from "./sections/component-demo";
import { DynamicStepperHeroSection } from "./sections/hero";

export default function DynamicStepperPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DynamicStepperHeroSection seo={seo} />
      <DynamicStepperExamplesSection />
      <PreviewApiSection slug="dynamic-stepper" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
