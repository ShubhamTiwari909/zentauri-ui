import DropdownPreviewPage from "@/components/preview/dropdown";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("dropdown");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DropdownPreviewRoutePage() {
  return <PageWrapper><DropdownPreviewPage seo={seo} /></PageWrapper>;
}
