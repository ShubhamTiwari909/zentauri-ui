import GridPreviewPage from "@/components/preview/grid";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";
const seo = getPreviewSeo("grid");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function GridPreviewRoutePage() {
  return <GridPreviewPage seo={seo} />;
}
