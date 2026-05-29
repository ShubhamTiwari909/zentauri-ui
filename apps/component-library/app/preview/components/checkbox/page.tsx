import CheckboxPreviewPage from "@/components/preview/checkbox";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("checkbox");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CheckboxPreviewRoutePage() {
  return <CheckboxPreviewPage seo={seo} />;
}
