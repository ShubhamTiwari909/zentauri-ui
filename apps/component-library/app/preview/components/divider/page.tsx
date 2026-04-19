import DividerPreviewPage from "@/components/preview/divider";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("divider");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DividerPreviewRoutePage() {
  return <DividerPreviewPage seo={seo} />;
}
