import SelectPreviewPage from "@/components/preview/select";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("select");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SelectPreviewRoutePage() {
  return <SelectPreviewPage seo={seo} />;
}
