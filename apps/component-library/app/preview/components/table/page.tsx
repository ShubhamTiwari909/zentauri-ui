import TablePreviewPage from "@/components/preview/table";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("table");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TablePreviewRoutePage() {
  return <TablePreviewPage seo={seo} />;
}
