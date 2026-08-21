import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { SlideToCompletePlayground } from "./components/playground";
import { SlideToCompleteControlledDemo } from "./components/controlled-demo";
import { slideToCompleteControlledSnippet } from "./components/snippets";

export function SlideToCompleteCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Slide to complete playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, and threshold, then drag the thumb (or focus
        it and press Enter) to see the interaction complete. Toggle Show output
        / Show code and the snippet updates to match the selected variant.
      </p>
      <SlideToCompletePlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Controlled state
          </p>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Drive the completed state from your own <code>approved</code>{" "}
            variable with <code>value</code> / <code>onValueChange</code>.
            Completing the drag calls <code>onValueChange(true)</code>; the
            appearance and label switch to reflect the approved state, and the
            &quot;Reset&quot; button demonstrates setting it back from the
            outside.
          </p>
          <PreviewCodeShowcase code={slideToCompleteControlledSnippet()}>
            <SlideToCompleteControlledDemo />
          </PreviewCodeShowcase>
        </div>
      </div>
    </Section>
  );
}
