import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Spinner } from "@zentauri-ui/zentauri-components/ui/spinner";

export function SpinnerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="flex flex-wrap items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Spinner appearance="sky" size="lg" variant="ring" />
        <Spinner appearance="secondary" size="md" variant="dots" />
        <Spinner appearance="emerald" size="md" variant="bars" />
      </div>
    </section>
  );
}
