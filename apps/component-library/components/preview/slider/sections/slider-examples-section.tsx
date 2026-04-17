import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@zentauri-ui/zentauri-components/ui/slider";

export function SliderExamplesSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Appearances</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Default
          </p>
          <Slider
            className="mt-4"
            defaultValue={64}
            aria-label="Default appearance"
          >
            <SliderTrack>
              <SliderRange />
              <SliderThumb />
            </SliderTrack>
          </Slider>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Violet (default gradient)
          </p>
          <Slider
            className="mt-4"
            defaultValue={28}
            aria-label="Violet appearance"
            appearance="default"
          >
            <SliderTrack>
              <SliderRange />
              <SliderThumb />
            </SliderTrack>
          </Slider>
        </div>
      </div>
    </section>
  );
}
