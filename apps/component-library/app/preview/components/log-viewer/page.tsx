import LogViewerPreviewPage from "@/components/preview/log-viewer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("log-viewer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function LogViewerPreviewRoutePage() {
  return <LogViewerPreviewPage seo={seo} />;
}
