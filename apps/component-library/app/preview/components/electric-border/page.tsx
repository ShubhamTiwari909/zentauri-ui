import ElectricBorderPreviewPage from "@/components/preview/electric-border";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("electric-border");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function ElectricBorderPreviewRoutePage() {
  return <ElectricBorderPreviewPage seo={seo} />;
}
