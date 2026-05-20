import TooltipPreviewPage from "@/components/preview/tooltip";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("tooltip");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TooltipPreviewRoutePage() {
  return <TooltipPreviewPage seo={seo} />;
}
