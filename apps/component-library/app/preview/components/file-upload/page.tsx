import FileUploadPreviewPage from "@/components/preview/file-upload";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("file-upload");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function FileUploadPreviewRoutePage() {
  return <FileUploadPreviewPage seo={seo} />;
}
