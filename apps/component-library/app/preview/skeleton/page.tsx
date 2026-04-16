import SkeletonPreviewPage from "@/components/preview/skeleton";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("skeleton");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SkeletonPreviewRoutePage() {
  return <SkeletonPreviewPage seo={seo} />;
}
