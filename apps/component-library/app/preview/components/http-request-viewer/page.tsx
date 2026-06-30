import HttpRequestViewerPreviewPage from "@/components/preview/http-request-viewer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("http-request-viewer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function HttpRequestViewerPreviewRoutePage() {
  return <HttpRequestViewerPreviewPage seo={seo} />;
}
