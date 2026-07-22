import PermissionPreviewPage from "@/components/preview/permission";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("permission");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PermissionPreviewRoutePage() {
  return <PermissionPreviewPage seo={seo} />;
}
