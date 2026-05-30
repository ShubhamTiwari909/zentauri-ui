import RatingPreviewPage from "@/components/preview/rating";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("rating");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function RatingPreviewRoutePage() {
  return <RatingPreviewPage seo={seo} />;
}
