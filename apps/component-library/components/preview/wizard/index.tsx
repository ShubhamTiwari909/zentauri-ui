import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { WizardExamplesSection } from "./sections/component-demo";
import { WizardHeroSection } from "./sections/hero";

export default function WizardPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <WizardHeroSection seo={seo} />
      <WizardExamplesSection />
      <PreviewApiSection slug="wizard" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
