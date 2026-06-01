import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { RadioGroupCodeExamplesSection } from "./sections/snippet-sections";
import { RadioGroupExamplesSection } from "./sections/component-demo";
import { RadioGroupHeroSection } from "./sections/hero";

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
