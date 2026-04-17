import SliderPreviewPage from "@/components/preview/slider";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("slider");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SliderPreviewRoutePage() {
  return <SliderPreviewPage seo={seo} />;
}
