import InputsPreviewPage from "@/components/preview/inputs";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("inputs");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function InputsPreviewRoutePage() {
  return <InputsPreviewPage seo={seo} />;
}
