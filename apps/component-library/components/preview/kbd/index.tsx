import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { KbdCodeExamplesSection } from "./sections/snippet-sections";
import { KbdExamplesSection } from "./sections/component-demo";
import { KbdHeroSection } from "./sections/hero";

export default function KbdPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <KbdHeroSection seo={seo} />
      <KbdExamplesSection />
      <KbdCodeExamplesSection />
      <PreviewApiSection slug="kbd" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
