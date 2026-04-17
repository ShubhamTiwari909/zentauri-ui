import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  SliderRangeDemo,
  SliderSingleDemo,
} from "./components/slider-code-examples-demo";
import {
  SLIDER_APPEARANCES,
  SLIDER_CODE_EXAMPLES_SECTION_CLASS,
} from "./components/slider-code-examples.data";
import {
  sliderRangeSnippet,
  sliderSingleSnippet,
} from "./components/slider-code-examples.snippets";

export function SliderCodeExamplesSection() {
  return (
    <section className={SLIDER_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Slider code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming kind and appearance.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {SLIDER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`single-${appearance}`}
            code={sliderSingleSnippet(appearance)}
          >
            <p className="mb-5 text-xs font-semibold text-white md:text-sm">
              Single · appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <SliderSingleDemo appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
        {SLIDER_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`range-${appearance}`}
            code={sliderRangeSnippet(appearance)}
          >
            <p className="mb-5 text-xs font-semibold text-white md:text-sm">
              Range · appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <SliderRangeDemo appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
