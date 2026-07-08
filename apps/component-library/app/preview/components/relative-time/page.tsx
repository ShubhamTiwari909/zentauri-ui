import RelativeTimePreviewPage from "@/components/preview/relative-time";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("relative-time");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function RelativeTimePreviewRoutePage() {
  return <RelativeTimePreviewPage seo={seo} />;
}
