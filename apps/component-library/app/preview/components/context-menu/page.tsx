import ContextMenuPreviewPage from "@/components/preview/context-menu";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("context-menu");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ContextMenuPreviewRoutePage() {
  return <ContextMenuPreviewPage seo={seo} />;
}
