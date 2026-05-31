import KbdPreviewPage from "@/components/preview/kbd";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("kbd");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function KbdPreviewRoutePage() {
  return <KbdPreviewPage seo={seo} />;
}
