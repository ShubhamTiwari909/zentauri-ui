import DataTablePreviewPage from "@/components/preview/data-table";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("data-table");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DataTablePreviewRoutePage() {
  return <DataTablePreviewPage seo={seo} />;
}
