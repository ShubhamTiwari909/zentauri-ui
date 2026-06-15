import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { RatingPlayground } from "./components/playground";
import { RatingCustomIconDemo, RatingValidationDemo } from "./components/demo";
import {
  ratingCustomIconSnippet,
  ratingValidationSnippet,
} from "./components/snippets";

export function RatingCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Rating variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, icon, and behavior to preview the rating live.
        Toggle Show output / Show code and the snippet updates to match the
        selected variant.
      </p>
      <RatingPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase key="custom-icon" code={ratingCustomIconSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Icon: <span className="font-bold">CUSTOM REACT ICON</span>
          </p>
          <RatingCustomIconDemo />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase key="validation" code={ratingValidationSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            State: <span className="font-bold">VALIDATION</span>
          </p>
          <RatingValidationDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
