import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ImageCompare } from "@zentauri-ui/zentauri-components/ui/image-compare";
import Image from "next/image";

export function ImageCompareHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 bg-slate-100 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-slate-950/40">
        <ImageCompare
          appearance="gradient-blue"
          className="mx-auto max-w-3xl shadow-xl"
          before={
            <Image
              src="/mountain-space-bg.jpg"
              alt="Mountain landscape before color grading"
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="grayscale contrast-75"
            />
          }
          after={
            <Image
              src="/mountain-space-bg.jpg"
              alt="Mountain landscape after color grading"
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="saturate-150 contrast-125"
            />
          }
        />
      </div>
    </Section>
  );
}
