import SecretRevealPreviewPage from "@/components/preview/secret-reveal";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("secret-reveal");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SecretRevealPreviewRoutePage() {
  return <SecretRevealPreviewPage seo={seo} />;
}
