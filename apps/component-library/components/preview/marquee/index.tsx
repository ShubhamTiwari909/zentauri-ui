import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { MarqueeCodeExamplesSection } from "./sections/marquee-code-examples-section";
import { MarqueeExamplesSection } from "./sections/marquee-examples-section";
import { MarqueeHeroSection } from "./sections/marquee-hero-section";

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
