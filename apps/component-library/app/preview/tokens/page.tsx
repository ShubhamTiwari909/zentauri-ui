import { SiteHeader } from "@/components/common/site-header";
import TokenReferencePage from "@/components/preview/tokens";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("tokens");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TokensPage() {
  return (
    <>
      <SiteHeader />
      <TokenReferencePage seo={seo} />
    </>
  );
}
