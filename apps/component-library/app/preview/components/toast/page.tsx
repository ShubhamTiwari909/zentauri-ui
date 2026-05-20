import ToastPreviewPage from "@/components/preview/toast";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("toast");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ToastPreviewRoutePage() {
  return <PageWrapper><ToastPreviewPage seo={seo} /></PageWrapper>;
}
