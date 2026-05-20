import IntroductionPage from "@/components/introduction";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("index");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PreviewIndexPage() {
  return <IntroductionPage seo={seo} />;
}
