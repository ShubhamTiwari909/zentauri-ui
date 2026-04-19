import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import { ProgressAnimated } from "@zentauri-ui/zentauri-components/ui/progress/animated";

export function ProgressHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Progress value={42} appearance="sky" label="Upload progress" />
        <ProgressAnimated
          value={78}
          appearance="gradient-indigo"
          animation="shimmer"
        />
      </div>
    </section>
  );
}
