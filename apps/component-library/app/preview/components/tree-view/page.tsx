import TreeViewPreviewPage from "@/components/preview/tree-view";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("tree-view");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TreeViewPreviewRoutePage() {
  return <TreeViewPreviewPage seo={seo} />;
}
