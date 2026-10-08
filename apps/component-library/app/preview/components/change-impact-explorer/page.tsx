import ChangeImpactExplorerPreviewPage from "@/components/preview/change-impact-explorer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";
const seo = getPreviewSeo("change-impact-explorer");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function ChangeImpactExplorerPreviewRoute() {
  return <ChangeImpactExplorerPreviewPage seo={seo} />;
}
