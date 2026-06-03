import AnimationsHubPage from "@/components/preview/animations/hub-page";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("animations");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AnimationsHubRoutePage() {
  return <AnimationsHubPage seo={seo} />;
}
