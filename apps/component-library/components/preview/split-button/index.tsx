import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { SplitButtonExamplesSection } from "./sections/component-demo";
import { SplitButtonHeroSection } from "./sections/hero";
import { SplitButtonCodeExamplesSection } from "./sections/snippet-sections";

export default function SplitButtonPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SplitButtonHeroSection seo={seo} />
      <SplitButtonCodeExamplesSection />
      <SplitButtonExamplesSection />
      <PreviewApiSection slug="split-button" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
