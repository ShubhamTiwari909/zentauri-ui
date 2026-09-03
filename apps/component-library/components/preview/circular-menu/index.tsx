import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CircularMenuCodeExamplesSection } from "./sections/snippet-sections";
import { CircularMenuHeroSection } from "./sections/hero";

export default function CircularMenuPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CircularMenuHeroSection seo={seo} />
      <CircularMenuCodeExamplesSection />
      <PreviewApiSection slug="circular-menu" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
