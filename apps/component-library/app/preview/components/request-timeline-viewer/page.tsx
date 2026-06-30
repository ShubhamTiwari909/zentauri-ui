import RequestTimelineViewerPreviewPage from "@/components/preview/request-timeline-viewer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("request-timeline-viewer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function RequestTimelineViewerPreviewRoutePage() {
  return <RequestTimelineViewerPreviewPage seo={seo} />;
}
