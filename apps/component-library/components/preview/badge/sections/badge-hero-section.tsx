import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { BadgeAnimated } from "@zentauri-ui/zentauri-components/ui/badge/animated";

export function BadgeHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap gap-2">
          <Badge appearance="sky">Beta</Badge>
          <Badge appearance="outline">Outline</Badge>
          <BadgeAnimated appearance="emerald" animation="bounce">
            Live
          </BadgeAnimated>
          <BadgeAnimated appearance="rose" animation="pop" closable closeLabel="Remove tag">
            Blocking
          </BadgeAnimated>
        </div>
      </div>
    </section>
  );
}
