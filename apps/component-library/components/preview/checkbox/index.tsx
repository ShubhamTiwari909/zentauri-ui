import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { CheckboxCodeExamplesSection } from "./sections/checkbox-code-examples-section";
import { CheckboxExamplesSection } from "./sections/checkbox-examples-section";
import { CheckboxHeroSection } from "./sections/checkbox-hero-section";

export default function CheckboxPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CheckboxHeroSection seo={seo} />
      <CheckboxExamplesSection />
      <CheckboxCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
