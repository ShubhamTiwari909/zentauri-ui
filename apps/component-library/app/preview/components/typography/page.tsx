import TypographyHubPage from "@/components/preview/typography/hub-page";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("typography");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TypographyComponentPreviewRoutePage() {
  return <TypographyHubPage seo={seo} />;
}
