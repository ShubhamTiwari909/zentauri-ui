import SlideToCompletePreviewPage from "@/components/preview/slide-to-complete";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("slide-to-complete");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SlideToCompletePreviewRoutePage() {
  return <SlideToCompletePreviewPage seo={seo} />;
}
