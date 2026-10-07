import ResizablePanelsPreviewPage from "@/components/preview/resizable-panels";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";
const seo = getPreviewSeo("resizable-panels");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function ResizablePanelsPreviewRoute() {
  return <ResizablePanelsPreviewPage seo={seo} />;
}
