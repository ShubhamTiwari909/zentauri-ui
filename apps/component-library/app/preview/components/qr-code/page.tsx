import QrCodePreviewPage from "@/components/preview/qr-code";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("qr-code");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function QrCodePreviewRoutePage() {
  return <QrCodePreviewPage seo={seo} />;
}
