import CircularMenuPreviewPage from "@/components/preview/circular-menu";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("circular-menu");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CircularMenuPreviewRoutePage() {
  return <CircularMenuPreviewPage seo={seo} />;
}
