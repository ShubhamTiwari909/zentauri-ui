import SpeechSynthesizerPreviewPage from "@/components/preview/speech-synthesizer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("speech-synthesizer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SpeechSynthesizerPreviewRoutePage() {
  return <SpeechSynthesizerPreviewPage seo={seo} />;
}
