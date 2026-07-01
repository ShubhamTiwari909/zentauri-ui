import ConsoleViewerPreviewPage from "@/components/preview/console-viewer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("console-viewer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ConsoleViewerPreviewRoutePage() {
  return <ConsoleViewerPreviewPage seo={seo} />;
}
