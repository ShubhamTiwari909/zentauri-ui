import ChartsHubPage from "@/components/preview/charts/hub-page";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("charts");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ChartsHubRoutePage() {
  return <ChartsHubPage seo={seo} />;
}
