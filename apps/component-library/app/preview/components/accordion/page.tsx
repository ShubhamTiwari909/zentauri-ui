import AccordionPreviewPage from "@/components/preview/accordion";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("accordion");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AccordionPreviewRoutePage() {
  return <PageWrapper><AccordionPreviewPage seo={seo} /></PageWrapper>;
}
