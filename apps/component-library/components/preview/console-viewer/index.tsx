import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ConsoleViewerCodeExamplesSection } from "./sections/snippet-sections";
import { ConsoleViewerHeroSection } from "./sections/hero";

export default function ConsoleViewerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ConsoleViewerHeroSection seo={seo} />
      <ConsoleViewerCodeExamplesSection />
      <PreviewApiSection slug="console-viewer" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
