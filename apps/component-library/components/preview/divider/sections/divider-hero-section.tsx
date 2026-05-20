import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DividerAnimated } from "@zentauri-ui/zentauri-components/ui/divider/animated";

export function DividerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="space-y-6 rounded-3xl border dark:border-white/10 border-slate-900/10 bg-slate-100 dark:bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
        <DividerAnimated
          appearance="primary"
          animation="expand"
          label="Primary"
        />
        <DividerAnimated
          appearance="muted"
          animation="expand"
          label="Primary"
        />
      </div>
    </section>
  );
}
