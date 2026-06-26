import QrScannerPreviewPage from "@/components/preview/qr-scanner";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("qr-scanner");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function QrScannerPreviewRoutePage() {
  return <QrScannerPreviewPage seo={seo} />;
}
