import TimelinePreviewPage from "@/components/preview/timeline";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("timeline");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TimelinePreviewRoutePage() {
  return <TimelinePreviewPage seo={seo} />;
}
