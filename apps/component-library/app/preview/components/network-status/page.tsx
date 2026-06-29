import NetworkStatusPreviewPage from "@/components/preview/network-status";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("network-status");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function NetworkStatusPreviewRoutePage() {
  return <NetworkStatusPreviewPage seo={seo} />;
}
