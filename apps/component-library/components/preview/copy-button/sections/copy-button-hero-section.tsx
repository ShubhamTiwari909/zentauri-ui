import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CopyButton } from "@zentauri-ui/zentauri-components/ui/copy-button";

export function CopyButtonHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-lg">
        <div className="grid gap-6">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-900/10 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-100 dark:border-white/10">
            <span>npm install @zentauri-ui/zentauri-components</span>
            <CopyButton
              appearance="glass"
              value="npm install @zentauri-ui/zentauri-components"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyButton
              appearance="default"
              iconOnly={false}
              label="Copy token"
              value="zentauri-token-7f3a"
            />
            <CopyButton
              appearance="emerald"
              iconOnly={false}
              copiedLabel="Copied!"
              label="Copy key"
              value="sk-live-zentauri"
            />
            <CopyButton appearance="gradient-blue" value="hello@zentauri.dev" />
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}
