import PaginationPreviewPage from "@/components/preview/pagination";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("pagination");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PaginationPreviewRoutePage() {
  return <PageWrapper><PaginationPreviewPage seo={seo} /></PageWrapper>;
}
