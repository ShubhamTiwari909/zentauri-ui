import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { BentoGridCodeExamplesSection } from "./sections/snippet-sections";
import { BentoGridHeroSection } from "./sections/hero";

export default function BentoGridPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <BentoGridHeroSection seo={seo} />
      <BentoGridCodeExamplesSection />
      <PreviewApiSection slug="bento-grid" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
