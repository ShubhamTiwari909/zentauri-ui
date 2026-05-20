import ButtonsPreviewPage from "@/components/preview/buttons";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("buttons");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ButtonsPreviewRoutePage() {
  return <PageWrapper><ButtonsPreviewPage seo={seo} /></PageWrapper>;
}
