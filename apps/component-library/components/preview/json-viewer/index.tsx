import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { JsonViewerCodeExamplesSection } from "./sections/snippet-sections";
import { JsonViewerHeroSection } from "./sections/hero";

export default function JsonViewerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <JsonViewerHeroSection seo={seo} />
      <JsonViewerCodeExamplesSection />
      <PreviewApiSection slug="json-viewer" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
