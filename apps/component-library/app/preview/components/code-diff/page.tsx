import CodeDiffPreviewPage from "@/components/preview/code-diff";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("code-diff");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CodeDiffPreviewRoutePage() {
  return <CodeDiffPreviewPage seo={seo} />;
}
