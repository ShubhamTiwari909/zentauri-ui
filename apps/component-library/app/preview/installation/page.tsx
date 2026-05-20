import { SiteHeader } from "@/components/common/site-header";
import InstallationPreviewPage from "@/components/preview/installation";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("installation");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function InstallationPage() {
  return (
    <>
      <SiteHeader />
      <InstallationPreviewPage seo={seo} />
    </>
  );
}
