import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { CheckboxCodeExamplesSection } from "./sections/snippet-sections";
import { CheckboxExamplesSection } from "./sections/component-demo";
import { CheckboxHeroSection } from "./sections/hero";

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
      <PreviewApiSection slug="checkbox" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
