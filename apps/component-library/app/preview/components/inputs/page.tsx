import InputsPreviewPage from "@/components/preview/inputs";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("inputs");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function InputsPreviewRoutePage() {
  return <PageWrapper><InputsPreviewPage seo={seo} /></PageWrapper>;
}
