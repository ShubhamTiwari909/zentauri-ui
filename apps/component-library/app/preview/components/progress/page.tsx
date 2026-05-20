import ProgressPreviewPage from "@/components/preview/progress";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("progress");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ProgressPreviewRoutePage() {
  return <ProgressPreviewPage seo={seo} />;
}
