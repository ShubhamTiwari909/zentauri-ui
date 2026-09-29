import TagsInputPreviewPage from "@/components/preview/tags-input";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("tags-input");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function TagsInputPreviewRoutePage() {
  return <TagsInputPreviewPage seo={seo} />;
}
