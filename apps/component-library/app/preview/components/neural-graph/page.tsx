import NeuralGraphPreviewPage from "@/components/preview/neural-graph";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("neural-graph");
export const metadata = previewSeoDocumentToMetadata(seo);

export default function NeuralGraphPreviewRoutePage() {
  return <NeuralGraphPreviewPage seo={seo} />;
}
