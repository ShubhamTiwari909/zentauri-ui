import SpinnerPreviewPage from "@/components/preview/spinner";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("spinner");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SpinnerPreviewRoutePage() {
  return <PageWrapper><SpinnerPreviewPage seo={seo} /></PageWrapper>;
}
