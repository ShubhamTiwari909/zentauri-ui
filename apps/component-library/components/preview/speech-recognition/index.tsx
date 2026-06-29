import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SpeechRecognitionCodeExamplesSection } from "./sections/snippet-sections";
import { SpeechRecognitionHeroSection } from "./sections/hero";

export default function SpeechRecognitionPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SpeechRecognitionHeroSection seo={seo} />
      <SpeechRecognitionCodeExamplesSection />
      <PreviewApiSection slug="speech-recognition" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
