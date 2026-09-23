import GaugePreviewPage from "@/components/preview/gauge";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("gauge");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function GaugePreviewRoutePage() {
  return <GaugePreviewPage seo={seo} />;
}
