import ComboboxPreviewPage from "@/components/preview/combobox";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("combobox");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ComboboxPreviewRoutePage() {
  return <ComboboxPreviewPage seo={seo} />;
}
