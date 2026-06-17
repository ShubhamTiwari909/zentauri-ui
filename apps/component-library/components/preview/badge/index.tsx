import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { BadgeCodeExamplesSection } from "./sections/snippet-sections";
import { BadgeHeroSection } from "./sections/hero";

export default function BadgePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <BadgeHeroSection seo={seo} />
      <BadgeCodeExamplesSection />
      <PreviewApiSection slug="badge" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
