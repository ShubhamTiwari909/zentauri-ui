import FileUploadPreviewPage from "@/components/preview/file-upload";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("file-upload");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function FileUploadPreviewRoutePage() {
  return <PageWrapper><FileUploadPreviewPage seo={seo} /></PageWrapper>;
}
