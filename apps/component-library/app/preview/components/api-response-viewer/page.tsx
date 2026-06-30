import ApiResponseViewerPreviewPage from "@/components/preview/api-response-viewer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("api-response-viewer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ApiResponseViewerPreviewRoutePage() {
  return <ApiResponseViewerPreviewPage seo={seo} />;
}
