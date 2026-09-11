import SortableListPreviewPage from "@/components/preview/sortable-list";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("sortable-list");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SortableListPreviewRoutePage() {
  return <SortableListPreviewPage seo={seo} />;
}
