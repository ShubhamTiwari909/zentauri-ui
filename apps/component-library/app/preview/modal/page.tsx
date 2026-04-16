import ModalPreviewPage from "@/components/preview/modal";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("modal");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ModalPreviewRoutePage() {
  return <ModalPreviewPage seo={seo} />;
}
