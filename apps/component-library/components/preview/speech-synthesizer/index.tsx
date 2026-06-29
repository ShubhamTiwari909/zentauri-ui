import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SpeechSynthesizerCodeExamplesSection } from "./sections/snippet-sections";
import { SpeechSynthesizerHeroSection } from "./sections/hero";

export default function SpeechSynthesizerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SpeechSynthesizerHeroSection seo={seo} />
      <SpeechSynthesizerCodeExamplesSection />
      <PreviewApiSection slug="speech-synthesizer" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
