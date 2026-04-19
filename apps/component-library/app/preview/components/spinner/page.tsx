import SpinnerPreviewPage from "@/components/preview/spinner";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("spinner");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SpinnerPreviewRoutePage() {
  return <SpinnerPreviewPage seo={seo} />;
}
