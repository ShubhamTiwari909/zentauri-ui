import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
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
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">
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
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-800 dark:text-slate-400">
            Range
          </p>
          <RangeSlider
            className="mt-3"
            defaultValue={[32, 72]}
            aria-label="Hero range"
            appearance="amber"
          />
        </div>
      </SectionCard>
    </Section>
  );
}
