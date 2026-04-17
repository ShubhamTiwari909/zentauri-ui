import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  RangeSlider,
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@zentauri-ui/zentauri-components/ui/slider";

export function SliderHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Single
          </p>
          <Slider
            className="mt-3"
            defaultValue={42}
            aria-label="Hero level"
            appearance="emerald"
          >
            <SliderTrack>
              <SliderRange />
              <SliderThumb />
            </SliderTrack>
          </Slider>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Range
          </p>
          <RangeSlider
            className="mt-3"
            defaultValue={[32, 72]}
            aria-label="Hero range"
            appearance="amber"
          />
        </div>
      </div>
    </section>
  );
}
