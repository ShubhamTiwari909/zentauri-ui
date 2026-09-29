import FieldPreviewPage from "@/components/preview/field";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("field");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function FieldPreviewRoutePage() {
  return <FieldPreviewPage seo={seo} />;
}
