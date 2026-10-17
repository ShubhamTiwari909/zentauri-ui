import ScrollExpandPreviewPage from "@/components/preview/scroll-expand";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("scroll-expand");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function ScrollExpandPreviewRoutePage() {
  return <ScrollExpandPreviewPage seo={seo} />;
}
