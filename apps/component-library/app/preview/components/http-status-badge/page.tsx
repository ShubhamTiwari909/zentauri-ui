import HttpStatusBadgePreviewPage from "@/components/preview/http-status-badge";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("http-status-badge");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function HttpStatusBadgePreviewRoutePage() {
  return <HttpStatusBadgePreviewPage seo={seo} />;
}
