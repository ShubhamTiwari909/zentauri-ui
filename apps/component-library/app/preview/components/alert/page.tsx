import AlertPreviewPage from "@/components/preview/alert";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("alert");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AlertPreviewRoutePage() {
  return <AlertPreviewPage seo={seo} />;
}
