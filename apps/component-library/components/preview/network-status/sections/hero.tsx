import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { NetworkStatus } from "@zentauri-ui/zentauri-components/ui/network-status";

export function NetworkStatusHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-6">
          <NetworkStatus online size="md" />
          <NetworkStatus
            online
            appearance="slow"
            labels={{ slow: "Slow connection" }}
            size="md"
          />
          <NetworkStatus online={false} size="md" />
        </div>
      </div>
    </Section>
  );
}
