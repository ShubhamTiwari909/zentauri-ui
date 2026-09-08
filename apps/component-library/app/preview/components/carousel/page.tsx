import CarouselPreviewPage from "@/components/preview/carousel";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("carousel");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CarouselPreviewRoutePage() {
  return <CarouselPreviewPage seo={seo} />;
}
