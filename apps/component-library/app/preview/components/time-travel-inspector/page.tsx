import TimeTravelInspectorPreviewPage from "@/components/preview/time-travel-inspector";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";
const seo = getPreviewSeo("time-travel-inspector");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function TimeTravelInspectorPreviewRoutePage() {
  return <TimeTravelInspectorPreviewPage seo={seo} />;
}
