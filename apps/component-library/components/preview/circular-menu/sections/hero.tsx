import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { CircularMenuHeroShowcase } from "./components/hero-showcase";

export function CircularMenuHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-900/10 bg-slate-100 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <CircularMenuHeroShowcase />
      </div>
    </Section>
  );
}
