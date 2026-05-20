import AvatarPreviewPage from "@/components/preview/avatar";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("avatar");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AvatarPreviewRoutePage() {
  return <AvatarPreviewPage seo={seo} />;
}
