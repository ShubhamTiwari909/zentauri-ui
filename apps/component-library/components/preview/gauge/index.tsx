import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { GaugeHeroSection } from "./sections/hero";
import { GaugeCodeExamplesSection } from "./sections/snippet-sections";

export default function GaugePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <GaugeHeroSection seo={seo} />
      <GaugeCodeExamplesSection />
      <PreviewApiSection slug="gauge" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
