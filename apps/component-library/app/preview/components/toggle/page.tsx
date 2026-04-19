import TogglePreviewPage from "@/components/preview/toggle";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("toggle");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TogglePreviewRoutePage() {
  return <TogglePreviewPage seo={seo} />;
}
