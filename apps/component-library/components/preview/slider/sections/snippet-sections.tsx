import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { SliderRangeDemoControlled } from "./components/demo";
import { sliderRangeSnippet } from "./components/snippets";
import { SliderPlayground } from "./components/playground";

export function SliderCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Slider variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a kind and appearance to preview the slider live. Toggle Show
        output / Show code and the snippet updates to match the selected
        variant.
      </p>
      <SliderPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={sliderRangeSnippet("indigo")}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Range controlled
          </p>
          <SliderRangeDemoControlled appearance="indigo" />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
