import ToastPreviewPage from "@/components/preview/toast";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("toast");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ToastPreviewRoutePage() {
  return <ToastPreviewPage seo={seo} />;
}
