import GlassCardPreviewPage from "@/components/preview/glass-card";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("glass-card");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function GlassCardPreviewRoutePage() {
  return <GlassCardPreviewPage seo={seo} />;
}
