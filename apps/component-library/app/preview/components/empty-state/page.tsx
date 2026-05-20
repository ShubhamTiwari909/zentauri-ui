import EmptyStatePreviewPage from "@/components/preview/empty-state";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("empty-state");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function EmptyStatePreviewRoutePage() {
  return <PageWrapper><EmptyStatePreviewPage seo={seo} /></PageWrapper>;
}
