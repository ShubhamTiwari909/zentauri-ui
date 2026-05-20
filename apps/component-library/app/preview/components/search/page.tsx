import SearchPreviewPage from "@/components/preview/search";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("search");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SearchPreviewRoutePage() {
  return <SearchPreviewPage seo={seo} />;
}
