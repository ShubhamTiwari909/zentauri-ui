import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { LogViewerCodeExamplesSection } from "./sections/snippet-sections";
import { LogViewerHeroSection } from "./sections/hero";

export default function LogViewerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <LogViewerHeroSection seo={seo} />
      <LogViewerCodeExamplesSection />
      <PreviewApiSection slug="log-viewer" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
