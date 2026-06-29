import SpeechRecognitionPreviewPage from "@/components/preview/speech-recognition";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("speech-recognition");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function SpeechRecognitionPreviewRoutePage() {
  return <SpeechRecognitionPreviewPage seo={seo} />;
}
