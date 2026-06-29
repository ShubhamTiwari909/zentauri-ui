import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { QrCode } from "@zentauri-ui/zentauri-components/ui/qr-code";

export function QrCodeHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <QrCode
            value="https://zentauri-ui.vercel.app"
            caption="zentauri-ui.vercel.app"
          />
          <QrCode
            value="HELLO WORLD"
            canvasSize={160}
            level="H"
            caption="Error correction: H"
            bgColor="#ccee44"
          />
        </div>
      </div>
    </Section>
  );
}
