import CardPreviewPage from "@/components/preview/card";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("card");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CardPreviewRoutePage() {
  return <PageWrapper><CardPreviewPage seo={seo} /></PageWrapper>;
}
