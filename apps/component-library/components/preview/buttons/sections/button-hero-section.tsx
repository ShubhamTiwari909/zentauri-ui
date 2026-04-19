import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";

export function ButtonHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="grid gap-3 sm:grid-cols-2">
          <ButtonAnimated appearance="outline" animation="lift" className="w-full">
            Launch
          </ButtonAnimated>
          <ButtonAnimated appearance="outline" animation="press" className="w-full">
            Outline
          </ButtonAnimated>
          <ButtonAnimated appearance="glass" animation="glow" className="w-full">
            Glass
          </ButtonAnimated>
          <ButtonAnimated
            appearance="destructive"
            animation="bounce"
            className="w-full"
          >
            Delete
          </ButtonAnimated>
          <Button appearance="gradient-blue" className="w-full">
            Gradient
          </Button>
          <ButtonAnimated
            appearance="sky"
            animation="lift"
            className="w-full"
            as="link"
            target="_blank"
            href="https://www.google.com"
          >
            Link
          </ButtonAnimated>
        </div>
      </div>
    </section>
  );
}
