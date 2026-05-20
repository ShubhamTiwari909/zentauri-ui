import ModalPreviewPage from "@/components/preview/modal";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("modal");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ModalPreviewRoutePage() {
  return <PageWrapper><ModalPreviewPage seo={seo} /></PageWrapper>;
}
