import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SlideToComplete } from "@zentauri-ui/zentauri-components/ui/slide-to-complete";

export function SlideToCompleteHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <SlideToComplete appearance="primary" label="Slide to approve" />
        <SlideToComplete appearance="destructive" label="Slide to delete" />
        <SlideToComplete appearance="success" label="Slide to unlock" />
      </div>
    </Section>
  );
}
