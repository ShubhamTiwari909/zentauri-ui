import TypographyHubPage from "@/components/preview/typography/typography-hub-page";
import { getPreviewSeo } from "@/lib/preview-seo-registry";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";

const seo = getPreviewSeo("typography");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TypographyHubRoutePage() {
  return <TypographyHubPage seo={seo} />;
}
