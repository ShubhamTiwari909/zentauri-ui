import ToolbarPreviewPage from "@/components/preview/toolbar";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";
const seo = getPreviewSeo("toolbar");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function ToolbarPreviewRoute() {
  return <ToolbarPreviewPage seo={seo} />;
}
