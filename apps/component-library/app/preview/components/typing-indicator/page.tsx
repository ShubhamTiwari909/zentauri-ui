import TypingIndicatorPreviewPage from "@/components/preview/typing-indicator";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("typing-indicator");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TypingIndicatorPreviewRoutePage() {
  return <TypingIndicatorPreviewPage seo={seo} />;
}
