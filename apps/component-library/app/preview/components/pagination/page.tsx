import PaginationPreviewPage from "@/components/preview/pagination";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("pagination");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PaginationPreviewRoutePage() {
  return <PaginationPreviewPage seo={seo} />;
}
