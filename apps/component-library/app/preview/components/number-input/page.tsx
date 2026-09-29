import NumberInputPreviewPage from "@/components/preview/number-input";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("number-input");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function NumberInputPreviewRoutePage() {
  return <NumberInputPreviewPage seo={seo} />;
}
