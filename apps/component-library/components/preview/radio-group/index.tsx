import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { RadioGroupCodeExamplesSection } from "./sections/radio-group-code-examples-section";
import { RadioGroupExamplesSection } from "./sections/radio-group-examples-section";
import { RadioGroupHeroSection } from "./sections/radio-group-hero-section";

export default function RadioGroupPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <RadioGroupHeroSection seo={seo} />
      <RadioGroupExamplesSection />
      <RadioGroupCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
