import CodeBlockPreviewPage from "@/components/preview/code-block";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("code-block");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CodeBlockPreviewRoutePage() {
  return <CodeBlockPreviewPage seo={seo} />;
}
