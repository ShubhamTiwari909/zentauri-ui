import ImageComparePreviewPage from "@/components/preview/image-compare";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("image-compare");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ImageComparePreviewRoutePage() {
  return <ImageComparePreviewPage seo={seo} />;
}
