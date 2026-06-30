import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ApiResponseViewerCodeExamplesSection } from "./sections/snippet-sections";
import { ApiResponseViewerHeroSection } from "./sections/hero";

export default function ApiResponseViewerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ApiResponseViewerHeroSection seo={seo} />
      <ApiResponseViewerCodeExamplesSection />
      <PreviewApiSection slug="api-response-viewer" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
