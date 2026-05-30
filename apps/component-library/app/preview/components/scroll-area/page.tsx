import ScrollAreaPreviewPage from "@/components/preview/scroll-area";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("scroll-area");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ScrollAreaPreviewRoutePage() {
  return <ScrollAreaPreviewPage seo={seo} />;
}
