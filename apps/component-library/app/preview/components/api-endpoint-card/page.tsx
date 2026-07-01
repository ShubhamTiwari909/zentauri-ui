import ApiEndpointCardPreviewPage from "@/components/preview/api-endpoint-card";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("api-endpoint-card");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ApiEndpointCardPreviewRoutePage() {
  return <ApiEndpointCardPreviewPage seo={seo} />;
}
