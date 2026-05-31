import CopyButtonPreviewPage from "@/components/preview/copy-button";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("copy-button");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CopyButtonPreviewRoutePage() {
  return <CopyButtonPreviewPage seo={seo} />;
}
