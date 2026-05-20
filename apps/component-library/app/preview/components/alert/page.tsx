import AlertPreviewPage from "@/components/preview/alert";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("alert");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AlertPreviewRoutePage() {
  return <PageWrapper><AlertPreviewPage seo={seo} /></PageWrapper>;
}
