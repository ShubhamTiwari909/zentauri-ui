import HashGeneratorPreviewPage from "@/components/preview/hash-generator";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("hash-generator");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function HashGeneratorPreviewRoutePage() {
  return <HashGeneratorPreviewPage seo={seo} />;
}
