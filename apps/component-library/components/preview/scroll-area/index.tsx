import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ScrollAreaCodeExamplesSection } from "./sections/snippet-sections";
import { ScrollAreaExamplesSection } from "./sections/component-demo";
import { ScrollAreaHeroSection } from "./sections/hero";

export default function ScrollAreaPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ScrollAreaHeroSection seo={seo} />
      <ScrollAreaExamplesSection />
      <ScrollAreaCodeExamplesSection />
      <PreviewApiSection slug="scroll-area" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
