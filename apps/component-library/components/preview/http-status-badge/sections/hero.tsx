import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { HttpStatusBadge } from "@zentauri-ui/zentauri-components/ui/http-status-badge";

export function HttpStatusBadgeHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          <HttpStatusBadge status={200} appearance="soft" />
          <HttpStatusBadge status={301} appearance="solid" />
          <HttpStatusBadge status={404} appearance="outline" />
          <HttpStatusBadge status={500} appearance="solid" />
        </div>
      </div>
    </Section>
  );
}
