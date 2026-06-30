import JsonViewerPreviewPage from "@/components/preview/json-viewer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("json-viewer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function JsonViewerPreviewRoutePage() {
  return <JsonViewerPreviewPage seo={seo} />;
}
