import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SpeechRecognition } from "@zentauri-ui/zentauri-components/ui/speech-recognition";

export function SpeechRecognitionHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-6">
          <SpeechRecognition appearance="default" size="md" />
          <SpeechRecognition appearance="blue" size="md" />
          <SpeechRecognition appearance="emerald" size="md" />
        </div>
      </div>
    </Section>
  );
}
