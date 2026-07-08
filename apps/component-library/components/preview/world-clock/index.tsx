import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { WorldClockCodeExamplesSection } from "./sections/snippet-sections";
import { WorldClockHeroSection } from "./sections/hero";

export default function WorldClockPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <WorldClockHeroSection seo={seo} />
      <WorldClockCodeExamplesSection />
      <PreviewApiSection slug="world-clock" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
