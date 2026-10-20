import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ElectricBorderDemo } from "../components/electric-border-demo";

export function ElectricBorderHero({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="plain">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="relative mt-10 rounded-3xl border border-white/10 bg-slate-100 p-7 text-slate-900 sm:p-12 dark:bg-[#070c15] dark:text-slate-100">
        <div className="flex items-center justify-between gap-4 border-b border-slate-900/10 pb-5 text-[10px] uppercase tracking-[.22em] text-slate-500 dark:border-white/10">
          <span>Interaction study / 002</span>
          <span>Electric Border</span>
        </div>
        <div className="flex min-h-100 items-center justify-center py-14">
          <ElectricBorderDemo />
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-900/10 pt-5 font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:border-white/10">
          <span>Hover to surge · Click to pulse</span>
          <span>SVG · Motion aware · No extra dependencies</span>
        </div>
      </div>
    </Section>
  );
}
