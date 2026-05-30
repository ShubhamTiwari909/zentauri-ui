import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ScrollAreaCodeExamplesSection } from "./sections/scroll-area-code-examples-section";
import { ScrollAreaExamplesSection } from "./sections/scroll-area-examples-section";
import { ScrollAreaHeroSection } from "./sections/scroll-area-hero-section";

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
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
