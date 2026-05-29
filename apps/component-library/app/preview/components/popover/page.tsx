import PopoverPreviewPage from "@/components/preview/popover";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("popover");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PopoverPreviewRoutePage() {
  return <PopoverPreviewPage seo={seo} />;
}
