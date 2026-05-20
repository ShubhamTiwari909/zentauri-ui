import AvatarPreviewPage from "@/components/preview/avatar";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("avatar");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AvatarPreviewRoutePage() {
  return <PageWrapper><AvatarPreviewPage seo={seo} /></PageWrapper>;
}
