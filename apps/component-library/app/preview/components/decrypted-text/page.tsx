import DecryptedTextPreviewPage from "@/components/preview/decrypted-text";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("decrypted-text");
export const metadata = previewSeoDocumentToMetadata(seo);
export default function DecryptedTextPreviewRoutePage() {
  return <DecryptedTextPreviewPage seo={seo} />;
}
