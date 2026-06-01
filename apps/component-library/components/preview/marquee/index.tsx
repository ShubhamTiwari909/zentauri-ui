import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { MarqueeCodeExamplesSection } from "./sections/snippet-sections";
import { MarqueeExamplesSection } from "./sections/component-demo";
import { MarqueeHeroSection } from "./sections/hero";

export default function MarqueePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <MarqueeHeroSection seo={seo} />
      <MarqueeExamplesSection />
      <MarqueeCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
