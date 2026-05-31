import AnimatedNumberPreviewPage from "@/components/preview/animated-number";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("animated-number");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AnimatedNumberPreviewRoutePage() {
  return <AnimatedNumberPreviewPage seo={seo} />;
}
