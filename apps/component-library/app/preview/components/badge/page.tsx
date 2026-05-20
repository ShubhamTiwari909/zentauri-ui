import BadgePreviewPage from "@/components/preview/badge";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("badge");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function BadgePreviewRoutePage() {
  return <PageWrapper><BadgePreviewPage seo={seo} /></PageWrapper>;
}
