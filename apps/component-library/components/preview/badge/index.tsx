import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { BadgeCodeExamplesSection } from "./sections/badge-code-examples-section";
import { BadgeExamplesSection } from "./sections/badge-examples-section";
import { BadgeHeroSection } from "./sections/badge-hero-section";

export default function BadgePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <BadgeHeroSection seo={seo} />
      <BadgeExamplesSection />
      <BadgeCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
