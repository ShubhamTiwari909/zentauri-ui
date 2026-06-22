import SplitButtonPreviewPage from "@/components/preview/split-button";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("split-button");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SplitButtonPreviewRoutePage() {
  return <SplitButtonPreviewPage seo={seo} />;
}
