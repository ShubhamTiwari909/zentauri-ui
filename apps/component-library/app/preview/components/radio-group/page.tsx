import RadioGroupPreviewPage from "@/components/preview/radio-group";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("radio-group");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function RadioGroupPreviewRoutePage() {
  return <RadioGroupPreviewPage seo={seo} />;
}
