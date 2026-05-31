import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Kbd } from "@zentauri-ui/zentauri-components/ui/kbd";

export function KbdHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-lg">
        <div className="grid gap-6">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200">
            <span>Open command palette</span>
            <Kbd keys={["⌘", "K"]} separator="+" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Kbd>Esc</Kbd>
            <Kbd appearance="default" keys={["Ctrl", "Shift", "P"]} separator="+" />
            <Kbd appearance="emerald" keys={["⌘", "Enter"]} separator="+" />
            <Kbd appearance="gradient-blue" keys={["⌥", "Tab"]} separator="+" />
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}
