import SliderPreviewPage from "@/components/preview/slider";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("slider");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SliderPreviewRoutePage() {
  return <PageWrapper><SliderPreviewPage seo={seo} /></PageWrapper>;
}
