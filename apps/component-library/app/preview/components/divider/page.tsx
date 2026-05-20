import DividerPreviewPage from "@/components/preview/divider";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("divider");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DividerPreviewRoutePage() {
  return <PageWrapper><DividerPreviewPage seo={seo} /></PageWrapper>;
}
