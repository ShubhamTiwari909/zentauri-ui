import HooksHubPage from "@/components/preview/hooks/hooks-hub-page";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("hooks");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function HooksHubRoutePage() {
  return <HooksHubPage seo={seo} />;
}
