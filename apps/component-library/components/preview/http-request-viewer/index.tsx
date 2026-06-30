import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { HttpRequestViewerCodeExamplesSection } from "./sections/snippet-sections";
import { HttpRequestViewerHeroSection } from "./sections/hero";

export default function HttpRequestViewerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <HttpRequestViewerHeroSection seo={seo} />
      <HttpRequestViewerCodeExamplesSection />
      <PreviewApiSection slug="http-request-viewer" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
