import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { KbdCodeExamplesSection } from "./sections/kbd-code-examples-section";
import { KbdExamplesSection } from "./sections/kbd-examples-section";
import { KbdHeroSection } from "./sections/kbd-hero-section";

export default function KbdPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <KbdHeroSection seo={seo} />
      <KbdExamplesSection />
      <KbdCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
