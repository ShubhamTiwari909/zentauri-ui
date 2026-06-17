import AudioPlayerPreviewPage from "@/components/preview/audio-player";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("audio-player");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function AudioPlayerPreviewRoutePage() {
  return <AudioPlayerPreviewPage seo={seo} />;
}
