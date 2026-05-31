import MarqueePreviewPage from "@/components/preview/marquee";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("marquee");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PreviewMarqueePage() {
  return <MarqueePreviewPage seo={seo} />;
}
