import BentoGridPreviewPage from "@/components/preview/bento-grid";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("bento-grid");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function BentoGridPreviewRoutePage() {
  return <BentoGridPreviewPage seo={seo} />;
}
