import PackageInstallCommandPreviewPage from "@/components/preview/package-install-command";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("package-install-command");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PackageInstallCommandPreviewRoutePage() {
  return <PackageInstallCommandPreviewPage seo={seo} />;
}
