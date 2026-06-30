import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { RequestTimelineViewerCodeExamplesSection } from "./sections/snippet-sections";
import { RequestTimelineViewerHeroSection } from "./sections/hero";

export default function RequestTimelineViewerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <RequestTimelineViewerHeroSection seo={seo} />
      <RequestTimelineViewerCodeExamplesSection />
      <PreviewApiSection slug="request-timeline-viewer" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
