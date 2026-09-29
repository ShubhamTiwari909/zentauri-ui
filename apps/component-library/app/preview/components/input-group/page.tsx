import InputGroupPreviewPage from "@/components/preview/input-group";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("input-group");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function InputGroupPreviewRoutePage() {
  return <InputGroupPreviewPage seo={seo} />;
}
